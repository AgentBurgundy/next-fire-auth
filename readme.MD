# 🔥 next-fire-auth 🔥

🔥 next-fire-auth is a simple package that handles Firebase auth for Next.js SSR and CSR components

- 🧩 **Auth Libraries are Complex** - I often find myself writing my own Firebase auth because other libraries just have way too much ramp up code to get things started. When all you really need is a React context and a couple hooks.
- ⏲️ **Save Time** - Writing auth code for Firebase is repetitive, save time by just importing this package

- ⚙️ **Configurable** - I know not everyone likes to write auth the same way, so I've tried my best (and will continue improving) the flexibility of this package so we can accommodate more solutions.

## Installation

To install next-fire-auth, run the following command:

```sh
npm install next-fire-auth
```

## How to Use

First, import `NextFireAuthContextProvider` and wrap your layout.tsx with it. (This should be the topmost layout.tsx)

```jsx
import { NextFireAuthContextProvider } from "next-fire-auth";

function MyApp({ Component, pageProps }) {
  return (
    <NextFireAuthContextProvider>
      <Component {...pageProps} />
    </NextFireAuthContextProvider>
  );
}
```

Or if you're using the old Pages Router, wrap around your app.

```jsx
import { NextFireAuthContextProvider } from "next-fire-auth";

function MyApp({ Component, pageProps }) {
  return (
    <NextFireAuthContextProvider>
      <Component {...pageProps} />
    </NextFireAuthContextProvider>
  );
}
```

NOTE if not using a config (like below), you must have these firebase variables in your .env

```sh
# For Client
NEXT_PUBLIC_FIREBASE_API_KEY="A..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="su..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="su..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="su..."
NEXT_PUBLIC_FIREBASE_MESSENGER_ID="9..."
NEXT_PUBLIC_FIREBASE_APP_ID="1:..."
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-..."

# For Server (FirebaseAdmin)
FIREBASE_CLIENT_EMAIL="firebase-..."
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----"
```

#### Configuration

You can customize the context provider by passing a configuration object. The options include an optional loading component, a custom cookie manager for server-side rendering, an optional function to run when the path changes, etc.

```jsx
import { NextFireAuthContextProvider } from "next-fire-auth";
import Loading from "./components/Loading";

function MyApp({ Component, pageProps }) {
  return (
    <NextFireAuthContextProvider
      config={{
        loadingComponent: <Loading />,
        cookieManager: myCustomCookieManager,
        onPathChange: myCustomPathChangeFunction,
      }}
    >
      <Component {...pageProps} />
    </NextFireAuthContextProvider>
  );
}
```

or pass in your own firebaseApp you rolled yourself

```jsx
import { NextFireAuthContextProvider } from "next-fire-auth";
import Loading from "./components/Loading";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let firebase_app: FirebaseApp;
firebase_app = initializeApp(clientCredentials);

function MyApp({ Component, pageProps }) {
  return (
    <NextFireAuthContextProvider
      config={{
        firebaseApp: firebase_app,
        loadingComponent: <Loading />,
        cookieManager: myCustomCookieManager,
        onPathChange: myCustomPathChangeFunction,
      }}
    >
      <Component {...pageProps} />
    </NextFireAuthContextProvider>
  );
}
```

#### Access user data

Then you can access the user data on client side using `useAuthContext` hook.

```jsx
import { useAuthContext } from "next-fire-auth";

function Profile() {
  const { user } = useAuthContext(); // User is of type Firebase.User

  return (
    <div>
      <h1>Hello, {user.displayName}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

Or, you can access the user data in server side using `useServerUser` hook.

```jsx
import useServerUser from "next-fire-auth/server";

export async function getServerSideProps(context) {
  const { uid } = useServerUser();
  // do something with uid
}
```

## Contributing

This is an open-source project, and contributions are welcome. Feel free to open an issue or submit a PR.
