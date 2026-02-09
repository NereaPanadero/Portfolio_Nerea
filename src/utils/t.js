export function t(value, lang) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") return value[lang] ?? value.en ?? value.es ?? "";
  return "";
}
