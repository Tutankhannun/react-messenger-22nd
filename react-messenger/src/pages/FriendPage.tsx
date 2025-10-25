import React, { useEffect, useState } from "react";
import type { Friend } from "@type/friend";
import FriendItem from "@components/friends/FriendItem";
import { useHeader } from "@views/Layout";
import Section from "@components/friends/Section";
import AvatarStack from "@components/common/AvatarStack";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@assets/icons/Buttons/header/search.svg?react";
import AddFriendIcon from "@assets/icons/Buttons/header/addFriend.svg?react";
import SettingsIcon from "@assets/icons/Buttons/header/setting.svg?react";

const FriendsPage: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const navigate = useNavigate();

  const setHeader = useHeader();
  useEffect(() => {
    setHeader({
      title: "친구",
      right: (
        <>
          <button aria-label="검색">
            <SearchIcon className="icon-md flex items-center justify-center " />
          </button>
          <button aria-label="친구추가">
            <AddFriendIcon className="icon-md flex items-center justify-center" />
          </button>
          <button aria-label="설정">
            <SettingsIcon className="icon-md flex items-center justify-center " />
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

  // 그룹 분류
  const me = friends.find((f) => f.id === "me");
  const updated = friends.filter((f) => f.updatedProfile);
  const birthday = friends.filter((f) => f.birthdaySoon);
  const favorites = friends.filter((f) => f.favorite);
  const normalFriends = friends.filter((f) => f.id !== "me" && !f.isChannel);
  const channels = friends.filter((f) => f.isChannel);

  const updatedThumbs = updated.map((f) => f.avatarUrl).slice(0, 4);
  const birthdayThumbs = birthday.map((f) => f.avatarUrl).slice(0, 4);
  const favoritesThumbs = favorites.map((f) => f.avatarUrl).slice(0, 4);

  const goProfile = (f: Friend) =>
    navigate(`/profile/${encodeURIComponent(f.id)}`);

  return (
    <div className="mx-auto h-full  flex flex-col scrollbar-hide">
      {/* 스크롤 가능한 리스트 본문 */}
      <div className="flex flex-col overflow-y-auto scrollbar-hide">
        {/* 내 프로필 */}
        {me && (
          <div className="border-b border-black/5 py-2">
            <FriendItem friend={me} onClick={goProfile} />
          </div>
        )}

        {/* 업데이트한 친구 */}
        {
          <Section
            title="업데이트한 프로필"
            count={updated.length}
            showCountOnTitle
            trailing={<AvatarStack urls={updatedThumbs} />}
          >
            {updated.length > 0 ? (
              <ul>
                {updated.map((f) => (
                  <FriendItem key={f.id} friend={f} onClick={goProfile} />
                ))}
              </ul>
            ) : (
              <div className="px-4 pb-3 text-[13px] text-black/40">
                최근에 프로필을 업데이트한 친구가 없어요
              </div>
            )}
          </Section>
        }

        {/* 생일인 친구 */}
        <Section
          title="생일인 친구"
          count={birthday.length}
          showCountOnTitle
          trailing={<AvatarStack urls={birthdayThumbs} />}
        >
          {birthday.length > 0 ? (
            <ul>
              {birthday.map((f) => (
                <FriendItem key={f.id} friend={f} onClick={goProfile} />
              ))}
            </ul>
          ) : (
            <div className="px-4 pb-3 text-[13px] text-black/40">
              오늘은 생일인 친구가 없어요
            </div>
          )}
        </Section>

        {/* 즐겨찾기 */}
        {favorites.length > 0 && (
          <Section
            title="즐겨찾기"
            count={favorites.length}
            showCountOnTitle
            trailing={<AvatarStack urls={favoritesThumbs} />}
          >
            <ul>
              {favorites.map((f) => (
                <FriendItem key={f.id} friend={f} onClick={goProfile} />
              ))}
            </ul>
          </Section>
        )}

        {/* 전체 친구 */}
        <Section title="친구" showCountOnTitle count={normalFriends.length}>
          <ul>
            {normalFriends.map((f) => (
              <FriendItem key={f.id} friend={f} onClick={goProfile} />
            ))}
          </ul>
        </Section>

        {/* 채널 */}
        {channels.length > 0 && (
          <Section title="채널" showCountOnTitle count={channels.length}>
            <ul>
              {channels.map((f) => (
                <FriendItem key={f.id} friend={f} onClick={goProfile} />
              ))}
            </ul>
          </Section>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
