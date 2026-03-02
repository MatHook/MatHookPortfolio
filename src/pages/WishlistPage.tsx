import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { WishWithSlots } from "../types/wishlist";
import "./Wishlist.css";

const CURRENCY_SYMBOL: Record<string, string> = {
  RUB: "\u20BD",
  USD: "$",
  EUR: "\u20AC",
};

export function WishlistPage() {
  const [wishes, setWishes] = useState<WishWithSlots[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wishes")
      .then((r) => r.json())
      .then((data) => setWishes(data))
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
            <WishCard key={wish.id} wish={wish} onReserved={setWishes} />
          ))}
        </div>
      )}
    </div>
  );
}

function WishCard({
  wish,
  onReserved,
}: {
  wish: WishWithSlots;
  onReserved: React.Dispatch<React.SetStateAction<WishWithSlots[]>>;
}) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cancelUrl, setCancelUrl] = useState<string | null>(null);

  const isFull = wish.reserved_slots >= wish.max_slots;

  async function handleReserve(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wish_id: wish.id, name, message }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Ошибка");
        return;
      }

      const data = await res.json();
      setCancelUrl(data.cancel_url);
      setShowForm(false);

      onReserved((prev) =>
        prev.map((w) =>
          w.id === wish.id ? { ...w, reserved_slots: w.reserved_slots + 1 } : w
        )
      );
    } catch {
      alert("Ошибка сети");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`wish-card ${isFull ? "wish-card--full" : ""}`}>
      <h3 className="wish-card__title">
        {wish.url ? (
          <a href={wish.url} target="_blank" rel="noreferrer">
            {wish.title}
          </a>
        ) : (
          wish.title
        )}
      </h3>

      {wish.description && (
        <p className="wish-card__desc">{wish.description}</p>
      )}

      {wish.price > 0 && (
        <p className="wish-card__price">
          {wish.price.toLocaleString("ru-RU")}{" "}
          {CURRENCY_SYMBOL[wish.currency] || wish.currency}
        </p>
      )}

      <p className="wish-card__slots">
        {wish.reserved_slots} / {wish.max_slots} зарезервировано
      </p>

      {cancelUrl && (
        <div className="wish-card__success">
          Зарезервировано! Сохрани ссылку для отмены:
          <br />
          <a href={cancelUrl}>{cancelUrl}</a>
        </div>
      )}

      {!isFull && !cancelUrl && !showForm && (
        <button
          className="wish-card__btn"
          onClick={() => setShowForm(true)}
        >
          Зарезервировать
        </button>
      )}

      {showForm && (
        <form className="reserve-form" onSubmit={handleReserve}>
          <input
            type="text"
            placeholder="Твоё имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Сообщение (необязательно)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
          />
          <div className="reserve-form__actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "..." : "Подтвердить"}
            </button>
            <button type="button" onClick={() => setShowForm(false)}>
              Отмена
            </button>
          </div>
        </form>
      )}

      {isFull && !cancelUrl && (
        <p className="wish-card__full-label">Всё разобрано!</p>
      )}
    </div>
  );
}
