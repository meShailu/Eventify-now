import Header from "Components/Header";
import Footer from "Components/Footer";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function ViewEvent() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [bookingMessage, setBookingMessage] = useState("");

  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log("mysession", session);

  const { data: events, isLoading, error } = useSWR(`/api/events/${id}`);
  const { data: bookings, bookingError } = useSWR(
    `/api/mybookings?userId=${userId}`
  );

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment) {
      const newComment = { text: comment, liked: false };
      setCommentsList([newComment, ...commentsList]);

      setComment("");
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = [...commentsList];
    updatedComments.splice(index, 1);
    setCommentsList(updatedComments);
  };

  const handleHeartClick = (index) => {
    const updatedComments = [...commentsList];
    updatedComments[index].liked = !updatedComments[index].liked;
    setCommentsList(updatedComments);
  };

  function handleBookNowButtonStatus() {
    // const matchingBooking = bookings?.find((booking) => booking.eventId === id);
    const matchingBooking = Array.isArray(bookings)
      ? bookings.find((booking) => booking.eventId === id)
      : null;

    return matchingBooking ? matchingBooking?.bookingStatus : "Not booked";
  }

  const handleBookNow = async () => {
    if (!bookedEvents.includes(events.id)) {
      if (!session) {
        const confirmed = window.confirm(
          "You need to be signed in to book this event😟Would you like to sign in now?"
        );
        if (!confirmed) {
          console.log("sssssssssssssss");

          return;
        } else {
          console.log("eeeeeeeeeeeee");
          signIn();
        }
      } else {
        try {
          console.log("eventid", id);
          const response = await fetch(`/api/mybookings/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ eventId: id, userId: userId }),
          });

          if (response.ok) {
            toast.success("Event booked successfully"),
              setTimeout(() => {
                router.push(`/mybookings`);
              }, 2000);
          } else {
            console.error("Booking failed");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    }
  };

  function getDate(datetime) {
    const date = new Date(datetime);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
    const day = date.getDate();

    return `${day}-${month}-${year}`;
  }

  function getTime(datetime) {
    const time = new Date(datetime);

    // Get Time components
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes}`;
  }

  async function deleteEvent() {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <div className="app">
      <Header />
      <main>
        <section className="event">
          <h1 className="event-title">{events.title}</h1>
          <p className="event-location">
            [{events.city}, {events.country}]
          </p>
          <div className="event-image-container">
            <Image isBlurred isZoomed alt={events.title} src={events.image} />
          </div>
          <p className="event-datetime">
            Starts at: {getDate(events.start_at)} & Time -
            {getTime(events.start_at)}
          </p>
          <p className="event-datetime">
            Ends at: {getDate(events.ends_at)} & Time -{" "}
            {getTime(events.ends_at)}
          </p>
          <p className="event-description">{events.description}</p>
          <p className="event-address">
            {events.address} [<a href={events.mapURL}>Event Map</a>]
          </p>

          <p>
            <span className=" my-4 event-hostedby">Hosted by: </span>
            {events.hosted_by}
          </p>
          <br />
          <div className="flex gap-3 ">
            {handleBookNowButtonStatus() === "confirmed" ? (
              <Button isDisabled color="success">
                Booked
              </Button>
            ) : (
              // <button onClick={handleBookNow} className="btn">
              //   Book Now
              // </button>
              <Button onClick={handleBookNow} color="primary">
                Book Now
              </Button>
            )}

            {bookingMessage && <p>{bookingMessage}</p>}
            {session?.user.email === "shailushekhawat92@gmail.com" && (
              <>
                <Button color="warning">
                  <Link href={`/events/${id}/edit`} passHref>
                    Edit Event
                  </Link>
                </Button>
                <Button
                  onClick={deleteEvent}
                  color="danger"
                  // Add this line
                >
                  Delete
                </Button>

                <ToastContainer
                  position="top-right"
                  autoClose={4000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  toastStyle={{
                    background: "black", // Set the background color of the toast to black
                    color: "white", // Set the text color of the toast to white
                  }} // Center both horizontally and vertically
                />
              </>
            )}
          </div>
        </section>

        {/* <section className="event-comment">
          <div className="comments-list">
            {commentsList.map((comment, index) => (
              <div key={index} className="comment">
                {comment.text}
                <button onClick={() => handleHeartClick(index)}>
                  {comment.liked ? "❤️" : "🤍"}
                </button>

                <button onClick={() => handleDeleteComment(index)}>🗑️</button>
              </div>
            ))}

            <div className="comment-section">
              <h2>Leave a Comment</h2>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                rows={4}
                placeholder="Write your comment here..."
              />
              <button onClick={handleCommentSubmit}>Send</button>
            </div> */}
        {/* </div>
        </section> */}
      </main>
      <Footer />
    </div>
  );
}
