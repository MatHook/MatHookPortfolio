import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import type { WishWithReservations } from "../types/wishlist";
import { getAdminWishes, ApiError } from "../api/wishlistApi";
import { AddWishForm } from "../components/AddWishForm";
import { AdminWishCard } from "../components/AdminWishCard";
import "./Wishlist.css";

export function AdminPage() {
  const [secret, setSecret] = useState(
    () => localStorage.getItem("admin_secret") || "",
  );
  const [authed, setAuthed] = useState(false);
  const [wishes, setWishes] = useState<WishWithReservations[]>([]);
  const [loading, setLoading] = useState(false);

  const loadWishes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminWishes(secret);
      setWishes(data);
      setAuthed(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setAuthed(false);
      } else {
        alert("Ошибка загрузки");
      }
    } finally {
      setLoading(false);
    }
  }, [secret]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("admin_secret", secret);
    loadWishes();
  }

  useEffect(() => {
    if (secret) loadWishes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!authed) {
    return (
      <div className="wishlist-page">
        <header className="wishlist-header">
          <Link to="/" className="back-link">
            &larr; Назад
          </Link>
          <h1>Админка</h1>
        </header>
        <form className="admin-login" onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Admin secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <button type="submit">Войти</button>
        </form>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <Link to="/" className="back-link">
          &larr; Назад
        </Link>
        <h1>Админка вишлиста</h1>
      </header>

      <AddWishForm secret={secret} onAdded={loadWishes} />

      {loading ? (
        <p className="wishlist-loading">Загрузка...</p>
      ) : (
        <div className="admin-wishes">
          {wishes.map((wish) => (
            <AdminWishCard
              key={wish.id}
              wish={wish}
              secret={secret}
              onUpdated={loadWishes}
            />
          ))}
        </div>
      )}
    </div>
  );
}
