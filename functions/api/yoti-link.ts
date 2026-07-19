interface Env {
  YOTI_STORE: KVNamespace;
  YOTI_LINK_SECRET: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = await context.env.YOTI_STORE.get("yoti_link");
  return new Response(
    JSON.stringify({ url: url || null }),
    { headers: { "Content-Type": "application/json" } }
  );
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const secret = context.request.headers.get("x-yoti-secret");
  if (secret !== context.env.YOTI_LINK_SECRET) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = (await context.request.json()) as { url: string };
  if (!body.url) {
    return new Response(
      JSON.stringify({ error: "Missing url" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  await context.env.YOTI_STORE.put("yoti_link", body.url);
  return new Response(
    JSON.stringify({ success: true }),
    { headers: { "Content-Type": "application/json" } }
  );
};
