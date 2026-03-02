import type {
  WishWithSlots,
  WishWithReservations,
  CreateWishBody,
  ReservationResult,
  Wish,
} from "../types/wishlist";

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error || `HTTP ${res.status}`, res.status);
  }

  return res.json();
}

function adminHeaders(secret: string): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "x-admin-secret": secret,
  };
}

// ── Public ──

export function getWishes(): Promise<WishWithSlots[]> {
  return request("/.netlify/functions/wishes");
}

export function createReservation(
  wishId: string,
  name: string,
  message: string,
  participants: number,
): Promise<ReservationResult> {
  return request("/.netlify/functions/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wish_id: wishId, name, message, participants }),
  });
}

export function cancelReservation(
  token: string,
): Promise<{ ok: boolean; wish_id: string }> {
  return request(`/.netlify/functions/reservations-cancel?token=${token}`, {
    method: "DELETE",
  });
}

// ── Admin ──

export function getAdminWishes(
  secret: string,
): Promise<WishWithReservations[]> {
  return request("/.netlify/functions/admin-wishes", { headers: adminHeaders(secret) });
}

export function createWish(
  secret: string,
  body: CreateWishBody,
): Promise<Wish> {
  return request("/.netlify/functions/wishes", {
    method: "POST",
    headers: adminHeaders(secret),
    body: JSON.stringify(body),
  });
}

export function updateWish(
  secret: string,
  id: string,
  data: Partial<Omit<Wish, "id" | "created_at">>,
): Promise<Wish> {
  return request(`/.netlify/functions/wishes-manage?id=${id}`, {
    method: "PATCH",
    headers: adminHeaders(secret),
    body: JSON.stringify(data),
  });
}

export function deleteWish(
  secret: string,
  id: string,
): Promise<{ ok: boolean }> {
  return request(`/.netlify/functions/wishes-manage?id=${id}`, {
    method: "DELETE",
    headers: adminHeaders(secret),
  });
}

export { ApiError };
