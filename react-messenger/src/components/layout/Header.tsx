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
      className={`w-[375px] h-[48px] flex items-center justify-between px-4 sticky top-[44px] z-10 ${
        isChatRoom ? "bg-[#F7FBFF]" : "bg-white"
      }`}
    >
      {" "}
      {/* 왼쪽 & 타이틀 영역 */}
      <div className="flex items-center gap-2">
        {left}
        <h1
          className={`${
            isChatRoom
              ? "fomt-bold text-lg leading-[28px]"
              : "font-bold text-xl leading-[32px]"
          }`}
        >
          {title}
        </h1>
      </div>
      {/* 오른쪽 영역 */}
      <div className="flex items-center gap-4">{right}</div>
    </header>
  );
};

export default Header;
