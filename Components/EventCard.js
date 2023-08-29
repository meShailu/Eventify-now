export default function EventCard({
  title,
  datetime,
  location,
  mapURL,
  description,
}) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{datetime}</p>
      <p>{mapURL}</p>
      <p>{location}</p>
    </div>
  );
}
