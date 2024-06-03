import type { Branded, Brand } from "./brand.ts";
export declare const DefaultAreaId: Littlebook.AreaId;
export declare const InboxId: Littlebook.FolderId;
export declare namespace Littlebook {
    type FileId = Branded<string, "file-id">;
    type FolderId = Branded<string, "folder-id">;
    type ProjectId = Branded<string, "project-id">;
    type AreaId = Branded<string, "area-id">;
    type WhenId = Branded<string, "when-id">;
    interface File {
        id: FileId;
        parentId: FolderId | ProjectId | AreaId;
        whenId?: WhenId;
    }
    interface Folder {
        id: FolderId;
        parentId: FolderId | ProjectId | AreaId;
        children: (FileId | FolderId)[];
        whenId?: WhenId;
    }
    interface Project {
        id: ProjectId;
        parentId: AreaId;
        children: (FileId | FolderId)[];
        whenId?: WhenId;
    }
    interface Area {
        id: AreaId;
        children: ProjectId[];
        whenId?: WhenId;
    }
    interface When<Target extends {
        id: Brand<string>;
    }> {
        id: WhenId;
        when: string;
        period?: "morning" | "afternoon" | "evening";
        targetId: Target["id"];
        whenId?: WhenId;
    }
}
