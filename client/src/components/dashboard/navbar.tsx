import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import github from "@/assets/github.png";

export default function Navbar() {
  return (
    <header className="border-b border-slate-800/50 bg-gradient-to-r from-zinc-950 via-slate-950 to-zinc-950 backdrop-blur-xl flex justify-between items-center h-[9dvh] relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent via-cyan-500/5 via-transparent to-violet-500/10 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/50 via-cyan-400/50 via-violet-400/50 to-transparent"></div>

      <section className="relative z-10 flex items-center ml-6 group">
        <div className="relative mr-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          
          {/* Logo container with gradient border */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 p-0.5">
            <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
              <Image
                src={logo}
                alt="FloatChat Logo"
                height={28}
                className="relative z-10 drop-shadow-lg transition-all duration-500"
              />
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            FloatChat
          </div>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-violet-400 group-hover:w-full transition-all duration-700 rounded-full"></div>
        </div>
      </section>

      <section className="relative z-10 flex items-center mr-6 space-x-3">
        <nav className="flex items-center space-x-2">
          {[
            { href: "/", label: "Dashboard", icon: "📊", color: "from-emerald-400 to-teal-400" },
            { href: "/chat", label: "Chat", icon: "💬", color: "from-blue-400 to-indigo-400" },
            { href: "/aboutus", label: "About Us", icon: "👥", color: "from-violet-400 to-purple-400" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-5 py-2.5 text-slate-300 hover:text-white transition-all duration-300 rounded-xl hover:bg-slate-800/40 border border-transparent hover:border-slate-700/50 backdrop-blur-sm overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-all duration-300 rounded-xl`}></div>
              
              <div className="relative z-10 flex items-center space-x-2">
                <span className="text-sm opacity-70 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="text-sm font-medium relative">
                  {item.label}
                  <div className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${item.color} group-hover:w-full transition-all duration-300 rounded-full`}></div>
                </span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-600/50 to-transparent mx-3"></div>

        <a
          className="group relative p-3 rounded-xl hover:bg-slate-800/40 border border-transparent hover:border-slate-700/50 transition-all duration-300 overflow-hidden backdrop-blur-sm"
          href="https://github.com/inder-dev-pro/Astra-SIH2025"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Hover effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-400/10 to-slate-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-slate-400 to-slate-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
          
          <div className="relative z-10">
            <Image
              src={github}
              alt="GitHub Repository"
              height={24}
              className="transition-all duration-300 group-hover:scale-110 filter brightness-75 group-hover:brightness-100 drop-shadow-lg"
            />
          </div>
          
          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900/95 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-slate-700/50 backdrop-blur-sm">
            View Source Code
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900/95"></div>
          </div>
        </a>
      </section>

      {/* Floating particles effect */}
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-400/5 rounded-full blur-2xl animate-pulse"></div>
      <div 
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-violet-400/5 rounded-full blur-xl animate-pulse" 
        style={{ animationDelay: "2s" }}
      ></div>
      <div 
        className="absolute bottom-1/2 left-1/2 w-20 h-20 bg-cyan-400/5 rounded-full blur-2xl animate-pulse" 
        style={{ animationDelay: "1s" }}
      ></div>
    </header>
  );
}