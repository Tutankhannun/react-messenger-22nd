import { type RawMessage } from "@type/chat";

/** 맨 끝에서부터 'me'를 만날 때까지의 연속된 other 개수 */
export function computeUnread(messages: RawMessage[]): number {
  let cnt = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.sender === "other") cnt++;
    else break; // 내가 보낸 메시지를 만나면 그 이전은 읽은 것으로 간주
  }
  return cnt;
}
