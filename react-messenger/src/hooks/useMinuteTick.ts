import { useEffect, useState } from "react";

// 매 분 렌더 트리거 → 상대 표시(오늘/어제/요일)가 자동으로 갱신
export function useMinuteTick() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 1_000_000), 60_000);
    return () => clearInterval(id);
  }, []);
}
