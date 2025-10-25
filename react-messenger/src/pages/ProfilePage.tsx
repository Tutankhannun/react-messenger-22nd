// src/pages/ProfilePage.tsx
import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Friend } from "@type/friend";
import { useHeader } from "@views/Layout";
import usersData from "@assets/data/userList.json";
import ProfileActionBar from "@components/profile/ProfileActionBar";

import CloseIcon from "@assets/icons/Buttons/header/cancel.svg?react";
import GiftIcon from "@assets/icons/Buttons/header/gift.svg?react";
import QrCodeIcon from "@assets/icons/Buttons/header/QR.svg?react";
import SettingIcon from "@assets/icons/Buttons/header/profileSetting.svg?react";

const ProfilePage: React.FC = () => {
  const { id: rawId } = useParams();
  const navigate = useNavigate();
  const setHeader = useHeader();

  // 헤더 세팅
  useEffect(() => {
    setHeader({
      title: "",
      left: (
        <Link to="/" aria-label="뒤로 가기">
          <CloseIcon className="icon-md flex items-center justify-center " />
        </Link>
      ),
      right: (
        <>
          <GiftIcon className="icon-md flex items-center justify-center " />
          <QrCodeIcon className="icon-md flex items-center justify-center ml-2" />
          <SettingIcon className="icon-md flex items-center justify-center ml-2" />
        </>
      ),
    });
  }, [setHeader, navigate]);

  const id = decodeURIComponent(rawId ?? "");
  const friend = useMemo(() => {
    // usersData 타입 단언
    const list = usersData as unknown as Friend[];
    return list.find((f) => f.id === id);
  }, [id]);

  // 가드
  if (!friend) {
    return (
      <div className="mx-auto w-[375px] h-[812px] bg-black text-white grid place-items-center">
        프로필 정보를 찾을 수 없어요
      </div>
    );
  }

  const cover = friend.avatarUrl || "/images/cover-placeholder.jpg";

  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative w-full h-[var(--covover-image-height)] overflow-hidden">
        <img
          src={cover}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black" />

        {/* 아바타 + 이름 */}
        <div className="absolute left-0 right-0 bottom-28 flex flex-col items-center">
          <div className="h-24 w-24 rounded-full ring-1 ring-white overflow-hidden bg-white/20 grid place-items-center">
            {friend.avatarUrl ? (
              <img
                src={friend.avatarUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-3xl">{friend.name.slice(0, 1)}</span>
            )}
          </div>
          <div className="mt-3 text-headline text-white">{friend.name}</div>
        </div>
      </div>
      <ProfileActionBar />
    </div>
  );
};

export default ProfilePage;
