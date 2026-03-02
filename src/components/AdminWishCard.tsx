import type { WishWithReservations } from "../types/wishlist";
import { updateWish, deleteWish } from "../api/wishlistApi";
import type { WishStatus } from "../types/wishlist";

export function AdminWishCard({
  wish,
  secret,
  onUpdated,
}: {
  wish: WishWithReservations;
  secret: string;
  onUpdated: () => void;
}) {
  async function handleStatus(status: WishStatus) {
    await updateWish(secret, wish.id, { status });
    onUpdated();
  }

  async function handleDelete() {
    if (!confirm("Удалить желание и все резервации?")) return;
    await deleteWish(secret, wish.id);
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
