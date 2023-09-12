import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react"; // Import useEffect
import Header from "Components/Header";
import Footer from "Components/Footer";
import EventCard from "Components/EventCard";

const MyBookingsPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log("USEERRRRR ID ", userId);
  const { data: events } = useSWR("/api/events");
  console.log("all events", events);

  // Fetch the user's bookings using SWR or your preferred data fetching library
  const { data: bookings, error } = useSWR(`/api/mybookings?userId=${userId}`);
  // const [bookedEvents, setBookedEvents] = useState([]);
  console.log("bookings", bookings);
  // useEffect(() => {
  //   if (bookings) {
  //     const events = bookings.filter((booking) => booking.userId === userId);

  //     setBookedEvents(events);
  //   }
  // }, [bookings]);

  if (error) {
    return <div>Error loading bookings data</div>;
  }

  if (!bookings) {
    return <div>Loading...</div>;
  }

  const filterEvents = (eventsData, bookingData) => {
    if (!eventsData || !bookingData) return [];

    // Get an array of event IDs from bookings
    const bookingEventIds = bookingData.map((booking) => booking.eventId);

    // Filter events that have matching IDs in bookingEventIds
    const filteredEvents = eventsData.filter((event) =>
      bookingEventIds.includes(event._id)
    );

    return filteredEvents;
  };
  const filteredEvents = filterEvents(events, bookings);
  console.log(filteredEvents);

  return (
    // <div>
    //   <h1>My Bookings</h1>
    //   <ul>
    //     {bookings.map((booking) => (
    //       <li key={booking._id}>
    //         <h2>Booking ID: {booking._id}</h2>
    //         <p>Event ID: {booking.eventId}</p>
    //         <p>Booking Status: {booking.bookingStatus}</p>
    //         <p>Payment Info: {booking.paymentInfo}</p>
    //         <p>Notes: {booking.notes}</p>
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    <div className="app">
      <Header />
      <main className="event-list">
        {filteredEvents.map((event) => (
          <EventCard
            eventid={event._id}
            key={event._id}
            title={event.title}
            starts_at={event.start_at}
            address={event.address}
            tags={event.tags}
            image={event.image}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default MyBookingsPage;
