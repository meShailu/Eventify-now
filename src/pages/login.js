import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  const { data: session } = useSession();
  // console.log(session);
  if (session) {
    return (
      <div>
        <p>Welcome,{session.user.email}</p>
        <Image
          src={session.user.image}
          alt=""
          style={{ borderRadius: "50px" }}
        />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not signed in.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
};

export default Login;
