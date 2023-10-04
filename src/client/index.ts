import { NextFireAuthContextProvider } from "@/context/NextFireAuthContext";
import { DefaultCookieManager } from "@/cookies/DefaultCookieManager";
import { CookieManager } from "@/cookies/types/CookieManager";
import { useAuthContext } from "@/hooks/client/useAuthContext";
import { NextFireAuthConfig } from "@/types/NextFireAuthConfig";
import { NextFireAuthContextProviderProps } from "@/types/NextFireAuthContextProviderProps";
import { NextFireAuthContextType } from "@/types/NextFireAuthContextType";

export {
  NextFireAuthContextProvider,
  DefaultCookieManager as BaseCookieManager,
  CookieManager,
  useAuthContext,
  NextFireAuthConfig,
  NextFireAuthContextProviderProps,
  NextFireAuthContextType,
};
