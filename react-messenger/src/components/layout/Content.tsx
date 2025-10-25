import type { ReactNode } from "react";

type Props = { children: ReactNode };

const Content = ({ children }: Props) => {
  return (
    <main className=" pt-[var(--header-height)] h-[var(--content-height)] bg-transparent overflow-hidden ">
      {children}
    </main>
  );
};

export default Content;
