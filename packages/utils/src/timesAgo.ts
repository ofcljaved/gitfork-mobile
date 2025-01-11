const TIME_IN_SECONDS = {
  year: 31536000,
  month: 2592000,
  day: 86400,
  hour: 3600,
  minute: 60,
};

export function timesAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / TIME_IN_SECONDS.year);

  if (interval >= 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / TIME_IN_SECONDS.month);
  if (interval >= 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / TIME_IN_SECONDS.day);
  if (interval >= 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / TIME_IN_SECONDS.hour);
  if (interval >= 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / TIME_IN_SECONDS.minute);
  if (interval >= 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

