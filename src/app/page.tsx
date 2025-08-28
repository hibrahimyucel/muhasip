import PagePlaceholder from "@/components/page-placeholder";
import Link from "next/link";

export default function Home() {
  function NavLinks() {
    const navItems = [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "News", href: "/news" },
      { name: "Contact", href: "/contact" },
      { name: "Settings", href: "/settings" },
      { name: "Profile", href: "/profile" },
    ];
    return navItems.map((item, index) => (
      <li
        key={index}
        className="text-xl hover:text-blue-900 hover:font-semibold"
      >
        <Link href={item.href} className="flex items-center">
          {item.name}
        </Link>
      </li>
    ));
  }
  return (
    <main>
      <ul className="justify-center gap-2 flex">
        <NavLinks />
      </ul>
    </main>
  );
}
