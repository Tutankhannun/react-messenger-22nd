// 이후 리팩토링에서 채팅방 컴포넌트로 구현 예정

// import ProfileIcon from "../../assets/icons/defaultProfile.svg?react";

// export default function Bubble({
//   me,
//   text,
//   time,
//   name,
//   avatarUrl,
// }: {
//   me: boolean;
//   text: string;
//   time: string;
//   name: string;
//   avatarUrl?: string;
// }) {
//   const t = new Date(time);
//   const hh = String(t.getHours()).padStart(2, "0");
//   const mm = String(t.getMinutes()).padStart(2, "0");

//   if (me) {
//     return (
//       <div className="w-full flex items-end gap-2 flex-row-reverse flex-1">
//         <div className="max-w-[70%] rounded-2xl px-3 py-2 text-body-md leading-snug bg-white border border-grey-09 rounded-tr-none">
//           <p className="break-words">{text}</p>
//         </div>
//         <p className="text-[10px] text-gray-500 flex-shrink-0 pb-1">{`${hh}:${mm}`}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full flex items-start gap-3">
//       {/* 프로필 이미지 */}
//       <div className="avatar-md rounded-full overflow-hidden flex-shrink-0">
//         {avatarUrl ? (
//           <img
//             src={avatarUrl}
//             alt="avatar"
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <ProfileIcon className="w-full h-full" />
//         )}
//       </div>
//       {/* 이름 + 말풍선 */}
//       <div className="flex flex-col items-start flex-1">
//         <p className="text-gray-600 text-body-sm font-semibold mb-1">{name}</p>
//         <div className="flex items-end gap-2 w-full">
//           <div className="max-w-[80%] rounded-2xl px-3 py-2 text-body-md leading-snug bg-white border border-grey-09 rounded-tl-none">
//             <p className="break-words">{text}</p>
//           </div>
//           <p className="text-[10px] text-gray-500 flex-shrink-0 pb-1">{`${hh}:${mm}`}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
