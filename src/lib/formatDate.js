/**
 * ISO文字列やDateオブジェクトを
 * "yyyy/MM/dd HH:mm" 形式に変換する
 */
export function formatDate(dateInput) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const pad = (num) => String(num).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 0-indexed
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
