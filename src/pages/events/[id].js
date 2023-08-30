import Header from "Components/Header";
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
      <main>
        <h1>{events.title}</h1>
        <p>{events.datetime}</p>
        <h2>{events.location}</h2>
        <h2>
          <a href={events.mapURL}>Event Map</a>
        </h2>
        <p>{events.description}</p>
      </main>
      <Footer />
    </div>
  );
}
