import { useEffect, useState } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mrdrago:favs");
      if (raw) setFavorites(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("mrdrago:favs", JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  function toggleFavorite(id: string) {
    setFavorites((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function isFavorite(id: string) {
    return favorites.includes(id);
  }

  return { favorites, toggleFavorite, isFavorite };
}
