import { useState } from "react";
import type {
  WishWithReservations,
  WishStatus,
  Currency,
} from "../types/wishlist";
import { updateWish, deleteWish, ApiError } from "../api/wishlistApi";

interface EditForm {
  title: string;
  description: string;
  url: string;
  price: number;
  currency: Currency;
  max_slots: number;
}

export function AdminWishCard({
  wish,
  secret,
  onUpdated,
}: {
  wish: WishWithReservations;
  secret: string;
  onUpdated: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<EditForm>({
    title: wish.title,
    description: wish.description,
    url: wish.url,
    price: wish.price,
    currency: wish.currency,
    max_slots: wish.max_slots,
  });
  const [saving, setSaving] = useState(false);

  async function handleStatus(status: WishStatus) {
    await updateWish(secret, wish.id, { status });
    onUpdated();
  }

  async function handleDelete() {
    if (!confirm("Удалить желание и все резервации?")) return;
    await deleteWish(secret, wish.id);
    onUpdated();
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await updateWish(secret, wish.id, form);
      setEditing(false);
      onUpdated();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setForm({
      title: wish.title,
      description: wish.description,
      url: wish.url,
      price: wish.price,
      currency: wish.currency,
      max_slots: wish.max_slots,
    });
    setEditing(false);
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
          <button onClick={() => setEditing(!editing)}>
            {editing ? "Свернуть" : "Редактировать"}
          </button>
          {wish.status === "active" && (
            <button onClick={() => handleStatus("fulfilled")}>
              Исполнено
            </button>
          )}
          {wish.status === "fulfilled" && (
            <button onClick={() => handleStatus("active")}>
              Активировать
            </button>
          )}
          <button onClick={() => handleStatus("archived")}>Архив</button>
          <button className="btn-danger" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>

      {editing ? (
        <form className="admin-edit-form" onSubmit={handleSave}>
          <label>
            Название
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </label>
          <label>
            Описание
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={2}
            />
          </label>
          <label>
            Ссылка
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </label>
          <div className="admin-edit-form__row">
            <label>
              Цена
              <input
                type="number"
                value={form.price || ""}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                min={0}
              />
            </label>
            <label>
              Валюта
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
            </label>
            <label>
              Кол-во
              <input
                type="number"
                value={form.max_slots || ""}
                onChange={(e) =>
                  setForm({ ...form, max_slots: Number(e.target.value) })
                }
                min={1}
              />
            </label>
          </div>
          <div className="reserve-form__actions">
            <button type="submit" disabled={saving}>
              {saving ? "..." : "Сохранить"}
            </button>
            <button type="button" onClick={handleCancel}>
              Отмена
            </button>
          </div>
        </form>
      ) : (
        <div className="admin-wish-card__info">
          {wish.description && <p>{wish.description}</p>}

          {wish.url && (
            <p>
              <a href={wish.url} target="_blank" rel="noreferrer">
                {wish.url}
              </a>
            </p>
          )}

          <div className="admin-wish-card__meta">
            {wish.price > 0 && (
              <span>
                {wish.price.toLocaleString("ru-RU")} {wish.currency}
              </span>
            )}
            <span>Кол-во: {wish.max_slots}</span>
            <span>
              Участников:{" "}
              {wish.reservations.reduce((s, r) => s + r.participants, 0)}
            </span>
          </div>
        </div>
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
                {r.participants > 1 && (
                  <span className="participants-badge">
                    {r.participants} чел.
                  </span>
                )}
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
