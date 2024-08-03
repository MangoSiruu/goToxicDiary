export const removeIcons = (name) => name.replace(/[\u{1F600}-\u{1F6FF}]/gu, '').trim();
