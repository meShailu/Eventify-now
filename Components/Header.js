import Link from "next/link";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        {/* <img src="/logo.png" alt="Eventify Now Logo" /> */}
        <span>Eventify Now</span>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/My Bookings">My Bookings</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
