import Data from "@/components/data";
import Filters from "@/components/filters";
import Map from "@/components/map";

export default function Home() {
  return (
    <main className="flex h-[90dvh] flex-col">
      <section className="h-[70%] flex">
        <Filters />
        <Map />
      </section>
      <Data />
    </main>
  );
}
