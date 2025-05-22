import { type Repo } from "@automerge/vanillajs";
import { Registry } from "./registry.ts";
import type { Source } from "../types/source.ts";
export declare class SourceRegistry extends Registry<"source", Source> {
    constructor({ repo }: {
        repo: Repo;
    });
    sources(): Generator<Source, void, unknown>;
}
export declare const SourceRegistryContext: import("solid-js").Context<SourceRegistry | undefined>;
export declare function useSourceRegistry(): SourceRegistry;
