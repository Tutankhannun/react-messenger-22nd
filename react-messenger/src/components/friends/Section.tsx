import { useState } from "react";
import type { PropsWithChildren, ReactNode } from "react";

import Dropdown from "@assets/icons/dropdown/dropdown.svg?react";

type Props = {
  title: string;
  count?: number | string;
  defaultOpen?: boolean;
  trailing?: ReactNode;
  showCountOnTitle?: boolean; // true면 '제목 옆'에 count 표시
};

export default function Section({
  title,
  count,
  defaultOpen = false,
  trailing,
  showCountOnTitle = false,
  children,
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(defaultOpen);
  const isAlwaysOpen = title === "친구" || title === "채널";

  return (
    <section className="border-b border-black/5 py-2">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4"
        onClick={() => {
          if (!isAlwaysOpen) setOpen(!open);
        }}
        aria-expanded={open}
      >
        {/* 좌측: 제목 (+ 옵션으로 카운트) */}
        <div className="flex items-center gap-1">
          <div className="text-body-sm text-black/70">{title}</div>
          {showCountOnTitle && typeof count !== "undefined" && (
            <span className="text-body-sm text-black/40">{count}</span>
          )}
        </div>
        {/* 우측: (옵션) count → 썸네일 → 화살표 */}
        <div className="flex items-center gap-2">
          {!showCountOnTitle && typeof count !== "undefined" && (
            <span className="text-body-sm text-black/40">{count}</span>
          )}
          {!open && trailing}
          {!isAlwaysOpen && (
            <Dropdown
              className={`icon-xxs transition-transform ${
                open ? "rotate-180 duration-500" : ""
              }`}
            />
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] ${
          open || isAlwaysOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
