import type { Context } from "@netlify/functions";
import { supabase, json, error, isAdmin } from "./_shared/supabase.ts";

export default async function handler(request: Request, _context: Context) {
  if (request.method === "GET") {
    return handleGet();
  }

  if (request.method === "POST") {
    return handlePost(request);
  }

  return error("Method not allowed", 405);
}

async function handleGet() {
  const { data: wishes, error: dbError } = await supabase
    .from("wishes")
    .select("*, reservations(id)")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (dbError) return error(dbError.message, 500);

  const result = wishes.map((w) => ({
    id: w.id,
    title: w.title,
    description: w.description,
    url: w.url,
    price: w.price,
    currency: w.currency,
    max_slots: w.max_slots,
    status: w.status,
    created_at: w.created_at,
    reserved_slots: (w.reservations as { id: string }[]).length,
  }));

  return json(result);
}

async function handlePost(request: Request) {
  if (!isAdmin(request)) return error("Unauthorized", 401);

  const body = await request.json();
  const { title, description, url, price, currency, max_slots } = body;

  if (!title) return error("title is required");

  const { data, error: dbError } = await supabase
    .from("wishes")
    .insert({
      title,
      description: description || "",
      url: url || "",
      price: price || 0,
      currency: currency || "RUB",
      max_slots: max_slots || 1,
      status: "active",
    })
    .select()
    .single();

  if (dbError) return error(dbError.message, 500);

  return json(data, 201);
}
