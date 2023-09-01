import Header from "Components/Header";
import Footer from "Components/Footer";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

export default function ViewEvent() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  const { data: events, isLoading, error } = useSWR(`/api/events/${id}`);
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

  const handleBookNow = () => {
    if (!bookedEvents.includes(events.id)) {
      setShowRegistrationForm(true);
    }
  };

  return (
    <div className="app">
      <Header />
      <main>
        <h1>{events.title}</h1>
        <p>{events.datetime}</p>
        <h2>{events.address}</h2>
        <h2>
          <a href={events.mapURL}>Event Map</a>
        </h2>
        <div className="host-details">
          <h4>Hosted by: {events.hosted_by}</h4>
        </div>
        <p>{events.description}</p>

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
            {showRegistrationForm && !registrationSubmitted ? (
              <div className="registration-form">
                <h2>Complete Your Registration</h2>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <button onClick={() => setRegistrationSubmitted(true)}>
                  Submit
                </button>
              </div>
            ) : (
              <button onClick={handleBookNow}>Book Now</button>
            )}
            {registrationSubmitted && (
              <p>
                Thank you for registering! You have successfully booked the
                event.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
