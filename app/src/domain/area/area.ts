// const [homeEntryURL, setHomeEntryURL] = makePersisted(
// 	// eslint-disable-next-line solid/reactivity
// 	createSignal<AutomergeURL>(
// 		forceString(localStorage.getItem("home")!) ??
// 			repo.create({
// 				type: "entry",
// 				name: "home",
// 				icon: "ghost-smile-bold",
// 				url: repo.create({
// 					name: "home",
// 					sinks: [],
// 					sources: [],
// 					views: [],
// 					files: [
// 						createEntry({
// 							name: "my manifesto.txt",
// 							content: {
// 								text: "hello world",
// 							},
// 						}).url,
// 					],
// 					associations: {},
// 				} satisfies Home).url,
// 			} satisfies FileEntry).url,
// 	),
// 	{
// 		storage: localStorage,
// 		name: "home",
// 		serialize(string) {
// 			return string
// 		},
// 		deserialize(string) {
// 			return forceString(string as AutomergeUrl)
// 		},
// 	},
// )

// export {homeEntryURL}
