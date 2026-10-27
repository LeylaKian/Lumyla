const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toPersianDigits(value) {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)])
}
