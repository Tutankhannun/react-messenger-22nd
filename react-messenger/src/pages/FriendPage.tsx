import React, { useEffect, useState } from "react";
import type { Friend } from "../types/friend";
import { FriendItem } from "../components/friends/FriendItem";
import { useHeader } from "../views/Layout";

import SearchIcon from "../assets/icons/Buttons/header/search.svg?react";
import AddFriendIcon from "../assets/icons/Buttons/header/addFriend.svg?react";
import SettingsIcon from "../assets/icons/Buttons/header/setting.svg?react";

const FriendsPage: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  const setHeader = useHeader();
  useEffect(() => {
    setHeader({
      title: "친구",
      right: (
        <>
          <button aria-label="검색">
            <SearchIcon className="flex items-center justify-center w-[32px] h-[32px]" />
          </button>
          <button aria-label="친구추가">
            <AddFriendIcon className="flex items-center justify-center w-[32px] h-[32px]" />
          </button>
          <button aria-label="설정">
            <SettingsIcon className="flex items-center justify-center w-[32px] h-[32px]" />
          </button>
        </>
      ),
    });
  }, [setHeader]);

  // JSON 불러오기
  useEffect(() => {
    fetch("/data/userList.json") // 슬래시(/) 시작
      .then((res) => res.json())
      .then((data: Friend[]) => setFriends(data))
      .catch((err) => console.error("친구 목록 로드 실패:", err));
  }, []);

  return (
    <div className="mx-auto w-[375px] h-[812px] bg-white flex flex-col">
      {/* 친구 리스트 */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-[343px] mx-auto ">
          {friends.map((f, index) => (
            <FriendItem key={index} data={f} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
