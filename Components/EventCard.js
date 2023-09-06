import Link from "next/link";

export default function EventCard({
  title,
  starts_at,
  address,
  eventid,
  tags,
  image,
}) {
  const dateTime = new Date(starts_at);
  // Get Date components
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Months are 0-indexed, so add 1
  const day = dateTime.getDate();

  // Get Time components
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  // console.log("Map URL:", mapURL);
  return (
    <div className="event-card">
      {<img className="event-img" src={image} alt={title} />}
      {/* Display the image if 'imageUrl' exists */}
      <Link href={`/events/${eventid}`}>
        <h2>{title}</h2>
      </Link>
      <div className="datetime">
        <p>{`Date: ${year}-${month}-${day}`}</p>
        <p>{`Time: ${hours}:${minutes}`}</p>
      </div>
      <p className="address">{address}</p>
      <ul className="tags">
        {tags.map((tag) => (
          <li>{tag}</li>
        ))}
      </ul>
    </div>
  );
}
