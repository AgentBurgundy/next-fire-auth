import { CookieManager } from "@/cookies/types/CookieManager";
import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type NextFireAuthConfig = {
  firebaseApp: FirebaseApp | null;
  cookieManager?: CookieManager;
  onPathChange?: (
    pathname: string,
    user: User | null,
    router: AppRouterInstance
  ) => void;
  loadingComponent?: JSX.Element | null;
};
