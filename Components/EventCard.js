import Link from "next/link";

export default function EventCard({ title, datetime, location, eventid }) {
  // console.log("Map URL:", mapURL);
  return (
    <div>
      <Link href={`/events/${eventid}`}>
        <h2>{title}</h2>
      </Link>

      <p>{datetime}</p>

      <p>{location}</p>
    </div>
  );
}
