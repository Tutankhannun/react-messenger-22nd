// 이후 리팩토링에서 채팅방 컴포넌트로 구현 예정

// import AddIcon from "../../assets/icons/ChatInput/add.svg?react";
// import SendActiveIcon from "../../assets/icons/ChatInput/sendActive.svg?react";
// import SendDefaultIcon from "../../assets/icons/ChatInput/sendDefault.svg?react";

// export default function InputBar({
//   value,
//   setValue,
//   onSend,
// }: {
//   value: string;
//   setValue: (v: string) => void;
//   onSend: () => void;
// }) {
//   const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
//     // IME(한글 등) 조합 중 엔터 전송 방지
//     // @ts-ignore
//     if (e.nativeEvent.isComposing) return;
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       onSend();
//     }
//   };

//   return (
//     <div
//       className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-4 bg-white z-10"
//       style={{
//         paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
//         height: "calc(56px + env(safe-area-inset-bottom))",
//       }}
//     >
//       <div className="relative flex-1 flex items-center h-[44px] border-grey-09 border rounded-full">
//         <button
//           aria-label="첨부"
//           type="button"
//           className="absolute left-1 top-1/2 -translate-y-1/2 z-10"
//         >
//           <AddIcon className="icon-sm" />
//         </button>
//         <label htmlFor="chat-input" className="sr-only">
//           메시지 입력
//         </label>
//         <input
//           id="chat-input"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           onKeyDown={onKeyDown}
//           placeholder="메시지 보내기"
//           autoComplete="off"
//           autoCorrect="off"
//           autoCapitalize="none"
//           inputMode="text"
//           className="w-full h-full rounded-full pl-11 pr-10 text-body-md bg-grey-11 outline-none"
//         />
//       </div>
//       <button
//         aria-label="전송"
//         type="button"
//         onClick={onSend}
//         disabled={!value.trim()}
//         className="icon-lg rounded-full"
//       >
//         {value.trim() ? (
//           <SendActiveIcon className="w-full h-full" />
//         ) : (
//           <SendDefaultIcon className="w-full h-full" />
//         )}
//       </button>
//     </div>
//   );
// }
