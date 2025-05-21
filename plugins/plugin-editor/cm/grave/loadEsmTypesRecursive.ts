import type * as monaco from 'monaco-editor';

/**
 * Loads TypeScript type definitions for ESM imports from https URLs and injects them into Monaco
 * @param editor Monaco editor instance
 * @param monaco Monaco namespace
 */
export async function loadEsmTypesRecursive(
	editor: monaco.editor.IStandaloneCodeEditor,
	monaco: typeof import('monaco-editor')
): Promise<{ dispose: () => void }> {
	// Track processed URLs to avoid infinite recursion
	const processedUrls = new Set<string>();
	// Store library disposables for cleanup
	const addedLibraries = new Map<string, monaco.IDisposable>();
	// Cache type definitions to avoid redundant fetches
	const typesCache = new Map<string, string>();
	// Store disposables for event listeners
	const disposables: monaco.IDisposable[] = [];

	/**
	 * Process all imports in the editor content
	 */
	async function processEditorContent() {
		const model = editor.getModel();
		if (!model) return;
		
		const code = model.getValue();
		const urls = extractImportUrls(code);
		
		// Process each URL
		for (const url of urls) {
			await fetchTypeDefinitions(url);
		}
	}

	/**
	 * Extract all https:// import URLs from code
	 */
	function extractImportUrls(code: string): Set<string> {
		const urls = new Set<string>();
		
		// Match static imports: import x from 'https://...'
		const staticImportRegex = /import\s+(?:(?:[\w*\s{},]*)\s+from\s+)?["']https:\/\/([^"']+)["']/g;
		// Match dynamic imports: import('https://...')
		const dynamicImportRegex = /import\s*\(\s*["']https:\/\/([^"']+)["']\s*\)/g;
		
		let match;
		while ((match = staticImportRegex.exec(code)) !== null) {
			urls.add(`https://${match[1]}`);
		}
		
		while ((match = dynamicImportRegex.exec(code)) !== null) {
			urls.add(`https://${match[1]}`);
		}
		
		return urls;
	}

	/**
	 * Recursively fetch type definitions for a URL and its dependencies
	 */
	async function fetchTypeDefinitions(url: string): Promise<void> {
		if (processedUrls.has(url)) return;
		processedUrls.add(url);
		
		try {
			// Get from cache or fetch
			let typeDefinitions = typesCache.get(url);
			
			if (!typeDefinitions) {
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 5000);
				
				try {
					// Fetch the module
					const response = await fetch(url, { signal: controller.signal });
					clearTimeout(timeoutId);
					
					// Check for TypeScript types header
					const typesUrl = response.headers.get('x-typescript-types');
					
					if (typesUrl) {
						const typesResponse = await fetch(typesUrl);
						typeDefinitions = await typesResponse.text();
					} else {
						console.warn(`No x-typescript-types header for ${url}`);
						return;
					}
					
					// Cache the type definitions
					typesCache.set(url, typeDefinitions);
				} catch (e) {
					console.error(`Error fetching ${url}:`, e);
					return;
				}
			}
			
			// Clean up previous library if it exists
			if (addedLibraries.has(url)) {
				addedLibraries.get(url)?.dispose();
			}
			
			// Add the type definitions to Monaco
			const disposable = monaco.languages.typescript.javascriptDefaults.addExtraLib(
				typeDefinitions,
				url // Use URL as path so Monaco can match imports
			);
			
			// Also add to TypeScript service if available
			try {
				monaco.languages.typescript.typescriptDefaults.addExtraLib(
					typeDefinitions,
					url
				);
			} catch (e) {
				// Ignore if TypeScript service isn't configured
			}
			
			addedLibraries.set(url, disposable);
			
			// Process nested imports recursively
			const nestedUrls = extractImportUrls(typeDefinitions);
			for (const nestedUrl of nestedUrls) {
				await fetchTypeDefinitions(nestedUrl);
			}
			
		} catch (error) {
			console.error(`Error processing ${url}:`, error);
		}
	}

	// Initial processing
	await processEditorContent();
	
	// Set up change listener with debouncing
	let debounceTimer: any = null;
	const changeDisposable = editor.onDidChangeModelContent(() => {
		if (debounceTimer) clearTimeout(debounceTimer);
		
		debounceTimer = setTimeout(async () => {
			processedUrls.clear(); // Reset processed URLs
			await processEditorContent();
		}, 500);
	});
	
	disposables.push(changeDisposable);
	
	// Return dispose function for cleanup
	return {
		dispose: () => {
			if (debounceTimer) clearTimeout(debounceTimer);
			disposables.forEach(d => d.dispose());
			Array.from(addedLibraries.values()).forEach(d => d.dispose());
			processedUrls.clear();
			addedLibraries.clear();
			typesCache.clear();
		}
	};
}