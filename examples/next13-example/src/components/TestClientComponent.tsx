"use client";
import { useAuthContext } from "next-fire-auth";

export default function TestClientComponent() {
  const { user } = useAuthContext();

  if (!user) {
    return <span>No user</span>;
  }

  return <div>Hello {user.uid}</div>;
}
