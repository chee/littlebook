import { type Repo } from "@automerge/vanillajs";
import { Registry } from "./registry.ts";
import type { View } from "../types/view.ts";
export declare class ViewRegistry extends Registry<"view", View<any>> {
    constructor({ repo }: {
        repo: Repo;
    });
    views(file: unknown): Generator<import("../types/view.ts").FileEditor<any> | import("../types/view.ts").FileViewer<any>, void, unknown>;
    standalones(): Generator<import("../types/view.ts").StandaloneView, void, unknown>;
}
export declare const ViewRegistryContext: import("solid-js").Context<ViewRegistry | undefined>;
export declare function useViewRegistry(): ViewRegistry;
