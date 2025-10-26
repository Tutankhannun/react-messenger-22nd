import { useState } from "react";
import { Outlet, useOutletContext, useLocation } from "react-router-dom";
import { MessagesProvider } from "@/stores/messages";

import Container from "@components/layout/Container";
import Content from "@components/layout/Content";
import Navbar from "@components/layout/Navbar";
import Header from "@components/layout/Header";
import StatusBar from "@assets/statusBar/StatusBar.svg?react";
import StatusBarWhite from "@assets/statusBar/StatusBarWhite.svg?react";

// 자식 페이지에서 Header를 제어하기 위한 타입과 커스텀 훅
type HeaderContextType = (options: {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}) => void;

export function useHeader() {
  return useOutletContext<HeaderContextType>();
}

const Layout = () => {
  // Layout이 Header의 상태(제목, 아이콘)를 직접 관리
  const [headerOptions, setHeaderOptions] = useState({
    title: "",
    left: undefined,
    right: undefined,
  });

  const location = useLocation();
  const isProfileRoom = location.pathname.startsWith("/profile/");

  return (
    <Container>
      <MessagesProvider>
        {isProfileRoom ? (
          <StatusBarWhite className="absolute inset-x-0 top-0 w-full h-[var(--statusbar-height)] bg-transparent z-50 pointer-events-none" />
        ) : (
          <StatusBar className="absolute inset-x-0 top-0 w-full h-[var(--statusbar-height)] bg-transparent z-50 pointer-events-none" />
        )}
        {/* StatusBar 바로 밑에 Header를 고정 배치 */}
        <Header
          title={headerOptions.title}
          left={headerOptions.left}
          right={headerOptions.right}
        />
        <Content>
          {/* 페이지 내용이 Header(48px)와 Navbar(84px)에 가려지지 않도록 여백*/}
          <div className="h-full bottom-[1px] scrollbar-hide">
            {/* Outlet을 통해 자식 페이지들에게 setHeaderOptions 함수를 전달 */}
            <Outlet context={setHeaderOptions} />
          </div>
        </Content>
        {!isProfileRoom && <Navbar />}
      </MessagesProvider>
    </Container>
  );
};

export default Layout;
