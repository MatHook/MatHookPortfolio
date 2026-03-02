export type WishStatus = "active" | "fulfilled" | "archived";
export type Currency = "RUB" | "USD" | "EUR";

export interface Wish {
  id: string;
  title: string;
  description: string;
  url: string;
  price: number;
  currency: Currency;
  max_slots: number;
  status: WishStatus;
  created_at: string;
}

export interface Reservation {
  id: string;
  wish_id: string;
  name: string;
  message: string;
  participants: number;
  token: string;
  created_at: string;
}

/** Wish + count of reservations (public API) */
export interface WishWithSlots extends Wish {
  reserved_slots: number;
}

/** Admin view: wish + full reservation details */
export interface WishWithReservations extends Wish {
  reservations: Reservation[];
}

/** POST /api/wishes body (admin) */
export interface CreateWishBody {
  title: string;
  description?: string;
  url?: string;
  price?: number;
  currency?: Currency;
  max_slots?: number;
}

/** POST /api/reservations body */
export interface CreateReservationBody {
  wish_id: string;
  name: string;
  message?: string;
  participants?: number;
}

/** Response after creating a reservation */
export interface ReservationResult {
  token: string;
  cancel_url: string;
}
