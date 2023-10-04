import { NextFireAuthContextProvider } from "next-fire-auth/context/NextFireAuthContext";
import { DefaultCookieManager } from "next-fire-auth/cookies/DefaultCookieManager";
import { CookieManager } from "next-fire-auth/cookies/types/CookieManager";
import { useAuthContext } from "next-fire-auth/hooks/client/useAuthContext";
import { NextFireAuthConfig } from "next-fire-auth/types/NextFireAuthConfig";
import { NextFireAuthContextProviderProps } from "next-fire-auth/types/NextFireAuthContextProviderProps";
import { NextFireAuthContextType } from "next-fire-auth/types/NextFireAuthContextType";

export {
  NextFireAuthContextProvider,
  DefaultCookieManager as BaseCookieManager,
  CookieManager,
  useAuthContext,
  NextFireAuthConfig,
  NextFireAuthContextProviderProps,
  NextFireAuthContextType,
};
