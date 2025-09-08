import Data from "@/components/data";
import Filters from "@/components/filters";
import Map from "@/components/map";

export default function Home() {
  return (
    <main className="flex h-[90dvh]">
      <Filters />
      <section className="w-4/5">
        <Map />
        <Data />
      </section>
    </main>
  );
}
