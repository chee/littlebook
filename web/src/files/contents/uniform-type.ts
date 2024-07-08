export type FilenameExtension = string & {__FilenameExtension: true}
export type MIMEType = string & {__MIMEType: true}
export type UniformTypeIdentifier = string & {__UniformTypeIdentifier: true}

export type ResolvableUniformType = UniformType | UniformTypeIdentifier
export type ResolvableUniformTypes =
	| ResolvableUniformType
	| ResolvableUniformType[]

// expecting this to be something that can be passed to `<img src=` rn
export type UniformTypeIcon = string

export type UniformTypeDescriptor = {
	identifier: UniformTypeIdentifier
	description: string
	conformingTo?: UniformType[]
	filenameExtensions?: FilenameExtension[]
	mimeTypes?: MIMEType[]
	icon?: UniformTypeIcon
}

export type UniformTypeJSON = {
	identifier: string
	description: string
	supertypes: UniformTypeJSON[]
}

export default class UniformType {
	private static types = new Map<UniformTypeIdentifier, UniformType>()
	private static mimes = new Map<MIMEType, Set<UniformType>>()
	private static extensions = new Map<FilenameExtension, Set<UniformType>>()

	supertypes = new Set<UniformType>()
	constructor(
		readonly identifier: UniformTypeIdentifier,
		readonly description: string,
		readonly icon?: UniformTypeIcon,
	) {}

	static add({
		identifier,
		description,
		conformingTo,
		filenameExtensions,
		mimeTypes,
		icon,
	}: UniformTypeDescriptor) {
		const type = new UniformType(
			identifier as UniformTypeIdentifier,
			description,
			icon,
		)

		if (conformingTo) {
			for (const supertype of conformingTo) {
				const u = UniformType.get(supertype)
				type.supertypes.add(u)
				for (const superdupertype of u.supertypes) {
					type.supertypes.add(superdupertype)
				}
			}
		}
		if (filenameExtensions) {
			type.associateWithFilenameExtensions(filenameExtensions)
		}
		if (mimeTypes) {
			type.associateWithMIMETypes(mimeTypes)
		}
		UniformType.types.set(identifier as UniformTypeIdentifier, type)
		return type
	}

	static create(
		identifier: string,
		description?: string,
		conformingTo?: UniformType[],
		filenameExtensions?: string[],
		mimeTypes?: string[],
		icon?: UniformTypeIcon,
	) {
		return UniformType.add({
			identifier: identifier as UniformTypeIdentifier,
			description: description || identifier,
			conformingTo: conformingTo,
			filenameExtensions: filenameExtensions as FilenameExtension[],
			mimeTypes: mimeTypes as MIMEType[],
			icon,
		})
	}

	associateWithFilenameExtensions(filenameExtensions: FilenameExtension[]) {
		for (const ext of filenameExtensions) {
			let associations = UniformType.extensions.get(ext)
			if (!associations) {
				associations = new Set()
				UniformType.extensions.set(ext, associations)
			}
			associations.add(this)
		}
	}

	associateWithMIMETypes(mimeTypes: MIMEType[]) {
		for (const mime of mimeTypes) {
			let associations = UniformType.mimes.get(mime)
			if (!associations) {
				associations = new Set()
				UniformType.mimes.set(mime, associations)
			}
			associations.add(this)
		}
	}
	conforms(to: UniformType) {
		return this.supertypes.has(to)
	}

	isSubtype(of: UniformType) {
		return this.supertypes.has(of)
	}

	isSupertype(of: UniformType) {
		return of.supertypes.has(this)
	}

	static mimeTypes = function* (type: UniformType): Generator<MIMEType> {
		for (const [mime, uts] of UniformType.mimes) {
			if (uts.has(type)) {
				yield mime
			}
		}
		for (const supertype of type.supertypes) {
			yield* UniformType.mimeTypes(supertype)
		}
	}

	get mimeTypes() {
		return UniformType.mimeTypes(this)
	}

	static filenameExtensions = function* (
		type: UniformType,
	): Generator<FilenameExtension> {
		for (const [mime, uts] of UniformType.extensions) {
			if (uts.has(type)) {
				yield mime
			}
		}
		for (const supertype of type.supertypes) {
			yield* UniformType.filenameExtensions(supertype)
		}
	}

	get filenameExtensions() {
		return UniformType.filenameExtensions(this)
	}

	get preferredFilenameExtension() {
		return this.filenameExtensions.next().value
	}

	get preferredMIMEType() {
		return this.mimeTypes.next().value
	}

	static forMIMEType(mimeType: MIMEType) {
		return UniformType.mimes.get(mimeType)
	}

	static forFilenameExtension(filenameExtension: FilenameExtension) {
		return UniformType.extensions.get(filenameExtension)
	}

	static get(type: UniformTypeIdentifier | UniformType | string) {
		const full =
			typeof type == "string"
				? UniformType.types.get(type as UniformTypeIdentifier)
				: type
		if (!full) {
			throw `no such type ${type}`
		}
		return full
	}

	static getIdentifier(type: UniformTypeIdentifier | UniformType) {
		return UniformType.get(type).identifier
	}

	static forFilename(filename: string) {
		const extmatch = filename.match(/(\.[\.a-zA-Z_0-9]+)$/)

		if (extmatch) {
			for (
				let extension = extmatch[1];
				extension.length > 0;
				extension = extension.replace(/^\.+[a-zA-Z_0-9]+/, "")
			) {
				const utis = UniformType.extensions.get(
					extension.replace(/^\.+/, "") as FilenameExtension,
				)

				if (utis) {
					return utis
				}
			}
		}
	}

	static item = UniformType.create("public.item", "item")
	static content = UniformType.create("public.content", "content")
	static message = UniformType.create("public.message", "message")
	static contact = UniformType.create("public.contact", "contact")
	static configuration = UniformType.create(
		"public.configuration",
		"configuration",
	)

	static compositeContent = UniformType.create(
		"public.composite-content",
		"mixed",
		[UniformType.content],
	)

	static data = UniformType.create("public.data", "bits and bytes", [
		UniformType.item,
	])

	static database = UniformType.create("public.database", "db")

	static executable = UniformType.create(
		"public.executable",
		"computer program",
		[UniformType.item],
	)

	static archive = UniformType.create("public.archive", "archive", [
		UniformType.data,
	])

	static zip = UniformType.create(
		// deprecated "com.pkware.zip-archive",
		"public.zip-archive",
		"zip",
		[UniformType.archive],
		["zip", "zipx", "z01"],
		["application/zip", "application/x-zip-compressed"],
	)

	// todo https://developer.apple.com/documentation/uniformtypeidentifiers/uttype-swift.struct/gzip

	static directory = UniformType.create("public.directory", "directory", [
		UniformType.item,
	])

	static folder = UniformType.create("public.folder", "folder", [
		UniformType.directory,
	])

	static package = UniformType.create("com.apple.package", "package", [
		UniformType.directory,
	])

	static bundle = UniformType.create("com.apple.bundle", "bundle", [
		UniformType.directory,
	])

	static volume = UniformType.create("public.volume", "volume", [
		UniformType.folder,
	])

	static resolvable = UniformType.create("com.apple.resolvable", "pointy")

	static symbolicLink = UniformType.create("public.symlink", "symbolic link", [
		UniformType.resolvable,
		UniformType.item,
	])

	static aliasFile = UniformType.create("com.apple.alias-file", "alias file", [
		UniformType.resolvable,
		UniformType.data,
	])

	static diskImage = UniformType.create("public.disk-image", "disk image")

	static mountPoint = UniformType.create(
		"public.mount-point",
		"volume mount point",
		[UniformType.item, UniformType.resolvable],
	)

	static url = UniformType.create("public.url", "URL", [UniformType.data])

	static fileUrl = UniformType.create("public.file-url", "file:///*", [
		UniformType.url,
	])

	static pdf = UniformType.create(
		"com.adobe.pdf",
		"portable document",
		[UniformType.data, UniformType.compositeContent],
		["pdf"],
		["application/pdf", "application/x-pdf"],
	)

	static rtfd = UniformType.create(
		"com.apple.rtfd",
		"rich text package",
		[UniformType.package, UniformType.compositeContent],
		["rtfd"],
	)

	static flatRTFD = UniformType.create(
		"com.apple.flat-rtfd",
		"flat rich text pkg",
		[UniformType.data, UniformType.compositeContent],
	)

	static epub = UniformType.create(
		"org.idpf.epub-container",
		"book",
		[UniformType.data, UniformType.compositeContent],
		["epub"],
		["application/epub+zip"],
	)

	static text = UniformType.create("public.text", "text", [
		UniformType.content,
		UniformType.data,
	])

	static plainText = UniformType.create(
		"public.plain-text",
		"plain text",
		[UniformType.content, UniformType.data],
		["txt", "text"],
		["text/plain"],
	)

	static utf8PlainText = UniformType.create(
		"public.utf8-plain-text",
		"utf-8 text",
		[UniformType.plainText],
	)
	static utf16PlainText = UniformType.create(
		"public.utf16-plain-text",
		"utf-16 text (native endian)",
		[UniformType.plainText],
	)

	static utf16ExternalPlainText = UniformType.create(
		"public.utf16-external-plain-text",
		"utf-16 text (big endian)",
		[UniformType.plainText],
	)

	static delimitedText = UniformType.create(
		"public.delimited-values-text",
		"delimited text",
		[UniformType.text],
	)

	static commaSeparatedText = UniformType.create(
		"public.comma-separated-values-text",
		"csv",
		[UniformType.delimitedText],
		["csv"],
		["text/csv"],
	)

	static tabSeparatedText = UniformType.create(
		"public.tab-separated-values-text",
		"tsv",
		[UniformType.delimitedText],
		["tsv"],
		["text/tab-separated-values"],
	)

	static rtf = UniformType.create(
		"public.rtf",
		"rich text",
		[UniformType.plainText],
		["rtf"],
		["text/rtf"],
	)

	static html = UniformType.create(
		"public.html",
		"hypertext",
		[UniformType.plainText],
		["html", "htm", "shtm", "shtml"],
		["text/html"],
	)

	static css = UniformType.create(
		"public.css",
		"stylesheet",
		[UniformType.plainText],
		["css"],
		["text/css"],
	)

	static xml = UniformType.create(
		"public.xml",
		"extensible markup",
		[UniformType.plainText],
		["xml"],
		["text/xml"],
	)

	static json = UniformType.create(
		"public.json",
		"json",
		[UniformType.plainText],
		["json"],
		["text/json", "application/json"],
	)

	static yaml = UniformType.create(
		"public.yaml",
		"yaml",
		[UniformType.plainText],
		["yaml", "yml"],
		["application/x-yaml"],
	)

	static toml = UniformType.create(
		"public.toml",
		"toml",
		[UniformType.plainText, UniformType.configuration],
		["toml"],
		["application/toml"],
	)

	static ini = UniformType.create(
		"public.ini",
		"ini",
		[UniformType.plainText, UniformType.configuration],
		["ini"],
		["zz-application/zz-winassoc-ini"],
	)

	static conf = UniformType.create(
		"public.conf",
		"unix conf",
		[UniformType.plainText, UniformType.configuration],
		["conf"],
	)

	static sourceCode = UniformType.create("public.source-code", "source code", [
		UniformType.plainText,
	])

	static script = UniformType.create("public.script", "script code", [
		UniformType.sourceCode,
	])

	static shellScript = UniformType.create(
		"public.shell-script",
		"shell script",
		[UniformType.script],
		["sh"],
		["text/x-shellscript"],
	)

	static bashScript = UniformType.create(
		"public.bash-script",
		"bash script",
		[UniformType.shellScript],
		["bash"],
	)

	static vCard = UniformType.create("public.vcard", "contact card", [
		UniformType.contact,
		UniformType.text,
	])

	static javaScript = UniformType.create(
		"com.netscape.javascript-source",
		"JavaScript",
		[UniformType.sourceCode, UniformType.executable],
		["mjs", "cjs", "js", "jscript", "javascript", "ecmascript"],
		[
			"application/ecmascript",
			"application/javascript",
			"application/x-ecmascript",
			"application/x-javascript",
			"text/ecmascript",
			"text/javascript",
			"text/javascript1.0",
			"text/javascript1.1",
			"text/javascript1.2",
			"text/javascript1.3",
			"text/javascript1.4",
			"text/javascript1.5",
			"text/jscript",
			"text/livescript",
			"text/x-ecmascript",
			"text/x-javascript",
		],
	)

	static application = UniformType.create(
		"com.apple.application",
		"application",
		[UniformType.executable],
	)
	static applicationBundle = UniformType.create(
		"com.apple.application-bundle",
		"app",
		[UniformType.bundle, UniformType.application],
		["app"],
	)

	static image = UniformType.create("public.image", "image", [
		UniformType.content,
		UniformType.data,
	])

	static png = UniformType.create(
		"public.png",
		"portable network graphic",
		[UniformType.image],
		["png"],
		["image/png"],
	)
	static jpeg = UniformType.create(
		"public.jpeg",
		"photo",
		[UniformType.image],
		["jpeg", "jpg", "jpe"],
		["image/jpeg"],
	)
	static gif = UniformType.create(
		"com.compuserve.gif",
		"gif graphic",
		[UniformType.image],
		["gif"],
		["image/gif"],
	)
	static webP = UniformType.create(
		"org.webmproject.webp",
		"webp",
		[UniformType.image],
		["webp"],
		["image/webp"],
	)

	static tiff = UniformType.create(
		"public.tiff",
		"tagged image",
		[UniformType.image],
		["tiff", "tif"],
		["image/tiff", "image/tiff-fx"],
	)

	static svg = UniformType.create(
		"public.svg-image",
		"vector image",
		[UniformType.image],
		["svg"],
		["image/svg"],
	)

	static rawImage = UniformType.create(
		"public.camera-raw-image",
		"raw image from a camera",
		[UniformType.image],
		[
			"3fr",
			"ari",
			"arw",
			"bay",
			"braw",
			"crw",
			"cr2",
			"cr3",
			"cap",
			"data",
			"dcs",
			"dcr",
			"dng",
			"drf",
			"eip",
			"erf",
			"fff",
			"gpr",
			"iiq",
			"k25",
			"kdc",
			"mdc",
			"mef",
			"mos",
			"mrw",
			"nef",
			"nrw",
			"obm",
			"orf",
			"pef",
			"ptx",
			"pxn",
			"r3d",
			"raf",
			"raw",
			"rwl",
			"rw2",
			"rwz",
			"sr2",
			"srf",
			"srw",
			"x3f",
		],
		["image/x-dcraw"],
	)

	static bmp = UniformType.create(
		"com.microsoft.bmp",
		"bitmap graphic",
		[UniformType.image],
		["bmp", "dib"],
		["image/bmp", "image/x-bmp"],
	)

	static audioVisualContent = UniformType.create(
		"public.audiovisual-content",
		"av",
		[UniformType.content, UniformType.data],
	)
	static audio = UniformType.create("public.audio", "sound", [
		UniformType.audioVisualContent,
	])

	static flac = UniformType.create(
		"org.xiph.flac",
		"flac sound",
		[UniformType.audio],
		["flac"],
		["audio/flac"],
	)

	static mp3 = UniformType.create(
		"public.mp3",
		"mp3 sound",
		[UniformType.audio],
		["mp3", "bit"],
		["audio/mpeg", "audio/MPA", "audio/mpa-robust"],
	)

	static aiff = UniformType.create(
		"public.aiff-audio",
		"aif audio",
		[
			UniformType.create(
				"public.aifc-audio",
				"aifc",
				[UniformType.audio],
				["aifc"],
			),
		],
		["aif", "aiff"],
		["audio/aiff", "audio/x-aiff"],
	)

	static wav = UniformType.create(
		"com.microsoft.waveform-audio",
		".wav",
		[UniformType.audio],
		["wav", "wave"],
		["audio/wave", "audio/wav", "audio/vnd.wave", "audio/x-wav"],
	)

	static midi = UniformType.create(
		"public.midi-audio",
		"midi",
		[UniformType.audio],
		["mid", "midi"],
		["audio/midi"],
	)

	static playlist = UniformType.create("public.playlist", "playlist")

	static m3uPlaylist = UniformType.create("public.m3u-playlist", "playlist", [
		UniformType.playlist,
		UniformType.text,
	])

	static movie = UniformType.create("public.movie", "movie", [
		UniformType.data,
		UniformType.content,
	])

	static mpeg4Movie = UniformType.create(
		"public.mpeg-4",
		"mp4 movie",
		[UniformType.movie],
		["mp4"],
	)

	static video = UniformType.create("public.video", "video", [
		UniformType.movie,
	])

	// todo https://developer.apple.com/documentation/uniformtypeidentifiers/uttype-swift.struct/quicktimemovie

	static toDoItem = UniformType.create("public.to-do-item", "todo")

	static spreadsheet = UniformType.create("public.spreadsheet", "spreadsheet", [
		UniformType.content,
	])

	toJSON(): UniformTypeJSON {
		const supertypes: UniformTypeJSON[] = []

		for (const type of this.supertypes) {
			supertypes.push(type.toJSON())
		}
		return {
			identifier: this.identifier as string,
			description: this.description as string,
			supertypes,
		}
	}
}

UniformType.create(
	"net.daringfireball.markdown",
	"markdown",
	[UniformType.plainText],
	["md", "markdown"],
	["text/markdown"],
)

UniformType.create(
	"public.python-script",
	"python code",
	[UniformType.script, UniformType.sourceCode],
	["py"],
	["text/x-python"],
)
