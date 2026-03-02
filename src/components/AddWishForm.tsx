import { useState } from "react";
import type { CreateWishBody, Currency } from "../types/wishlist";
import { createWish, ApiError } from "../api/wishlistApi";

export function AddWishForm({
  secret,
  onAdded,
}: {
  secret: string;
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
      await createWish(secret, form);
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
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Ошибка");
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
