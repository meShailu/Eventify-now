import Header from "Components/Header";
import EventCard from "Components/EventCard";
import Footer from "Components/Footer";
import useSWR from "swr";
import { useState, useEffect } from "react";
import Form from "Components/Form";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data } = useSWR("/api/events");
  console.log(data);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const { data: session } = useSession(); // Get user session data
  const [showSignInMessage, setShowSignInMessage] = useState(false);

  const handleAddEventClick = () => {
    if (!session) {
      // User is not signed in, show the sign-in message
      setShowSignInMessage(true);
    } else {
      // User is signed in, navigate to the event creation page
      window.location.href = "/create";
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const uniqueTypes = Array.from(new Set(data.map((event) => event.type)));
  const uniqueCities = Array.from(new Set(data.map((event) => event.city)));
  const uniqueCountries = Array.from(
    new Set(data.map((event) => event.country))
  );

  const filterEvents = (events) => {
    return events.filter((event) => {
      const typeMatch = selectedType === "all" || event.type === selectedType;
      const cityMatch = selectedCity === "all" || event.city === selectedCity;
      const countryMatch =
        selectedCountry === "all" || event.country === selectedCountry;

      return typeMatch && cityMatch && countryMatch;
    });
  };

  const resetFilters = () => {
    setSelectedType("all");
    setSelectedCity("all");
    setSelectedCountry("all");
  };

  return (
    <div className="app">
      <Header />
      <main className="event-list">
        <div className="filter-dropdown">
          <label htmlFor="typeFilter">Filter by Type:</label>
          <select
            id="typeFilter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-dropdown">
          <label htmlFor="cityFilter">Filter by City:</label>
          <select
            id="cityFilter"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="all">All</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-dropdown">
          <label htmlFor="countryFilter">Filter by Country:</label>
          <select
            id="countryFilter"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="all">All</option>
            {uniqueCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <button onClick={resetFilters}>Reset Filters</button>
        </div>
        {filterEvents(data).map((event) => (
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
      <button className="btn dasboard-add-btn" onClick={handleAddEventClick}>
        + event
      </button>
      {showSignInMessage && (
        <div className="modal">
          <div className="modal-content">
            <p>Please sign in to add an event.</p>
            <button onClick={() => setShowSignInMessage(false)}>Close</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
