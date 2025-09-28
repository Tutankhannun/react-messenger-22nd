import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { ChatPreview } from "../types/chat";
import { useHeader } from "../views/Layout";

import SearchIcon from "../assets/icons/Buttons/header/search.svg?react";
import AddFriendIcon from "../assets/icons/Buttons/header/addFriend.svg?react";
import SettingsIcon from "../assets/icons/Buttons/header/setting.svg?react";

const LIST: ChatPreview[] = [
  {
    id: "c1",
    name: "MEOVV",
    avatarUrl: "https://i.pravatar.cc/100?img=1",
    lastMessage: "프리 릴리즈 커버?",
  },
  {
    id: "c2",
    name: "졸준위",
    avatarUrl: "https://i.pravatar.cc/100?img=2",
    lastMessage: "부스 전기 6시 마감",
  },
];

const ChatsList = () => {
  const setHeader = useHeader();
  useEffect(() => {
    setHeader({
      title: "채팅",
      right: (
        <>
          <button aria-label="검색">
            <SearchIcon />
          </button>
          <button aria-label="채팅추가">
            <AddFriendIcon />
          </button>
          <button aria-label="설정">
            <SettingsIcon />
          </button>
        </>
      ),
    });
  }, [setHeader]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[343px] flex-1 py-4">
        <ul className="divide-y-0">
          {LIST.map((c) => (
            <li key={c.id}>
              <Link
                to={`/chats/${c.id}`}
                className="flex items-center gap-3 py-3 active:opacity-80"
              >
                <img
                  src={c.avatarUrl}
                  alt="avatar"
                  className="w-[56px] h-[56px] rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-base font-medium truncate">{c.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {c.lastMessage ?? "메시지 없음"}
                  </p>
                </div>
                <span className="text-xs text-gray-400">›</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatsList;
