import type { User } from "../types/user.ts";

export default function UserPage({ user }: { user: User }) {
  return (
    <div>
      <h1>User Page</h1>
      <p>{user.id}</p>
    </div>
  );
}
