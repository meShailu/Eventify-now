import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session } = useSession();
  console.log(session);
  // const router = useRouter();
  // const { id } = router.query;
  // console.log(id);

  // const { data: users, error } = useSWR(`/api/users/${id}`);

  // if (error) return <div>Error loading user data</div>;
  // if (!users) return <div>Loading...</div>;
  if (session) {
    return (
      <div>
        <h1>User Profile: {session.user.name}</h1>
        <p>Email: {session.user.email}</p>
        <img src={session.user.image} alt={session.user.name} />
        <p>Intersts: {session.user.interests}</p>

        {/* Add more user details as needed */}
      </div>
    );
  }
  return <h1>Please login</h1>;
}
