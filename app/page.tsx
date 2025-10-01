import HomePageCard from "@/components/homepage/homePageCard";

export default function HomePage() {
  return (
    <main className="relative flex h-full w-full justify-center overflow-y-auto">
      <div className="flex flex-wrap justify-center gap-2">
        <HomePageCard
          Href="/accounts"
          Name="Accounts"
          Desc="customers, members, partners"
        />
        <HomePageCard Href="/contactus" Name="Contact Us" Desc="" />

        <HomePageCard Href="/users" Name="Users" Desc="" />
        <HomePageCard
          Href="/dbinformation"
          Name="Developper : Tables"
          Desc=""
        />
        <HomePageCard
          Href="/tailwindplay"
          Name="Tailwind Playground"
          Desc="css deneme sayfası"
        />
      </div>
    </main>
  );
}
