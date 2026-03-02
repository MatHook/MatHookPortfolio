import type { Context } from "@netlify/functions";
import { supabase, json, error } from "./_shared/supabase.ts";

/** DELETE /api/reservations-cancel?token=xxx */
export default async function handler(request: Request, _context: Context) {
  if (request.method !== "DELETE") return error("Method not allowed", 405);

  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) return error("token is required");

  const { data, error: dbError } = await supabase
    .from("reservations")
    .delete()
    .eq("token", token)
    .select()
    .single();

  if (dbError || !data) return error("Reservation not found", 404);

  return json({ ok: true, wish_id: data.wish_id });
}
