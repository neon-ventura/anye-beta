
export const decodeBase64 = (str: string): string => {
  try {
    return atob(str);
  } catch (e) {
    console.error("Failed to decode base64:", e);
    return str;
  }
};
