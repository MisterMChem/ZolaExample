
export function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value) return [value];
  return [];
}
