import { useServerUser } from "next-fire-auth/server";

export default function TestServerComponent() {
  const { uid } = useServerUser();

  if (!uid || !uid.value) {
    return <span>No UID</span>;
  }

  return <div>Hello {uid.value}</div>;
}
