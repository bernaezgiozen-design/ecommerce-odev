"use client";
import Slider from "@/components/Slider";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const supabase = createClient();

  useEffect(() => {
    getRecipes();
  }, []);
  console.log("object");
  async function getRecipes() {
    const { data, error } = await supabase
      .from("Proje")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Tarifler yüklenemedi:", error);
      setError("Tarifler yüklenirken bir hata oluştu.");
    } else {
      setRecipes(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return <p className="p-6">Tarifler yükleniyor... </p>;
  }

  if (error) {
    return <p className="p-6">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {" "}
      <Slider />
      <h1 className="mb-6 text-3xl font-bold">Tarifler</h1>
      {recipes.length === 0 ? (
        <p>Henüz tarif bulunmuyor.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="overflow-hidden rounded-xl bg-white shadow-md"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="mb-2 text-xl font-semibold">{recipe.name}</h2>

                <p className="text-sm text-gray-600">
                  ⭐ {recipe.rating || "Puan yok"}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  {recipe.difficulty || "Zorluk belirtilmemiş"}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      window.location.href = `/tarif/${recipe.id}`;
                    }}
                    className="rounded-lg bg-orange-500 px-4 py-2 text-white"
                  >
                    Tarifi Gör
                  </button>

                  <button
                    className="rounded-lg bg-gray-200 px-4 py-2"
                    onClick={() =>
                      alert(
                        "Yemek listesine ekleme özelliğini sonraki adımda yapacağız.",
                      )
                    }
                  >
                    + Listeye Ekle
                  </button>

                  <button
                    className="rounded-lg bg-pink-100 px-3 py-2"
                    onClick={() =>
                      alert(
                        "Favorilere ekleme özelliğini sonraki adımda yapacağız.",
                      )
                    }
                  >
                    ♥
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
