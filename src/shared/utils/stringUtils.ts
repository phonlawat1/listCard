export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

export const truncate = (
  str: string,
  length: number,
  suffix: string = "..."
): string => {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
};

export const removeWhitespace = (str: string): string => {
  return str.replace(/\s/g, "");
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const containsPattern = (str: string, pattern: string): boolean => {
  return str.toLowerCase().includes(pattern.toLowerCase());
};
