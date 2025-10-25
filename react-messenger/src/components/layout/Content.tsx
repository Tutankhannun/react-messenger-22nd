import type { ReactNode } from "react";

type Props = { children: ReactNode };

const Content = ({ children }: Props) => {
  return (
    <main className=" pt-[var(--header-height)] h-[var(--chatRoomContent-height)] overflow-hidden ">
      {children}
    </main>
  );
};

export default Content;
