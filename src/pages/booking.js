// MyBookingsPage.js
import useSWR from "swr";
import { useSession } from "next-auth/react";

const MyBookingsPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Fetch the user's bookings using SWR or your preferred data fetching library
  const { data: bookings, error } = useSWR(`/api/my-bookings?userId=${userId}`);

  if (error) {
    return <div>Error loading bookings data</div>;
  }

  if (!bookings) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>{/* Display booking details here */}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookingsPage;
