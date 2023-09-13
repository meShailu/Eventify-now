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
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // Add zero-padding
  const day = dateTime.getDate().toString().padStart(2, "0"); // Add zero-padding

  // Get Time components
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes().toString().padStart(2, "0"); // Add zero-padding

  // console.log("Map URL:", mapURL);
  return (
    <div className="event-card">
      <Link href={`/events/${eventid}`}>
        {<img className="event-img" src={image} alt={title} />}
        {/* Display the image if 'imageUrl' exists */}
        <h2>{title}</h2>
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
      </Link>
    </div>
  );
}
