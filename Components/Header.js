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
import { Divider } from "@nextui-org/react";

function Header() {
  const { data: session } = useSession();

  return (
    <>
      <Navbar maxWidth="full" position="static" height="5rem">
        <NavbarContent>
          <NavbarItem>
            <Link href="/" className="logo">
              <span>Eventify Now</span>
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="center">
          {session && (
            <>
              <NavbarItem>
                <Link className="menu-item" color="foreground" href="/">
                  Home
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link className="menu-item" color="foreground" href="/profile">
                  Profile
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  className="menu-item"
                  color="foreground"
                  href="/mybookings"
                >
                  My Bookings
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <NavbarContent justify="end">
          {session && (
            <NavbarItem>
              <Avatar isBordered src={session.user.image} size="lg" />
            </NavbarItem>
          )}
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
        </NavbarContent>
      </Navbar>

      <Divider />
    </>
  );
}

export default Header;
