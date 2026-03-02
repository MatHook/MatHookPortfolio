import type { Context } from "@netlify/functions";
import { supabase, json, error } from "./_shared/supabase.ts";

export default async function handler(request: Request, _context: Context) {
  if (request.method !== "POST") return error("Method not allowed", 405);

  const body = await request.json();
  const { wish_id, name, message } = body;

  if (!wish_id || !name) return error("wish_id and name are required");

  // Check wish exists and has open slots
  const { data: wish, error: wishError } = await supabase
    .from("wishes")
    .select("*, reservations(id)")
    .eq("id", wish_id)
    .eq("status", "active")
    .single();

  if (wishError || !wish) return error("Wish not found or inactive", 404);

  const reservedCount = (wish.reservations as { id: string }[]).length;
  if (reservedCount >= wish.max_slots) {
    return error("All slots are already reserved", 409);
  }

  const token = crypto.randomUUID();

  const { error: insertError } = await supabase.from("reservations").insert({
    wish_id,
    name,
    message: message || "",
    token,
  });

  if (insertError) return error(insertError.message, 500);

  const siteUrl =
    process.env.URL || process.env.DEPLOY_PRIME_URL || "https://mathook.ru";

  return json(
    {
      token,
      cancel_url: `${siteUrl}/wishlist/cancel/${token}`,
    },
    201
  );
}
