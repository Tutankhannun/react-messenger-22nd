import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Message } from "../types/chat";
import initialMessagesData from "../assets/data/message.json";
import Container from "../components/layout/Container";
import Content from "../components/layout/Content";
import Header from "../components/layout/Header"; // Header 컴포넌트도 직접 사용

import SearchIcon from "../assets/icons/Buttons/header/search.svg?react";
import MenuIcon from "../assets/icons/Buttons/header/menu.svg?react";

// 방별 로컬스토리지 키
const keyOf = (chatId: string) => `chat:${chatId}`;

const ChatRoom = () => {
  const { id: chatId = "" } = useParams();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // 방 이름 매핑
  const roomName = useMemo(
    () => (chatId === "c2" ? "졸준위" : "MEOVV"),
    [chatId]
  );

  // 최초 로드: 로컬스토리지에서 이전 메시지 불러오기
  useEffect(() => {
    if (!chatId) return;
    const raw = localStorage.getItem(keyOf(chatId));
    if (raw) {
      setMessages(JSON.parse(raw));
    } else {
      // 로컬스토리지에 없으면 초기 데이터에서 불러오기
      const initialMessages =
        initialMessagesData[chatId as keyof typeof initialMessagesData] || [];
      setMessages(initialMessages as Message[]);
    }
  }, [chatId]);

  // 메시지 변경 시 로컬스토리지에 저장 + 스크롤 맨 아래로
  useEffect(() => {
    if (!chatId) return;
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
      <Header
        title={roomName}
        left={
          <Link
            to="/chats"
            aria-label="뒤로 가기"
            className="text-2xl font-bold"
          >
            {"<"}
          </Link>
        }
        right={
          <>
            <button aria-label="검색">
              <SearchIcon />
            </button>
            <button aria-label="메뉴">
              <MenuIcon />
            </button>
          </>
        }
      />
      <Content>
        {/* Content 내부에 채팅방 UI 전체를 구성합니다. */}
        <div className="relative w-full h-full bg-sky-100 pt-[44px] pb-[80px]">
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
              />
            ))}
          </div>
        </div>
      </Content>
      {/* 입력 바 */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] flex items-center gap-2 p-4 bg-white z-10 -translate-y-2.5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="메시지 보내기"
          className="flex-1 h-10 rounded-full px-4 text-sm bg-gray-100 outline-none"
        />
        <button
          onClick={send}
          className="h-10 px-4 rounded-full text-sm font-medium bg-black text-white active:opacity-80"
        >
          보내기
        </button>
      </div>
    </Container>
  );
};
export default ChatRoom;

const Bubble = ({
  me,
  text,
  time,
}: {
  me: boolean;
  text: string;
  time: string;
}) => {
  const t = new Date(time);
  const hh = String(t.getHours()).padStart(2, "0");
  const mm = String(t.getMinutes()).padStart(2, "0");
  return (
    <div className={`w-full flex ${me ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-snug shadow-sm ${
          me ? "bg-black text-white" : "bg-gray-100"
        }`}
      >
        <p className="break-words">{text}</p>
        <p
          className={`mt-1 text-[10px] ${
            me ? "text-white/70" : "text-gray-500"
          }`}
        >{`${hh}:${mm}`}</p>
      </div>
    </div>
  );
};
