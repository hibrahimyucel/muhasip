"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
//import "../styles/Navbar.css";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
  { name: "Settings", href: "/settings" },
];

function NavbarX() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const hamburgerRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main>
      <nav>
        <ul className="flex flex-col h-full gap-4 p-4">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-red-500"
            >
              <Link
                onClick={() => {
                  toggleMenu();
                }}
                href={item.href}
                className="flex items-center"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="navbar-hamburger"
          onClick={toggleMenu}
          ref={hamburgerRef}
        ></div>
      </nav>
    </main>
  );
}

export default NavbarX;
