"use client";
import { useSession, SignIn } from "next-auth/react";
const SigninButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return <div>Signed in</div>;
  } else {
    return (
      <div>
        <button onClick={() => SignIn()}>Sign in</button>
      </div>
    );
  }
};

export default SigninButton;
