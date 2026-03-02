import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Wishlist.css";

export function CancelPage() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleCancel() {
    setStatus("loading");
    try {
      const res = await fetch(`/api/reservations-cancel?token=${token}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <Link to="/wishlist" className="back-link">
          &larr; К вишлисту
        </Link>
        <h1>Отмена резервации</h1>
      </header>

      <div className="cancel-card">
        {status === "idle" && (
          <>
            <p>Ты уверен, что хочешь отменить резервацию?</p>
            <button className="wish-card__btn" onClick={handleCancel}>
              Да, отменить
            </button>
          </>
        )}

        {status === "loading" && <p>Отменяю...</p>}

        {status === "done" && (
          <p className="cancel-success">
            Резервация отменена!{" "}
            <Link to="/wishlist">Вернуться к вишлисту</Link>
          </p>
        )}

        {status === "error" && (
          <p className="cancel-error">
            Не удалось отменить. Возможно, ссылка уже использована.
          </p>
        )}
      </div>
    </div>
  );
}
