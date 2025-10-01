import HomePageCard from "@/components/homepage/homePageCard";

export default function HomePage() {
  return (
    <main className="relative flex h-full w-full justify-center overflow-y-auto">
      <div className="flex flex-wrap justify-center gap-2">
        <HomePageCard
          Href="/accounts"
          Name="Accounts"
          Desc="customers, suppliers, members"
        />
        <HomePageCard
          Href="/contactus"
          Name="Contact Us"
          Desc="Connect with personal security : not implemented yet"
        />

        <HomePageCard Href="/users" Name="Users" Desc="middleware users" />
        <HomePageCard
          Href="/dbinformation"
          Name="Tables"
          Desc="Developper : Database tables, MariaDB only"
        />
        <HomePageCard
          Href="/tailwindplay"
          Name="Tailwind Playground"
          Desc="Developper : CSS"
        />
      </div>
    </main>
  );
}
