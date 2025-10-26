import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import messagesData from "@assets/data/message.json";
import { type RawMessage } from "@type/chat";

type MessagesByChat = Record<string, RawMessage[]>;

type MessagesContextValue = {
  messages: MessagesByChat;
  addMessage: (chatId: string, text: string, sender?: "me" | "other") => void; // ★ 통일
  markAllRead: (chatId: string) => void;
};

const MessagesContext = createContext<MessagesContextValue | null>(null);

function normalizeInitial(): MessagesByChat {
  const src = messagesData as Record<string, RawMessage[]>;
  // createdAt이 문자열/숫자여도 그대로 두고 렌더할 때만 Date로 처리
  return { ...src };
}

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<MessagesByChat>(() =>
    normalizeInitial()
  );

  const addMessage = useCallback(
    (chatId: string, text: string, sender: "me" | "other" = "me") => {
      // ★ 통일
      setMessages((prev) => {
        const next = { ...prev };
        const list = next[chatId] ? [...next[chatId]] : [];
        const now = Date.now();
        list.push({
          id: `${chatId}_${now}`, // 간단한 id
          text,
          createdAt: new Date(now).toISOString(), // ★ string으로 저장 (타입 일치)
          sender, // ★ "me" | "other"
        } as RawMessage);
        next[chatId] = list;
        return next;
      });
    },
    []
  );

  const markAllRead = useCallback((chatId: string) => {
    // 필요 시 읽음 처리 로직(예: read=true로 변경). computeUnread가 read 기반이면 여기서 반영.
    setMessages((prev) => {
      const next = { ...prev };
      const list =
        next[chatId]?.map((m) => ({ ...m, read: true as any })) ?? [];
      next[chatId] = list;
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ messages, addMessage, markAllRead }),
    [messages, addMessage, markAllRead]
  );

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error("useMessages must be used within MessagesProvider");
  return ctx;
};
