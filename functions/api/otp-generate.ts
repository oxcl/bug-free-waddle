interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  YOTI_STORE: KVNamespace;
}

interface OtpRequest {
  userId: string;
}

function generateOtp(): string {
  const array = new Uint8Array(6);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b % 10).join("");
}

async function sendOtpToTelegram(
  token: string,
  chatId: string,
  userId: string,
  otp: string
): Promise<{ ok: boolean; error?: string }> {
  const message = `🔐 KYC Verification Code\n\nUser: ${userId}\nCode: ${otp}\n\nExpires in 5 minutes.`;

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: text };
  }
  return { ok: true };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, YOTI_STORE } = context.env;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return new Response(
      JSON.stringify({ error: "Telegram not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = (await context.request.json()) as OtpRequest;

    if (!body.userId) {
      return new Response(
        JSON.stringify({ error: "Missing userId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const otp = generateOtp();

    await YOTI_STORE.put(`otp:${body.userId}`, otp, {
      expirationTtl: 300,
    });

    const result = await sendOtpToTelegram(
      TELEGRAM_BOT_TOKEN,
      TELEGRAM_CHAT_ID,
      body.userId,
      otp
    );

    if (!result.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send OTP to Telegram", details: result.error }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
