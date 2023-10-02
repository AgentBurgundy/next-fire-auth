import React, {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

import { auth } from "firebase/firebaseClient";
import { BaseCookieManager } from "cookies/cookieManager";
import { CookieManager } from "cookies/types/CookieManager";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type NextFireAuthContextType = {
  user: User | null;
  setLoading: (value: any) => void;
};

type NextFireAuthContextProviderProps = {
  children: any;
  cookieManager?: CookieManager;
  LoadingComponent?: JSX.Element;
  onPathChange?: (
    pathname: string,
    user: User | null,
    router: AppRouterInstance
  ) => void;
};

const NextFireAuthContext = createContext<NextFireAuthContextType>({
  user: null,
  setLoading: (value) => {},
});

/**
 * Easy to use hook for accessing the Next Fire Auth Context
 * @returns {NextFireAuthContextType} user and setLoading
 */
export const useAuthContext = (): NextFireAuthContextType =>
  useContext(NextFireAuthContext);

/**
 * Wrap your app with this provider to get access to the Next Fire Auth Context
 * @param children
 * @param cookieManager - Optional cookie manager for SSR projects, can also be custom if you want to use different logic for cookies
 * @param loadingComponent - Optional loading component to show while the user is being fetched
 * @param onPathChange - Optional function to run when the path changes, useful for redirecting users based on their auth state
 * @returns
 */
export const NextFireAuthContextProvider = ({
  LoadingComponent,
  onPathChange = (pathname, user, router) => {
    if (user) {
      if (pathname?.startsWith("/sign-up") || pathname?.startsWith("/login")) {
        router.push("/app/dashboard");
      }
    }

    if (!user) {
      if (pathname?.startsWith("/app")) {
        router.push("/login");
      } else if (pathname?.startsWith("/logout")) {
        router.push("/login");
      }
    }
  },
  cookieManager = BaseCookieManager,
  children,
}: NextFireAuthContextProviderProps): React.ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!pathname || !initialized || !onPathChange) return;

    setLoading(true);

    onPathChange(pathname, user, router);

    setLoading(false);
  }, [user, pathname, initialized]);

  if (LoadingComponent && loading) return <>{LoadingComponent}</>;

  return (
    <NextFireAuthContext.Provider value={{ user, setLoading }}>
      {children}
    </NextFireAuthContext.Provider>
  );
};
