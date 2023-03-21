export const currency = (number, format = "vi-VN") => {
  const formatter = new Intl.NumberFormat(format, {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(number);
};
