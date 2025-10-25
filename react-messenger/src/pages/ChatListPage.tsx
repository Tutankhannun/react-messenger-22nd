import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useHeader } from "@views/Layout";
import usersData from "@assets/data/userList.json";
import messagesData from "@assets/data/message.json";

import SearchIcon from "@assets/icons/Buttons/header/search.svg?react";
import AddChatIcon from "@assets/icons/Buttons/header/addChat.svg?react";
import SortIcon from "@assets/icons/Buttons/header/sort.svg?react";
import ProfileIcon from "@assets/icons/defaultProfile.svg?react";

const ChatsList = () => {
  const setHeader = useHeader();

  const chatPreviews = useMemo(() => {
    // message.json의 키(c1, c2 등)를 기반으로 목록
    return Object.keys(messagesData).map((chatId, index) => {
      const messages = messagesData[chatId as keyof typeof messagesData];
      const lastMessage = messages[messages.length - 1]; // 가장 마지막 메시지

      // userList.json에서 순서대로 사용자를 매칭 (임시 방식)
      const otherUser = usersData[index];

      return {
        id: chatId,
        name: otherUser.name,
        avatarUrl: otherUser.avatarUrl,
        lastMessage: lastMessage.text,
      };
    });
  }, []);

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
        <ul>
          {chatPreviews.map((c) => (
            <li key={c.id}>
              <Link
                to={`/chats/${c.id}`}
                className="flex items-center gap-3 py-3 active:opacity-80"
              >
                {/* avatarUrl 유무에 따라 조건부로 렌더링 */}
                <div className="avatar-lg">
                  {c.avatarUrl ? (
                    <img
                      src={c.avatarUrl}
                      alt="avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <ProfileIcon className="w-full h-full rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{c.name}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {c.lastMessage}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatsList;
