export function enumNameByValue<T extends object>(
  enumObj: T,
  value: any,
): string | null {
  const obj = Object.entries(enumObj).filter(([_, val]) => val === value);

  if (obj.length === 0) {
    return null;
  }

  return obj[0][0];
}
