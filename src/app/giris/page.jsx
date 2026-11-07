"use client";

import { useState } from "react";
import Slider from "@/components/Slider";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // Form State'leri
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Giriş Yapılıyor:", {
        email: formData.email,
        password: formData.password,
      });
      // Burada backend API çağrısı (fetch/axios) yapılır
    } else {
      console.log("Kayıt Olunuyor:", formData);
      // Burada kayıt API çağrısı yapılır
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-amber-50/40 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-amber-100">
        {/* Başlık ve Karşılama */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-amber-950">
            {isLogin ? "Tekrar Hoş Geldin" : "Aramıza Katıl"}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            {isLogin
              ? "Kahve siparişine devam etmek için giriş yap."
              : "Avantajlı kahve dünyasına katılmak için hesabını oluştur."}
          </p>
        </div>

        {/* Sekmeler (Tabs): Giriş / Kayıt */}
        <div className="flex rounded-xl bg-amber-50 p-1 mb-6 border border-amber-100">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
              isLogin
                ? "bg-white text-amber-950 shadow-sm"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
              !isLogin
                ? "bg-white text-amber-950 shadow-sm"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Kayıt Ol
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Ad Soyad
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Örn: Ahmet Yılmaz"
                className="w-full rounded-xl border border-amber-200 bg-amber-50/20 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          )}

          {/* E-posta */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
              E-posta Adresi
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@mail.com"
              className="w-full rounded-xl border border-amber-200 bg-amber-50/20 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Şifre */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Şifre
              </label>
              {isLogin && (
                <a
                  href="#"
                  className="text-xs font-medium text-amber-700 hover:underline"
                >
                  Şifremi Unuttum?
                </a>
              )}
            </div>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-amber-200 bg-amber-50/20 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Gönder Butonu */}
          <button
            type="submit"
            className="w-full mt-2 rounded-xl bg-amber-950 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-amber-900 active:scale-[0.99]"
          >
            {isLogin ? "Giriş Yap" : "Hesap Oluştur"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-neutral-500">
          Devam ederek{" "}
          <Link href="#" className="text-amber-800 underline">
            Kullanım Koşulları
          </Link>
          nı kabul etmiş olursunuz.
        </div>
      </div>
    </div>
  );
}
