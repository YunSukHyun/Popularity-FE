export function timeLeft(targetTime) {
  const targetDate = new Date(targetTime);
  const now = new Date();

  const diffMs = targetDate.getTime() - now.getTime();

  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days >= 1) return `${days}일`;
  else if (1 > days && hours > 1) `${hours}시간`;
  else return `${hours}시간 미만`;
}
