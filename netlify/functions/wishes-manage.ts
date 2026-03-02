import type { Context } from "@netlify/functions";
import { supabase, json, error, isAdmin } from "./_shared/supabase.ts";

/** PATCH/DELETE /api/wishes-manage?id=xxx — admin only */
export default async function handler(request: Request, _context: Context) {
  if (!isAdmin(request)) return error("Unauthorized", 401);

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return error("id query param is required");

  if (request.method === "PATCH") {
    const body = await request.json();
    const { data, error: dbError } = await supabase
      .from("wishes")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (dbError) return error(dbError.message, 500);
    return json(data);
  }

  if (request.method === "DELETE") {
    await supabase.from("reservations").delete().eq("wish_id", id);
    const { error: dbError } = await supabase
      .from("wishes")
      .delete()
      .eq("id", id);

    if (dbError) return error(dbError.message, 500);
    return json({ ok: true });
  }

  return error("Method not allowed", 405);
}
