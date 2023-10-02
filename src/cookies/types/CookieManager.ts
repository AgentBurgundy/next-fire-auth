export type CookieManager = {
  addAuthCookie: (uid: string) => void;
  removeAuthCookie: () => void;
};
