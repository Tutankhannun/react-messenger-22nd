import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { RawMessage } from "@type/chat";
import usersData from "@assets/data/userList.json";
import messagesData from "@assets/data/message.json";
import Container from "@components/layout/Container";
import Content from "@components/layout/Content";
import Header from "@components/layout/Header";
import StatusBar from "@assets/statusBar/StatusBar.svg?react";
import SearchIcon from "@assets/icons/Buttons/header/search.svg?react";
import MenuIcon from "@assets/icons/Buttons/header/menu.svg?react";
import AddIcon from "@assets/icons/ChatInput/add.svg?react";
import StickerIcon from "@assets/icons/ChatInput/sticker.svg?react";
import SendActiveIcon from "@assets/icons/ChatInput/sendActive.svg?react";
import SendDefaultIcon from "@assets/icons/ChatInput/sendDefault.svg?react";
import BackwardIcon from "@assets/icons/Buttons/header/backward.svg?react";
import ProfileIcon from "@assets/icons/defaultProfile.svg?react";

function dateKey(t: number | string | Date): string {
  const ms = typeof t === "number" ? t : new Date(t).getTime();
  const d = new Date(ms);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function formatKDate(key: string): string {
  // 한국어 날짜 포맷: 2025년 10월 30일
  const [y, m, d] = key.split("-").map((v) => parseInt(v, 10));
  return `${y}년 ${m}월 ${d}일`;
}
const DateDivider: React.FC<{ label: string }> = ({ label }) => (
  <div className="my-3 flex items-center justify-center">
    <span className="inline-flex items-center justify-center w-[158px] h-[22px] rounded-full text-[11px] text-black/50 bg-black/5">
      {label}
    </span>
  </div>
);
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
        <div className=" max-w-[70%] rounded-2xl px-3 py-2 text-title-md bg-white border border-grey-09 rounded-tr-none">
          <p className="break-words">{text}</p>
        </div>
        <p className="text-body-sm text-gray-500 flex-shrink-0 pb-1">{`${hh}:${mm}`}</p>
      </div>
    );
  }
  // 상대가 보낸 메시지
  return (
    <div className="w-full flex items-start gap-3">
      {/* 프로필 이미지 */}
      <div className="avatar-md rounded-full overflow-hidden flex-shrink-0">
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
      {/* 이름 + 말풍선 */}
      <div className="flex flex-col items-start flex-1">
        <p className="text-gray-600 text-title-sm mb-1">{name}</p>
        <div className="flex items-end gap-2 w-full">
          <div className="max-w-[80%] rounded-2xl px-3 py-2 text-title-md bg-white border border-grey-09 rounded-tl-none">
            <p className="break-words">{text}</p>
          </div>
          <p className="text-body-sm text-gray-500 flex-shrink-0 pb-1">{`${hh}:${mm}`}</p>
        </div>
      </div>
    </div>
  );
};
// 방별 로컬스토리지 키
const keyOf = (chatId: string) => `chat:${chatId}`;
type MessagesData = {
  [key: string]: RawMessage[];
};
const ChatRoom = () => {
  const { id: chatId = "" } = useParams();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<RawMessage[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  // 방 제목
  const roomName = useMemo(() => {
    if (!messagesData || !usersData) return "채팅";
    const chatIds = Object.keys(messagesData);
    const userIndex = chatIds.findIndex((id) => id === chatId);
    if (userIndex !== -1 && usersData[userIndex]) {
      return usersData[userIndex].name;
    }
    return "알 수 없음";
  }, [chatId]);
  // 상대 정보
  const otherUser = useMemo(() => {
    if (!messagesData || !usersData) return null;
    const chatIds = Object.keys(messagesData);
    const userIndex = chatIds.findIndex((id) => id === chatId);
    if (userIndex !== -1) {
      return usersData[userIndex];
    }
    return null;
  }, [chatId]);
  // 최초 로드: 로컬스토리지 → 없으면 데이터에서 로드
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
  // 메시지 변경 시 저장 + 스크롤 하단 정렬
  useEffect(() => {
    if (!chatId || messages.length === 0) return;
    localStorage.setItem(keyOf(chatId), JSON.stringify(messages));
    const el = scrollerRef.current;
    if (!el) return;
    const scrollToBottom = () => el.scrollTo({ top: el.scrollHeight });
    requestAnimationFrame(scrollToBottom);
    const t = window.setTimeout(scrollToBottom, 80);
    return () => window.clearTimeout(t);
  }, [chatId, messages]);
  const send = () => {
    const text = input.trim();
    if (!text) return;
    const m: RawMessage = {
      id: crypto.randomUUID(),
      chatId: chatId,
      sender: "me",
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, m]);
    setInput("");
  };
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };
  return (
    <Container>
      <StatusBar className="absolute inset-x-0 top-0 w-full h-[var(--statusbar-height)] z-50 bg-transparent pointer-events-none" />
      <Header
        title={roomName}
        left={
          <Link to="/chats" aria-label="뒤로 가기">
            <BackwardIcon className="icon-md flex items-center justify-center " />
          </Link>
        }
        right={
          <>
            <button aria-label="검색">
              <SearchIcon className="icon-md flex items-center justify-center " />
            </button>
            <button aria-label="메뉴">
              <MenuIcon className="icon-md flex items-center justify-center " />
            </button>
          </>
        }
        className="bg-transparent"
      />
      <Content>
        {/* Content 영역 */}
        <div className="relative w-full h-full bg-transparent">
          {/* 메시지 스크롤 영역 */}
          <div
            ref={scrollerRef}
            className="absolute top-[1px] bottom-[1px] left-0 right-0 overflow-y-auto p-4 space-y-2 scrollbar-hide"
          >
            {
              // 날짜 디바이더 포함 렌더링
              (() => {
                const nodes: React.ReactNode[] = [];
                let prevKey: string | null = null;
                messages.forEach((m, idx) => {
                  const curKey = dateKey(m.createdAt);
                  if (idx === 0 || curKey !== prevKey) {
                    nodes.push(
                      <DateDivider
                        key={`date-${curKey}-${idx}`}
                        label={formatKDate(curKey)}
                      />
                    );
                    prevKey = curKey;
                  }
                  nodes.push(
                    <Bubble
                      key={m.id}
                      me={m.sender === "me"}
                      text={m.text}
                      time={m.createdAt}
                      name={otherUser?.name || "상대"}
                      avatarUrl={otherUser?.avatarUrl}
                    />
                  );
                });
                return nodes;
              })()
            }
          </div>
        </div>
      </Content>
      {/* 입력 바 */}
      <div className="absolute bottom-0 left-0 right-0 h-[var(--chatRoomBottom-height)] flex items-center gap-[4px] p-4 bg-white z-10">
        <div className="relative justify-between flex-1 flex items-center h-[var(--chatSendbar-height)] border-grey-09 border rounded-full -translate-y-1.5">
          <button
            aria-label="첨부"
            type="button"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 "
          >
            <AddIcon className="icon-sm items-center justify-center " />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="메시지 입력"
            className="w-full h-full rounded-full pl-11 pr-10 text-sm bg-grey-11 outline-none"
          />
          <button
            aria-label="이모티콘"
            type="button"
            className="absolute w-[26px] h-[26px] bg-grey-07 rounded-full right-2 top-1/2 -translate-y-1/2 z-10 "
          >
            <StickerIcon className="w-5 h-5 -translate-x-[-3px]" />
          </button>
        </div>
        <button
          aria-label="전송"
          type="button"
          onClick={send}
          disabled={!input.trim()}
          className="icon-lg rounded-full -translate-y-1.5 "
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
