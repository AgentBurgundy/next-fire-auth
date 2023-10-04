import { cookies } from "next/headers";

export default function useServerUser() {
  const cookieStore = cookies();
  const uid = cookieStore.get("uid");

  return {
    uid,
  };
}
