// import { useRouter } from "next/router";
// import useSWR from "swr";
// import { useSession } from "next-auth/react";
// import Header from "Components/Header";
// import Footer from "Components/Footer";

// export default function UserProfile() {
//   const { data: session } = useSession();
//   console.log(session);
//   // const router = useRouter();
//   // const { id } = router.query;
//   // console.log(id);

//   // const { data: users, error } = useSWR(`/api/users/${id}`);

//   // if (error) return <div>Error loading user data</div>;
//   // if (!users) return <div>Loading...</div>;
//   if (session) {
//     return (
//       <div className="app">
//         <Header />
//         <main>
//           <h1 className="event-add-title" id="user-profile">
//             User Profile: {session.user.name}
//           </h1>
//           <p className="user-profile">Email: {session.user.email}</p>
//           <img
//             className="profile-image"
//             src={session.user.image}
//             alt={session.user.name}
//           />
//           {/* <p>Intersts: {session.user.interests}</p> */}
//         </main>
//         <Footer />
//       </div>
//     );
//   }
// }
