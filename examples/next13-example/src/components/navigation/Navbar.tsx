"use client";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { useAuthContext } from "next-fire-auth";
import firebase_app from "@/firebase/firebaseClient";

export default function Navbar() {
  const auth = getAuth(firebase_app);

  const { user, setLoading } = useAuthContext();

  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Example Project
            </span>
          </Link>

          <button
            onClick={async () => {
              if (user) {
                await signOut(auth);
              } else {
                // Add sign in here
              }
              setLoading(true);
            }}
            className="text-white bg-gray-400 hover:bg-gray-500 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 transition-all duration-150 ease-in"
          >
            {user ? "Logout" : "Sign In"}
          </button>
        </div>
      </nav>
    </>
  );
}
