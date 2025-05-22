import type { SourceRegistry } from "./registries/source-registry.ts";
import type { ViewRegistry } from "./registries/view-registry.ts";
import type { View } from "./types/view.ts";
import type { Source } from "./types/source.ts";
export default class PluginAPI {
    private viewRegistry;
    private sourceRegistry;
    constructor(options: {
        viewRegistry: ViewRegistry;
        sourceRegistry: SourceRegistry;
    });
    registerView<T>(view: View<T>): void;
    registerSource<T>(source: Source<T>): void;
}
export declare const PluginAPIContext: import("solid-js").Context<PluginAPI | undefined>;
export declare function usePluginAPI(): PluginAPI;
