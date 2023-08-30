import Header from "Components/Header";
import EventCard from "Components/EventCard";
import Footer from "Components/Footer";
import useSWR from "swr";
import { useState } from "react";

export default function HomePage() {
  const { data } = useSWR("/api/events");
  const [selectedFilter, setSelectedFilter] = useState("all");
  // console.log(data);
  if (!data) {
    return <div>Loading...</div>;
  }

  const filterEvents = (events) => {
    if (selectedFilter === "all") {
      return events;
    }

    return events.filter((event) => {
      return event.type === selectedFilter;
    });
  };
  // console.log(data);
  return (
    <div className="app">
      <Header />
      <main className="event-list">
        <div className="filter-dropdown">
          <label htmlFor="filter">Filter by:Type</label>
          <select
            id="filter"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All</option>

            {data.map((event) => (
              <option key={event._id} value={event.type}>
                {event.type}
              </option>
            ))}
          </select>
        </div>
        {filterEvents(data).map((event) => (
          <EventCard
            eventid={event._id}
            key={event._id}
            title={event.title}
            starts_at={event.start_at}
            address={event.address}
            tags={event.tags}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
