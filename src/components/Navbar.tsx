"use client";
import Link from "next/link";
import { useState } from "react";
// hamburger icon
import { FiList } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  function NavLinks() {
    const navItems = [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "News", href: "/news" },
      { name: "Contact", href: "/contact" },
      { name: "Settings", href: "/settings" },
    ];
    return navItems.map((item, index) => (
      <li
        key={index}
        className="text-xl hover:text-blue-900 hover:font-semibold"
      >
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href={item.href}
          className="flex items-center"
        >
          {item.name}
        </Link>
      </li>
    ));
  }
  function MobileMenuButton() {
    return (
      <button
        className="absolute right-2 top-2 p-2"
        type="button"
        onClick={handleDrawerToggle}
      >
        <FiList className="text-5xl" />
      </button>
    );
  }
  function MobileDrawer() {
    return (
      <div
        className={`fixed flex flex-col items-end z-10 right-2 top-2 h-full w-full 
          transition-transform duration-300 
          transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <ul className="flex flex-col justify-center items-end space-y-2">
          <li className="text-3xl hover:text-blue-900 hover:font-semibold">
            <button
              className=" right-2 top-2 p-2"
              type="button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <FiList className="text-5xl" />
            </button>
          </li>
          <NavLinks />
        </ul>
      </div>
    );
  }
  function LogoLink() {
    return (
      <div className="mb-4 text-left sm:mb-0">
        <Link href="/">
          Main
          {/* Your logo component */}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="hidden relative py-6 sm:flex flex-col justify-center">
        <LogoLink />
        <ul className="absolute right-0 flex flex-row space-x-6">
          {" "}
          <NavLinks />
        </ul>
      </div>
      <div className="sm:hidden relative flex flex-row py-6 bg-blend-difference">
        <LogoLink />
        <MobileMenuButton />
        <MobileDrawer />
      </div>
    </>
  );
}
