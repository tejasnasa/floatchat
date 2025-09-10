import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import github from "@/assets/github.png";

export default function Navbar() {
  return (
    <header className="border-b-[1px] border-gray-600 flex justify-between items-center h-[9dvh]">
      <section className="flex items-center m-2 ml-6">
        <Image src={logo} alt="" height={40} className="m-2" />
        <div className="text-xl mx-1">FloatChat</div>
      </section>
      <section className="flex items-center m-2 mr-6">
        <Link href={"/"} className="m-2 mx-4 text-lg">
          Dashboard
        </Link>
        <Link href={"/chat"} className="m-2 mx-4 text-lg">
          Chat
        </Link>
        <Link href={"/aboutus"} className="m-2 mx-4 text-lg">
          About Us
        </Link>
        <a
          className="m-2"
          href="https://github.com/inder-dev-pro/Astra-SIH2025"
          target="_blank"
        >
          <Image src={github} alt="" height={35}></Image>
        </a>
      </section>
    </header>
  );
}
