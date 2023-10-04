import Cookies from "js-cookie";

export const DefaultCookieManager = {
  addAuthCookie: (uid: string) => {
    Cookies.set("uid", uid, { expires: 7 });
  },
  removeAuthCookie: () => {
    Cookies.remove("uid");
  },
};
