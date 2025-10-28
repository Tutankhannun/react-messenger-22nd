import React from "react";
import { useParams } from "react-router-dom";

import ChatIcon from "@assets/icons/Buttons/profile/memo.svg?react";
import MultiProfileIcon from "@assets/icons/Buttons/profile/multi_person.svg?react";
import ProfileEditIcon from "@assets/icons/Buttons/profile/profileEdit.svg?react";
import CallIcon from "@assets/icons/Buttons/profile/call.svg?react";

import userData from "@assets/data/userList.json";

type Action = {
  id: number;
  label: string;
  icon: React.ReactNode;
};

const ProfileActionBar: React.FC = () => {
  const { id: profileId } = useParams<{ id: string }>();

  const myId = String((userData as any)?.id ?? "me");
  const isMe = !!profileId && profileId === myId;

  const actionsMe: Action[] = [
    {
      id: 1,
      label: "내 메모",
      icon: <ChatIcon className="size-8 text-white" />,
    },
    {
      id: 2,
      label: "프로필 편집",
      icon: <ProfileEditIcon className="size-8 text-white" />,
    },
    {
      id: 3,
      label: "멀티 프로필",
      icon: <MultiProfileIcon className="size-8 text-white" />,
    },
  ];

  // 다른 사람 프로필일 때 보여줄 액션들 (아이콘만 다르게 구성)
  const actionsOther: Action[] = [
    {
      id: 1,
      label: "1:1 채팅",
      icon: <ChatIcon className="size-8 text-white" />,
    },
    {
      id: 2,
      label: "보이스톡",
      icon: <CallIcon className="size-8 text-white" />,
    },
  ];

  const actions = isMe ? actionsMe : actionsOther;

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 bottom-[53px] w-[343px] px-3
                 flex justify-between items-center pointer-events-auto"
    >
      {actions.map((action) => (
        <button
          key={action.id}
          className="w-[72px] flex flex-col items-center gap-3 shrink-0"
        >
          <span className="size-[64px] rounded-full bg-grey-08/50 grid place-items-center">
            {action.icon}
          </span>
          <span className="text-white text-[14px] leading-[20px]">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ProfileActionBar;
