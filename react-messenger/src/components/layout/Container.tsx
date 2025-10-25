import type { ReactNode } from "react";

type Props = { children: ReactNode };

const Container = ({ children }: Props) => {
  return (
    // 전체 화면을 채우는 배경
    <div className="min-h-screen w-full bg-fill-strong flex items-center justify-center">
      {/* 스마트폰 모양의 프레임 */}
      <div className="relative phone-frame bg-fill-normal shadow-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Container;
