import { useEffect, useRef, useState } from "react";
import type { WishWithSlots } from "../types/wishlist";
import { createReservation, ApiError } from "../api/wishlistApi";

const CURRENCY_SYMBOL: Record<string, string> = {
  RUB: "\u20BD",
  USD: "$",
  EUR: "\u20AC",
};

export function WishCard({
  wish,
  onReserved,
  highlighted,
}: {
  wish: WishWithSlots;
  onReserved: React.Dispatch<React.SetStateAction<WishWithSlots[]>>;
  highlighted: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [participants, setParticipants] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [cancelUrl, setCancelUrl] = useState<string | null>(null);
  const [savedParticipants, setSavedParticipants] = useState(1);

  const isFull = wish.reserved_slots >= wish.max_slots;

  // Auto-scroll & highlight via invite link
  useEffect(() => {
    if (highlighted && !isFull) {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setShowForm(true);
    }
  }, [highlighted, isFull]);

  const inviteUrl = `${window.location.origin}/wishlist?wish=${wish.id}`;

  async function handleReserve(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = await createReservation(wish.id, name, message, participants);
      setCancelUrl(data.cancel_url);
      setSavedParticipants(participants);
      setShowForm(false);

      onReserved((prev) =>
        prev.map((w) =>
          w.id === wish.id ? { ...w, reserved_slots: w.reserved_slots + 1 } : w,
        ),
      );
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Ошибка сети");
    } finally {
      setSubmitting(false);
    }
  }

  function handleCopyInvite() {
    navigator.clipboard.writeText(inviteUrl);
  }

  return (
    <div
      ref={cardRef}
      className={`wish-card ${isFull ? "wish-card--full" : ""} ${highlighted ? "wish-card--highlighted" : ""}`}
    >
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
          <p>Зарезервировано! Сохрани ссылку для отмены:</p>
          <a href={cancelUrl}>{cancelUrl}</a>

          {savedParticipants > 1 && (
            <div className="wish-card__invite">
              <p>
                Вас {savedParticipants} — отправь ссылку остальным участникам:
              </p>
              <div className="invite-row">
                <input type="text" readOnly value={inviteUrl} />
                <button type="button" onClick={handleCopyInvite}>
                  Скопировать
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!isFull && !cancelUrl && !showForm && (
        <button className="wish-card__btn" onClick={() => setShowForm(true)}>
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
            autoFocus={highlighted}
          />
          <textarea
            placeholder="Сообщение (необязательно)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
          />
          <div className="reserve-form__participants">
            <label>
              Сколько человек скидываются:
              <input
                type="number"
                value={participants}
                onChange={(e) =>
                  setParticipants(Math.max(1, Number(e.target.value)))
                }
                min={1}
              />
            </label>
          </div>
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
