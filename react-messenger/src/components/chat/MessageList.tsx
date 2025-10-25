// 이후 리팩토링에서 채팅방 컴포넌트로 구현 예정

// import type React from "react";
// import Bubble from "./Bubble";
// import type { Message } from "../../types/chat";

// export interface OtherUser {
//   name?: string;
//   profileImage?: string;
// }

// export default function MessageList({
//   scrollerRef,
//   messages,
//   otherUser,
// }: {
//   scrollerRef: React.Ref<HTMLDivElement>;
//   messages: Message[];
//   otherUser?: OtherUser | null;
// }) {
//   return (
//     <div
//       ref={scrollerRef}
//       role="log"
//       aria-live="polite"
//       aria-relevant="additions"
//       className="absolute top-12 bottom-[80px] left-0 right-0 overflow-y-auto p-4 space-y-2"
//     >
//       {messages.map((m) => (
//         <Bubble
//           key={m.id}
//           me={m.sender === "me"}
//           text={m.text}
//           time={m.createdAt}
//           name={otherUser?.name || "상대방"}
//           avatarUrl={otherUser?.profileImage}
//         />
//       ))}
//     </div>
//   );
// }
