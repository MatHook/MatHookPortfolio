import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { WishWithSlots } from "../types/wishlist";
import { getWishes } from "../api/wishlistApi";
import { WishCard } from "../components/WishCard";
import "./Wishlist.css";

export function WishlistPage() {
  const [wishes, setWishes] = useState<WishWithSlots[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("wish");

  useEffect(() => {
    getWishes()
      .then(setWishes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <Link to="/" className="back-link">
          &larr; Назад
        </Link>
        <h1>Вишлист</h1>
        <p className="wishlist-subtitle">
          Выбери подарок и зарезервируй, чтобы не повторяться
        </p>
      </header>

      {loading ? (
        <p className="wishlist-loading">Загрузка...</p>
      ) : wishes.length === 0 ? (
        <p className="wishlist-empty">Пока пусто!</p>
      ) : (
        <div className="wishes-grid">
          {wishes.map((wish) => (
            <WishCard
              key={wish.id}
              wish={wish}
              onReserved={setWishes}
              highlighted={wish.id === highlightId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
