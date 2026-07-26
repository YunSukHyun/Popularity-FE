export interface ChatCloudMessage {
  id: string;
  pageId: string;
  userId: string;
  nickname: string;
  text: string;
  createdAt: number;
  x?: number;
  y?: number;
}
