import Data from "@/components/dashboard/data";
import Filters from "@/components/dashboard/filters";
import Map from "@/components/dashboard/map";

export default function Home() {
  return (
    <main className="flex h-[91dvh] flex-col">
      <section className="h-[70%] flex">
        <Filters />
        <Map />
      </section>
      <Data />
    </main>
  );
}
