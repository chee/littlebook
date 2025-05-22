import type { DocHandle, Doc } from "@automerge/vanillajs";
export interface FileMenuAction<FileShape = unknown> {
    type: "action";
    label: string;
    keybinding?: string;
    action: (args: {
        fileHandle: DocHandle<FileShape>;
    }) => void;
}
export interface FileMenuChoice<FileShape = unknown> {
    type: "choice";
    value: (args: {
        file: Doc<FileShape>;
    }) => string;
    choices: {
        label: string;
        value: string;
    }[];
    action: (args: {
        fileHandle: DocHandle<unknown>;
        value: string;
    }) => void;
}
export interface FileMenuSubMenu<FileShape = unknown> {
    type: "sub";
    label: string;
    sub: FileMenuItem<FileShape>[];
}
export type FileMenuItem<FileShape = unknown> = FileMenuSubMenu<FileShape> | FileMenuAction | FileMenuChoice<FileShape>;
export type FileMenu<FileShape = unknown> = FileMenuItem<FileShape>[];
