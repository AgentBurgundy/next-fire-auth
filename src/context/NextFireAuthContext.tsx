import React from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { NextFireAuthContextType } from "@/types/NextFireAuthContextType";
import { NextFireAuthConfig } from "@/types/NextFireAuthConfig";
import { DefaultCookieManager } from "@/cookies/DefaultCookieManager";
import { NextFireAuthContextProviderProps } from "@/types/NextFireAuthContextProviderProps";
import { FirebaseApp } from "firebase/app";
import firebase_app from "@/firebase/firebaseClient";

export const NextFireAuthContext = React.createContext<NextFireAuthContextType>(
  {
    user: null,
    setLoading: (value) => {},
  }
);

/**
 * Wrap your app with this provider to get access to the Next Fire Auth Context
 * @param children
 * @param cookieManager - Optional cookie manager for SSR projects, can also be custom if you want to use different logic for cookies
 * @param loadingComponent - Optional loading component to show while the user is being fetched
 * @param onPathChange - Optional function to run when the path changes, useful for redirecting users based on their auth state
 * @returns
 */
export const NextFireAuthContextProvider = ({
  config,
  children,
}: NextFireAuthContextProviderProps): React.ReactElement => {
  let currentFirebaseApp: FirebaseApp;

  if (!config?.firebaseApp) {
    currentFirebaseApp = firebase_app;
  } else {
    currentFirebaseApp = config.firebaseApp;
  }

  const auth = getAuth(currentFirebaseApp);

  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [initialized, setInitialized] = React.useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const defaultConfig: NextFireAuthConfig = {
    onPathChange: (pathname, user, router) => {},
    cookieManager: DefaultCookieManager,
    loadingComponent: null,
    firebaseApp: currentFirebaseApp,
  };

  let currentConfig = defaultConfig;
  if (config) {
    currentConfig = { ...defaultConfig, ...config };
  }
  const { onPathChange, loadingComponent, cookieManager } = currentConfig;

  if (!currentConfig.firebaseApp && !firebase_app) {
    throw new Error(
      "No firebase app provided. Please provide a firebase app in the config or initialize firebase in your app"
    );
  }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setLoading(true);

      if (user) {
        setUser(user);

        // Making the cookie stuff optional for non-SSR projects
        if (cookieManager) {
          cookieManager.addAuthCookie(user.uid);
        }
      } else {
        setUser(null);

        // Making the cookie stuff optional for non-SSR projects
        if (cookieManager) {
          cookieManager.removeAuthCookie();
        }
      }

      setInitialized(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (!pathname || !initialized || !onPathChange) return;

    setLoading(true);

    onPathChange(pathname, user, router);

    setLoading(false);
  }, [user, pathname, initialized]);

  if (loadingComponent && loading) return <>{loadingComponent}</>;

  return (
    <NextFireAuthContext.Provider value={{ user, setLoading }}>
      {children}
    </NextFireAuthContext.Provider>
  );
};
