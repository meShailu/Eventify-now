import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const { data: session } = useSession();

  return (
    <header className="header">
      <div className="logo">
        <span>Eventify Now</span>
      </div>
      <nav className="navigation">
        <ul>
          {session && (
            <>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>

              <li>
                <Link href="/mybookings">My Bookings</Link>
              </li>
            </>
          )}

          <li>
            {session ? (
              <Link href="#" onClick={() => signOut()}>
                Sign Out
              </Link>
            ) : (
              <Link href="#" onClick={() => signIn()}>
                Sign in
              </Link>
            )}
          </li>
          {session && (
            <li>
              <img
                src={session.user.image}
                alt=""
                style={{ borderRadius: "50px" }}
              />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
