import type { Friend } from "@type/friend";

type Props = {
  friend: Friend;
  onClick?: (friend: Friend) => void;
};

export default function FriendItem({ friend, onClick }: Props) {
  const initials = friend.name.slice(0, 1);

  return (
    <li className="flex items-center justify-between">
      <button
        type="button"
        aria-label={`${friend.name} 프로필 보기`}
        onClick={() => onClick?.(friend)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left active:bg-black/[0.04] focus:outline-none"
      >
        <div className="flex items-center gap-3">
          {/* 아바타 */}
          {friend.avatarUrl ? (
            <img
              src={friend.avatarUrl}
              alt=""
              className="icon-xl rounded-full object-cover"
            />
          ) : (
            <div className="icon-lg rounded-full bg-black/5 grid place-items-center text-sm text-black/60">
              {initials}
            </div>
          )}

          {/* 이름/상태 */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-[15px] text-black">{friend.name}</p>
              {friend.badgeText && (
                <span className="rounded-full bg-[#FFE9C2] px-2 py-0.5 text-[10px] text-[#9A5E00]">
                  {friend.badgeText}
                </span>
              )}
            </div>
            {/* 상태 메시지 */}
            {friend.status && (
              <p className="truncate text-[12px] text-black/50">
                {friend.status}
              </p>
            )}

            {/* 프로필 음악 */}
            {friend.profileMusic && (
              <div className="truncate text-[11px] text-[#3678F5]">
                {friend.profileMusic}
              </div>
            )}
          </div>
        </div>
      </button>
    </li>
  );
}
