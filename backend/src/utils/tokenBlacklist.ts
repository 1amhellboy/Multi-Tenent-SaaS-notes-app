// src/utils/tokenBlacklist.ts
const blacklist = new Set<string>();

export function addToBlacklist(token: string) {
  blacklist.add(token);
}

export function isBlacklisted(token: string): boolean {
  return blacklist.has(token);
}

