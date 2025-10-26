export type RawMessage = {
  id: string;
  chatId: string;
  sender: "me" | "other";
  text: string;
  createdAt: string;
};
