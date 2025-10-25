export interface Friend {
  name: string;
  id: string;
  avatarUrl?: string; // 프로필 이미지 URL
  profileMusic?: string; // 프로필 음악
  status?: string; // 상태메시지
  badgeText?: string; // 멀티프로필 라벨
  isChannel?: boolean; // 채널 구분
  favorite?: boolean; // 즐겨찾기
  birthdaySoon?: boolean; // 생일인 친구
  updatedProfile?: boolean; // 최근 프로필 변경 친구
}
