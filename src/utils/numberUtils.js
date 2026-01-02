const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const englishDigits = "0123456789";

export function toPersianNumber(value) {
  if (!value) return "";
  return value.toString().replace(/\d/g, d => persianDigits[d]);
}

export function toEnglishNumber(value) {
  if (!value) return "";
  return value
    .toString()
    .replace(/[۰-۹]/g, d => englishDigits[persianDigits.indexOf(d)]);
}
