import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { formatChatTime } from "@/utils/formatChatTime";
import { useMinuteTick } from "@/hooks/useMinuteTick";
import { computeUnread } from "@/utils/computeUnread";
import { type RawMessage } from "@/types/chat";
import { useHeader } from "@views/Layout";
import { useMessages } from "@/stores/messages";
import usersData from "@assets/data/userList.json";

import SearchIcon from "@assets/icons/Buttons/header/search.svg?react";
import AddChatIcon from "@assets/icons/Buttons/header/addChat.svg?react";
import SortIcon from "@assets/icons/Buttons/header/sort.svg?react";
import ProfileIcon from "@assets/icons/defaultProfile.svg?react";

type ChatPreview = {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage: string;
  lastMessageAt?: string | number | Date;
  unread: number;
};
export default function ChatsList() {
  const { messages } = useMessages();
  useMinuteTick(); // 1분마다 재렌더 트리거

  const chatPreviews = useMemo<ChatPreview[]>(() => {
    const chatIds = Object.keys(messages);
    return chatIds.map((chatId, idx) => {
      const msgs = (messages as Record<string, RawMessage[]>)[chatId] ?? [];
      const last = msgs[msgs.length - 1];
      return {
        id: chatId,
        name: (usersData[idx]?.name as string) ?? "이름 없음",
        avatarUrl: usersData[idx]?.avatarUrl as string | undefined,
        lastMessage: last?.text ?? "",
        lastMessageAt: last?.createdAt,
        unread: computeUnread(msgs) ?? 0,
      };
    });
  }, [messages]);

  const setHeader = useHeader();

  if (!chatPreviews.length) {
    return (
      <div className="text-center text-sm text-black/40 py-10">
        채팅이 없습니다.
      </div>
    );
  }
  useEffect(() => {
    setHeader({
      title: "채팅",
      right: (
        <>
          <button>
            <SearchIcon className="icon-md flex items-center justify-center " />
          </button>
          <button>
            <AddChatIcon className="icon-md flex items-center justify-center " />
          </button>
          <button>
            <SortIcon className="icon-md flex items-center justify-center " />
          </button>
        </>
      ),
    });
  }, [setHeader]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[343px]">
        <ul className="divide-y divide-black/5">
          {chatPreviews.map((c) => (
            <li key={c.id}>
              <Link
                to={`/chats/${c.id}`}
                className="flex items-center gap-3 py-3 active:opacity-80"
              >
                {/* 아바타 */}
                <div className="size-12 shrink-0 rounded-full overflow-hidden ">
                  {c.avatarUrl ? (
                    <img
                      src={c.avatarUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ProfileIcon className="w-full h-full" />
                  )}
                </div>

                {/* 본문 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-title-md font-medium text-black/90 truncate">
                      {c.name}
                    </p>
                    <span className="ml-auto text-body-sm text-black/40">
                      {c.lastMessageAt ? formatChatTime(c.lastMessageAt) : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className=" text-sm text-black/50">{c.lastMessage}</p>
                    {/* 미읽음 뱃지 */}
                    {c.unread > 0 && (
                      <span
                        className="ml-auto inline-flex min-w-5 h-5 px-1.5 items-center justify-center
                                   rounded-full bg-[#FF4242] text-white text-[11px]"
                      >
                        {c.unread > 99 ? "99+" : c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
