// 포맷 규칙
// - 오늘:  "오전/오후 h:mm"
// - 어제:  "어제"
// - 7일 이내: "월요일/화요일..."
// - 올해: "M월 D일"
// - 그 외: "YYYY.MM.DD"

const KOR_DAY = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

const pad = (n: number) => n.toString().padStart(2, "0");
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

export function formatChatTime(input: string | number | Date, nowArg?: Date) {
  const now = nowArg ?? new Date();
  const d = new Date(input);

  // 오늘
  if (isSameDay(d, now)) {
    const h = d.getHours();
    const ampm = h < 12 ? "오전" : "오후";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const mm = pad(d.getMinutes());
    return `${ampm} ${hour12}:${mm}`;
  }

  // 어제
  const diffDays = Math.round(
    (startOfDay(now).getTime() - startOfDay(d).getTime()) / 86400000
  );
  if (diffDays === 1) return "어제";

  // 7일 이내 → 요일
  if (diffDays > 1 && diffDays < 7) return KOR_DAY[d.getDay()];

  // 같은 해 → "M월 D일"
  if (d.getFullYear() === now.getFullYear())
    return `${d.getMonth() + 1}월 ${d.getDate()}일`;

  // 그 외 → "YYYY.MM.DD"
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}
