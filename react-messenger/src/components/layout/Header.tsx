import React from "react";

type Props = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

const Header: React.FC<Props> = ({ title, left, right }) => {
  return (
    <header className="w-[375px] h-[48px] flex items-center justify-between px-4 bg-white sticky top-0 z-10 border-b">
      {/* 왼쪽 & 타이틀 영역 */}
      <div className="flex items-center gap-2">
        {left}
        <h1 className="text-[22px] font-semibold">{title}</h1>
      </div>
      {/* 오른쪽 영역 */}
      <div className="flex items-center gap-4">{right}</div>
    </header>
  );
};

export default Header;
