import Header from "Components/Header";
import Link from "next/link";
import EventCard from "Components/EventCard";
import Footer from "Components/Footer";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ViewEvent() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: events, isLoading, error } = useSWR(`/api/events/${id}`);
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <div className="app">
      <Header />
      <main className="event-list">
        <Link key={events.id} href={`/events/${events.id}`}>
          <EventCard
            title={events.title}
            datetime={events.datetime}
            location={events.location}
            mapURL={events.smapURL}
            description={events.description}
          />
        </Link>
      </main>
      <Footer />
    </div>
  );
}
