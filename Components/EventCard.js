export default function EventCard({
  title,
  date,
  location,
  time,
  mapURL,
  description,
}) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description.substr(0, 70)}...</p>
      <p>{date}</p>
      <p>{time}</p>
      <p>{location}</p>
    </div>
  );
}
