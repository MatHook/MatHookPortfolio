import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import type {
  WishWithReservations,
  CreateWishBody,
  Currency,
  WishStatus,
} from "../types/wishlist";
import "./Wishlist.css";

export function AdminPage() {
  const [secret, setSecret] = useState(
    () => localStorage.getItem("admin_secret") || ""
  );
  const [authed, setAuthed] = useState(false);
  const [wishes, setWishes] = useState<WishWithReservations[]>([]);
  const [loading, setLoading] = useState(false);

  const headers = useCallback(
    () => ({
      "Content-Type": "application/json",
      "x-admin-secret": secret,
    }),
    [secret]
  );

  const loadWishes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin-wishes", { headers: headers() });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setWishes(data);
      setAuthed(true);
    } catch {
      alert("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }, [headers]);

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

      <AddWishForm headers={headers()} onAdded={loadWishes} />

      {loading ? (
        <p className="wishlist-loading">Загрузка...</p>
      ) : (
        <div className="admin-wishes">
          {wishes.map((wish) => (
            <AdminWishCard
              key={wish.id}
              wish={wish}
              headers={headers()}
              onUpdated={loadWishes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AddWishForm({
  headers,
  onAdded,
}: {
  headers: Record<string, string>;
  onAdded: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateWishBody>({
    title: "",
    description: "",
    url: "",
    price: 0,
    currency: "RUB",
    max_slots: 1,
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error);
        return;
      }
      setForm({
        title: "",
        description: "",
        url: "",
        price: 0,
        currency: "RUB",
        max_slots: 1,
      });
      setOpen(false);
      onAdded();
    } catch {
      alert("Ошибка");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button className="admin-add-btn" onClick={() => setOpen(true)}>
        + Добавить желание
      </button>
    );
  }

  return (
    <form className="admin-add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название*"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Описание"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        rows={2}
      />
      <input
        type="url"
        placeholder="Ссылка"
        value={form.url}
        onChange={(e) => setForm({ ...form, url: e.target.value })}
      />
      <div className="admin-add-form__row">
        <input
          type="number"
          placeholder="Цена"
          value={form.price || ""}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          min={0}
        />
        <select
          value={form.currency}
          onChange={(e) =>
            setForm({ ...form, currency: e.target.value as Currency })
          }
        >
          <option value="RUB">RUB</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <input
          type="number"
          placeholder="Слотов"
          value={form.max_slots || ""}
          onChange={(e) =>
            setForm({ ...form, max_slots: Number(e.target.value) })
          }
          min={1}
        />
      </div>
      <div className="reserve-form__actions">
        <button type="submit" disabled={submitting}>
          {submitting ? "..." : "Создать"}
        </button>
        <button type="button" onClick={() => setOpen(false)}>
          Отмена
        </button>
      </div>
    </form>
  );
}

function AdminWishCard({
  wish,
  headers,
  onUpdated,
}: {
  wish: WishWithReservations;
  headers: Record<string, string>;
  onUpdated: () => void;
}) {
  async function updateStatus(status: WishStatus) {
    await fetch(`/api/wishes-manage?id=${wish.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });
    onUpdated();
  }

  async function handleDelete() {
    if (!confirm("Удалить желание и все резервации?")) return;
    await fetch(`/api/wishes-manage?id=${wish.id}`, {
      method: "DELETE",
      headers,
    });
    onUpdated();
  }

  return (
    <div className="admin-wish-card">
      <div className="admin-wish-card__header">
        <h3>
          {wish.title}
          <span className={`status-badge status-badge--${wish.status}`}>
            {wish.status}
          </span>
        </h3>
        <div className="admin-wish-card__actions">
          {wish.status === "active" && (
            <button onClick={() => updateStatus("fulfilled")}>
              Исполнено
            </button>
          )}
          {wish.status === "fulfilled" && (
            <button onClick={() => updateStatus("active")}>
              Активировать
            </button>
          )}
          <button onClick={() => updateStatus("archived")}>Архив</button>
          <button className="btn-danger" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>

      {wish.description && <p>{wish.description}</p>}

      {wish.price > 0 && (
        <p>
          {wish.price} {wish.currency}
        </p>
      )}

      {wish.reservations.length > 0 && (
        <div className="admin-reservations">
          <h4>
            Резервации ({wish.reservations.length}/{wish.max_slots}):
          </h4>
          <ul>
            {wish.reservations.map((r) => (
              <li key={r.id}>
                <strong>{r.name}</strong>
                {r.message && <> — {r.message}</>}
                <br />
                <small>
                  {new Date(r.created_at).toLocaleDateString("ru-RU")}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
