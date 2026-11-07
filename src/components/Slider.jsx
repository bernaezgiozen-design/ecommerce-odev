"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Slider() {
  const [recipes, setRecipes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState("");
  const supabase = createClient();
  useEffect(() => {
    async function getRecipes() {
      const { data, error } = await supabase
        .from("Proje")
        .select("*")
        .order("id", { ascending: true })
        .limit(5);

      if (error) {
        console.error("SUPABASE HATASI:", error);
        setError(error.message);
        return;
      }

      console.log("GELEN VERİLER:", data);
      console.log("İLK GÖRSEL:", data?.[0]?.image);

      setRecipes(data || []);
    }

    getRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length < 2) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % recipes.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [recipes]);

  if (error) {
    return <p className="p-5 text-red-500">Supabase hatası: {error}</p>;
  }

  if (recipes.length === 0) {
    return (
      <p className="p-5 text-center">
        Görseller yükleniyor veya kayıt bulunamadı.
      </p>
    );
  }

  const recipe = recipes[current];

  return (
    <div className="relative w-[900] h-300px] md:h-[400px] mx-auto overflow-hidden rounded-xl">
      <img
        key={recipe.id}
        src={recipe.image}
        alt={recipe.name || "Yemek görseli"}
        className="w-full h-full object-cover"
        onError={() => console.error("Görsel açılamadı:", recipe.image)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      <h2 className="absolute bottom-12 left-6 text-white text-2xl md:text-4xl font-bold">
        {recipe.name}
      </h2>

      <button
        onClick={() =>
          setCurrent((current - 1 + recipes.length) % recipes.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3"
      >
        ❮
      </button>

      <button
        onClick={() => setCurrent((current + 1) % recipes.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3"
      >
        ❯
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {recipes.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full ${
              current === index ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
            sjsjsjsj
          />
        ))}
      </div>
    </div>
  );
}
