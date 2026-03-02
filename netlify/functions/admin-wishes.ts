import type { Context } from "@netlify/functions";
import { supabase, json, error, isAdmin } from "./_shared/supabase.ts";

/** GET /api/admin-wishes — all wishes with reservations (admin only) */
export default async function handler(request: Request, _context: Context) {
  if (request.method !== "GET") return error("Method not allowed", 405);
  if (!isAdmin(request)) return error("Unauthorized", 401);

  const { data, error: dbError } = await supabase
    .from("wishes")
    .select("*, reservations(*)")
    .order("created_at", { ascending: false });

  if (dbError) return error(dbError.message, 500);

  return json(data);
}
