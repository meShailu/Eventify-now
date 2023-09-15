import Header from "Components/Header";
import EventCard from "Components/EventCard";
import Footer from "Components/Footer";
import useSWR from "swr";
import { useState, useEffect } from "react";
import Form from "Components/Form";
import { useSession } from "next-auth/react";
import { UploadIcon } from "Components/AddIcon";
import {
  Dropdown,
  Link,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function HomePage() {
  const { data } = useSWR("/api/events");
  console.log(data);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const { data: session } = useSession(); // Get user session data
  const [showSignInMessage, setShowSignInMessage] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleAddEventClick = () => {
    if (!session) {
      // User is not signed in, show the sign-in message
      onOpen(); // Open the modal
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

  function handleDropdown(key) {
    console.log(key);
    setSelectedType(key);
  }

  function handleCityDropdown(key) {
    console.log(key);
    setSelectedCity(key);
  }

  function handleCountryDropdown(key) {
    console.log(key);
    setSelectedCountry(key);
  }

  return (
    <div className="app">
      <Header />
      {/* <main>
        <div className="flex gap-4 items-center	py-2 mb-2 margin-bottom"> */}
      {/* <div className="filter-dropdown">
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
        </div> */}
      <div className="flex m-4 p-4 gap-4">
        <Dropdown backdrop="blur" className="w-3">
          <DropdownTrigger>
            <Button variant="bordered">Filter by Type:</Button>
          </DropdownTrigger>
          <DropdownMenu
            onAction={(key) => handleDropdown(key)}
            variant="faded"
            aria-label="Static Actions"
          >
            <DropdownItem key="all">All</DropdownItem>
            {uniqueTypes.map((type) => (
              <DropdownItem key={type} value={type}>
                {type}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown backdrop="blur" className="w-3">
          <DropdownTrigger>
            <Button variant="bordered">Filter by City:</Button>
          </DropdownTrigger>
          <DropdownMenu
            onAction={(key) => handleCityDropdown(key)} // Use handleCityDropdown for city filtering
            variant="faded"
            aria-label="Static Actions"
          >
            <DropdownItem key="all">All</DropdownItem>
            {uniqueCities.map((city) => (
              <DropdownItem key={city} value={city}>
                {city}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown backdrop="blur" className="w-3">
          <DropdownTrigger>
            <Button variant="bordered">Filter by Country</Button>
          </DropdownTrigger>
          <DropdownMenu
            onAction={(key) => handleCountryDropdown(key)} // Use handleCityDropdown for city filtering
            variant="faded"
            aria-label="Static Actions"
          >
            <DropdownItem key="all">All</DropdownItem>
            {uniqueCountries.map((country) => (
              <DropdownItem key={country} value={country}>
                {country}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button onClick={resetFilters} color="primary">
          Reset Filters
        </Button>
        <Button
          onPress={handleAddEventClick}
          color="primary"
          startContent={<UploadIcon />}
        >
          Event
        </Button>
      </div>
      <br />
      <div className="event-list">
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
      </div>
      {/* '      </main> */}'{" "}
      {/* <button className="btn dasboard-add-btn" onClick={handleAddEventClick}>
        + event
      </button> */}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="2xl"
        classNames={{
          body: "py-6",
          backdrop: "bg-black backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          <ModalBody>
            <p>Please sign in to add an event.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="foreground" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {showSignInMessage && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setShowSignInMessage(false)}>Close</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
