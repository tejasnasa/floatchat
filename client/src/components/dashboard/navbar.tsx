import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import github from "@/assets/github.png";

export default function Navbar() {
  return (
    <header className="border-b border-slate-700/50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl flex justify-between items-center h-[9dvh] relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-blue-500/5"></div>

      <section className="relative z-10 flex items-center ml-6 group">
        <div className="relative mr-3 transform transition-transform duration-300 group-hover:scale-110">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          <Image
            src={logo}
            alt="FloatChat Logo"
            height={40}
            className="relative z-10 drop-shadow-lg"
          />
        </div>
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          FloatChat
        </div>
      </section>

      <section className="relative z-10 flex items-center mr-6 space-x-2">
        <nav className="flex items-center space-x-1">
          {[
            { href: "/", label: "Dashboard", icon: "📊" },
            { href: "/chat", label: "Chat", icon: "💬" },
            { href: "/aboutus", label: "About Us", icon: "👥" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-4 py-2 text-slate-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-700/30 border border-transparent hover:border-slate-600/30"
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {item.icon}
                </span>
                <span className="text-sm font-medium relative">
                  {item.label}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
                </span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="w-px h-6 bg-slate-600/50 mx-2"></div>

        <a
          className="group relative p-2 rounded-lg hover:bg-slate-700/30 border border-transparent hover:border-slate-600/30 transition-all duration-300"
          href="https://github.com/inder-dev-pro/Astra-SIH2025"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Image
              src={github}
              alt="GitHub Repository"
              height={28}
              className="relative z-10 transition-transform duration-300 group-hover:scale-110 filter brightness-90 group-hover:brightness-110"
            />
          </div>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            View Source Code
          </div>
        </a>
      </section>

      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/3 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </header>
  );
}
