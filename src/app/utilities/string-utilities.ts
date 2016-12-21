export function limitWithEllipsis(str, limit) {
  if (str.length > limit) {
    return str.slice(0, limit - 1) + '…';
  } else {
    return str;
  }
}
