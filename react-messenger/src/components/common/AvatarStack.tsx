import type { CSSProperties } from "react";
import ProfileIcon from "@assets/icons/defaultProfile.svg?react";

type Props = {
  urls: (string | undefined)[];
  max?: number; // 최대 표시 개수
  size?: number; // px
  overlap?: number; // 겹침 거리(px)
};

export default function AvatarStack({
  urls,
  max = 4,
  size = 34,
  overlap = 12,
}: Props) {
  const list = urls.slice(0, max);
  return (
    <div className="flex items-center">
      {list.map((u, i) => {
        const style: CSSProperties = {
          width: size,
          height: size,
          marginLeft: i === 0 ? 0 : -overlap,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.9)",
        };
        return u ? (
          <img
            key={i}
            src={u}
            alt=""
            className="rounded-full object-cover"
            style={style}
          />
        ) : (
          <ProfileIcon key={i} className="avatar-stack" style={style} />
        );
      })}
    </div>
  );
}
