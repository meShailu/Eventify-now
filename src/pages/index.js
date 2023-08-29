import Header from "../../Components/Header";
import EventCard from "../../Components/EventCard";
import Footer from "../../Components/Footer";
import useSWR from "swr";

export default function HomePage() {
  const { data } = useSWR("/api/events");
  console.log(data);
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="app">
      <Header />
      <main className="event-list">
        {data.map((event) => (
          <EventCard
            key={event.id}
            title={event.Title}
            date={event.Date}
            location={event.Location}
            time={event.Time}
            mapURL={event.mapURL}
            description={event.Description}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
