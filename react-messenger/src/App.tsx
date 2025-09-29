import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./views/Layout";
import Spinner from "./components/common/Spinner";

import FriendPage from "./pages/FriendPage";
import OpenChatPage from "./pages/OpenChatPage";
import ShopPage from "./pages/ShopPage";
import MorePage from "./pages/MorePage";
import ProfilePage from "./pages/ProfilePage";

const ChatsList = lazy(() => import("./pages/ChatListPage"));
const ChatRoom = lazy(() => import("./pages/ChatRoom"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 프레임 */}
        <Route
          path="/"
          element={
            <Suspense fallback={<Spinner />}>
              <Layout />
            </Suspense>
          }
        >
          {/* 탭 루트들 */}
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <FriendPage />
              </Suspense>
            }
          />
          <Route
            path="chats"
            element={
              <Suspense fallback={<Spinner />}>
                <ChatsList />
              </Suspense>
            }
          />
          <Route path="openChat" element={<OpenChatPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="more" element={<MorePage />} />
        </Route>
        {/* 상세 */}
        <Route path="profile/:userId" element={<ProfilePage />} />
        <Route path="/chats/:id" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
