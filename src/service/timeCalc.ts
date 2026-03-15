export function timeLeft(targetTime: string): string {
  const targetDate = new Date(targetTime);
  const now = new Date();

  const diffMs = targetDate.getTime() - now.getTime();

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));

  if (days >= 1) return `마감까지 ${days}일`;
  if (hours > 1) return `마감까지 ${hours}시간`;
  if (hours >= 0) return `마감까지 ${hours}시간 미만`;

  return `${targetDate.toISOString().split("T")[0]}에 종료`;
}
