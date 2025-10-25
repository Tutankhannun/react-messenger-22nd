import React from "react";
import { useLocation } from "react-router-dom";

type Props = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
};

const Header: React.FC<Props> = ({ title, left, right }) => {
  const location = useLocation();
  const isChatRoom = location.pathname.startsWith("/chats/");

  return (
    <header
      className={`phone-header ${isChatRoom ? "bg-fill-chatroom" : "bg-white"}`}
    >
      {/* 왼쪽 & 타이틀 영역 */}
      <div className="flex items-center">
        {left}
        <h1 className={`${isChatRoom ? "text-title-lg" : "text-headline"}`}>
          {title}
        </h1>
      </div>
      {/* 오른쪽 영역 */}
      <div className="flex items-center gap-4">{right}</div>
    </header>
  );
};

export default Header;
