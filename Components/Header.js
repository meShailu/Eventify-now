import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar } from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";

function Header() {
  const { data: session } = useSession();

  return (
    <Navbar position="static">
      <NavbarContent>
        <NavbarItem>
          <div className="logo">
            <span>Eventify Now</span>
          </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/profile">
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/mybookings">
            My Bookings
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {session ? (
            <Button color="primary" variant="flat" onClick={() => signOut()}>
              Sign Out
            </Button>
          ) : (
            <Button color="primary" variant="flat" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
        </NavbarItem>
        {session && (
          <NavbarItem>
            <Avatar isBordered src={session.user.image} size="lg" />
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
