import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@views/Layout";
import Spinner from "@components/common/Spinner";

// import FriendPage from "@pages/FriendPage";
// import ProfilePage from "@pages/ProfilePage";
import OpenChatPage from "@pages/OpenChatPage";
import ShopPage from "@pages/ShopPage";
import MorePage from "@pages/MorePage";

const FriendPage = lazy(() => import("@pages/FriendPage"));
const ProfilePage = lazy(() => import("@pages/ProfilePage"));
const ChatsList = lazy(() => import("@pages/ChatListPage"));
const ChatRoom = lazy(() => import("@pages/ChatRoom"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* 공통 프레임 */}
          <Route path="/" element={<Layout />}>
            {/* 탭 루트들 */}
            <Route index element={<FriendPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="chats" element={<ChatsList />} />
            <Route path="openChat" element={<OpenChatPage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="more" element={<MorePage />} />
          </Route>
          <Route path="/chats/:id" element={<ChatRoom />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
