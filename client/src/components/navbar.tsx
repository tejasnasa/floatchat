import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b-[1px] border-gray-600 flex justify-between items-center">
      <section className="flex items-center m-2 mx-4">
        <Image src={logo} alt="" height={40} className="m-2" />
        <div className="text-xl mx-1">FloatChat</div>
      </section>
      <section className="flex items-center m-2 mr-8">
        <Link href={"/"} className="m-2 mx-4 text-lg">
          Dashboard
        </Link>
        <Link href={"/chat"} className="m-2 mx-4 text-lg">
          Chat
        </Link>
      </section>
    </header>
  );
}
