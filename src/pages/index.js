import Header from "Components/Header";
import EventCard from "Components/EventCard";
import Footer from "Components/Footer";
import useSWR from "swr";
import Link from "next/link";

export default function HomePage() {
  const { data } = useSWR("/api/events");
  // console.log(data);
  if (!data) {
    return <div>Loading...</div>;
  }
  // console.log(data);
  return (
    <div className="app">
      <Header />
      <main className="event-list">
        {data.map((event) => (
          <Link key={event._id} href={`/events/${event._id}`}>
            <EventCard
              key={event._id}
              title={event.title}
              datetime={event.datetime}
              location={event.location}
              mapURL={event.mapURL}
              description={event.description}
            />
          </Link>
        ))}
      </main>
      <Footer />
    </div>
  );
}
