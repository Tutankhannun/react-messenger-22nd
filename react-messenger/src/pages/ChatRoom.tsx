import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Message } from "../types/chat";
import usersData from "../assets/data/userList.json";
import messagesData from "../assets/data/message.json";
import Container from "../components/layout/Container";
import Content from "../components/layout/Content";
import Header from "../components/layout/Header";
import StatusBar from "../assets/statusBar/StatusBar.svg?react";

import SearchIcon from "../assets/icons/Buttons/header/search.svg?react";
import MenuIcon from "../assets/icons/Buttons/header/menu.svg?react";
import AddIcon from "../assets/icons/ChatInput/add.svg?react";
import SendActiveIcon from "../assets/icons/ChatInput/sendActive.svg?react";
import SendDefaultIcon from "../assets/icons/ChatInput/sendDefault.svg?react";
import BackwardIcon from "../assets/icons/Buttons/header/backward.svg?react";
import ProfileIcon from "../assets/icons/defaultProfile.svg?react";

const Bubble = ({
  me,
  text,
  time,
  name,
  avatarUrl,
}: {
  me: boolean;
  text: string;
  time: string;
  name: string;
  avatarUrl?: string;
}) => {
  const t = new Date(time);
  const hh = String(t.getHours()).padStart(2, "0");
  const mm = String(t.getMinutes()).padStart(2, "0");

  if (me) {
    return (
      <div className="w-full flex items-end gap-2 flex-row-reverse flex-1">
        <div className=" max-w-[70%] rounded-2xl px-3 py-2 text-sm leading-snug bg-white border border-[#ECEEF0] rounded-tr-none">
          <p className="break-words">{text}</p>
        </div>
        <p className="text-[10px] text-gray-500 flex-shrink-0 pb-1">{`${hh}:${mm}`}</p>
      </div>
    );
  }
  // 상대방이 보낸 메시지일 경우
  return (
    <div className="w-full flex items-start gap-3">
      {" "}
      {/* 프로필 이미지 */}
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <ProfileIcon className="w-full h-full" />
        )}
      </div>
      {/* 이름과 말풍선 */}
      <div className="flex flex-col items-start flex-1">
        <p className="text-[#6F7173] text-sm font-semibold mb-1">{name}</p>
        <div className="flex items-end gap-2 w-full">
          <div className="max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-snug bg-white border border-[#ECEEF0] rounded-tl-none">
            <p className="break-words">{text}</p>
          </div>
          <p className="text-[10px] text-gray-500 flex-shrink-0 pb-1">{`${hh}:${mm}`}</p>
        </div>
      </div>
    </div>
  );
};

// 방별 로컬스토리지 키
const keyOf = (chatId: string) => `chat:${chatId}`;
type MessagesData = {
  [key: string]: Message[];
};

const ChatRoom = () => {
  const { id: chatId = "" } = useParams();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // 방 이름 매핑
  const roomName = useMemo(() => {
    // messagesData나 usersData가 로드되지 않았으면 계산을 시도하지 않음
    if (!messagesData || !usersData) return "대화";
    // message.json의 키 순서와 userList.json의 사용자 순서가 일치한다고 가정
    const chatIds = Object.keys(messagesData);
    const userIndex = chatIds.findIndex((id) => id === chatId);

    if (userIndex !== -1 && usersData[userIndex]) {
      return usersData[userIndex].name;
    }
    return "대화 상대 없음"; // 사용자를 못 찾을 경우의 기본값
  }, [chatId]);

  // 상대방 정보
  const otherUser = useMemo(() => {
    if (!messagesData || !usersData) return null;
    const chatIds = Object.keys(messagesData);
    const userIndex = chatIds.findIndex((id) => id === chatId);
    if (userIndex !== -1) {
      return usersData[userIndex];
    }
    return null;
  }, [chatId]);

  // 최초 로드: 로컬스토리지에서 이전 메시지 불러오기
  useEffect(() => {
    if (!chatId) return;
    const raw = localStorage.getItem(keyOf(chatId));
    if (raw) {
      setMessages(JSON.parse(raw));
    } else {
      if (messagesData) {
        const initialMessages = (messagesData as MessagesData)[chatId] || [];
        setMessages(initialMessages);
      }
    }
  }, [chatId]);
  // 메시지 변경 시 로컬스토리지에 저장 + 스크롤 맨 아래로
  useEffect(() => {
    if (!chatId || messages.length === 0) return;
    localStorage.setItem(keyOf(chatId), JSON.stringify(messages));
    requestAnimationFrame(() => {
      scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight });
    });
  }, [chatId, messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const m: Message = {
      id: crypto.randomUUID(),
      chatId: chatId,
      sender: "me", // 나만 보냄
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, m]);
    setInput("");
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <Container>
      <StatusBar className="absolute inset-x-0 top-0 w-full h-[44px] z-50 bg-[#F7FBFF] pointer-events-none" />
      <Header
        title={roomName}
        left={
          <Link to="/chats" aria-label="뒤로 가기">
            <BackwardIcon className="flex items-center justify-center w-[24px] h-[24px]" />
          </Link>
        }
        right={
          <>
            <button aria-label="검색">
              <SearchIcon className="flex items-center justify-center w-[32px] h-[32px]" />
            </button>
            <button aria-label="메뉴">
              <MenuIcon className="flex items-center justify-center w-[32px] h-[32px]" />
            </button>
          </>
        }
        className="bg-[#F7FBFF]"
      />
      <Content>
        {/* Content 내부에 채팅방 UI 전체를 구성합니다. */}
        <div className="relative w-full h-full bg-[#F7FBFF] pt-[44px] pb-[80px]">
          {/* 메시지 스크롤 영역 */}
          <div
            ref={scrollerRef}
            className="absolute top-12 bottom-[80px] left-0 right-0 overflow-y-auto p-4 space-y-2"
          >
            {messages.map((m) => (
              <Bubble
                key={m.id}
                me={m.sender === "me"}
                text={m.text}
                time={m.createdAt}
                name={otherUser?.name || "상대방"}
                avatarUrl={otherUser?.profileImage}
              />
            ))}
          </div>
        </div>
      </Content>
      {/* 입력 바 */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] flex items-center gap-2 p-4 bg-white z-10">
        <div className="relative flex-1 flex items-center h-[44px] border-[#ECEEF0] border rounded-full -translate-y-1.5">
          <button className="absolute left-1 top-1/2 -translate-y-1/2 z-10 ">
            <AddIcon className="items-center justify-center w-[28px] h-[28px] " />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="메시지 보내기"
            className="w-full h-full rounded-full pl-11 pr-10 text-sm bg-[#F9FAFB] outline-none"
          />
        </div>
        <button
          onClick={send}
          disabled={!input.trim()}
          className="w-[44px] h-[44px] rounded-full -translate-y-1.5 "
        >
          {input.trim() ? (
            <SendActiveIcon className="w-full h-full cursor-pointer bg-white" />
          ) : (
            <SendDefaultIcon className="w-full h-full bg-white" />
          )}
        </button>
      </div>
    </Container>
  );
};
export default ChatRoom;
