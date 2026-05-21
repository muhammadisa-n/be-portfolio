export type TrashType = "user" | "tool" | "project" | "message" | "file";

export type TrashItemRequest = {
  type: TrashType;
  id: string;
};

export type BulkTrashRequest = {
  items: TrashItemRequest[];
};

export type ListTrashRequest = {
  take: number;
  cursor?: string;
};
