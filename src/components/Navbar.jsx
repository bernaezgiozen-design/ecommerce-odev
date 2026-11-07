"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, User, Coffee } from "lucide-react";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/menu?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-amber-950 transition hover:text-amber-700"
        >
          <Coffee className="h-6 w-6 text-amber-600" />
          <span>CAFE</span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="relative flex flex-1 max-w-xs sm:max-w-md items-center"
        >
          <input
            type="text"
            placeholder="Kahve, tatlı veya içecek ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-amber-200 bg-amber-50/50 py-2 pl-4 pr-10 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
          />
          <button
            type="submit"
            aria-label="Ara"
            className="absolute right-3 text-neutral-400 hover:text-amber-700 transition"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="hidden sm:inline-block rounded-lg px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:text-amber-700"
          >
            Anasayfa
          </Link>

          <Link
            href="/menu"
            className="hidden sm:inline-block rounded-lg px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:text-amber-700"
          >
            Menü
          </Link>

          <Link
            href="/sepet"
            className="relative flex items-center gap-2 rounded-full bg-amber-50 px-3.5 py-2 text-sm font-semibold text-amber-950 transition hover:bg-amber-100"
          >
            <ShoppingBag className="h-4 w-4 text-amber-800" />
            <span className="hidden md:inline">Sepetim</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
              {cartCount}
            </span>
          </Link>

          <Link
            href="/giris"
            className="flex items-center gap-2 rounded-full bg-amber-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-900 active:scale-95"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Giriş / Kayıt Ol</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
