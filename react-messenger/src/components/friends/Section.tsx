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
  defaultOpen = true,
  trailing,
  showCountOnTitle = false,
  children,
}: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="border-b border-black/5">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {/* 좌측: 제목 (+ 옵션으로 카운트) */}
        <div className="flex items-center gap-2">
          <div className="text-[15px] text-black/70">{title}</div>
          {showCountOnTitle && typeof count !== "undefined" && (
            <span className="text-[12px] text-black/40">{count}</span>
          )}
        </div>
        {/* 우측: (옵션) count → 썸네일 → 화살표 */}
        <div className="flex items-center gap-2">
          {!showCountOnTitle && typeof count !== "undefined" && (
            <span className="text-[12px] text-black/40">{count}</span>
          )}
          {trailing}
          <Dropdown
            className={`icon-xxs transition-transform ${
              open ? "rotate-180" : ""
            } `}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
