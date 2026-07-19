interface Env {
  TELEGRAM_BOT_TOKEN: string;
  YOTI_STORE: KVNamespace;
}

function isUrl(text: string): boolean {
  try {
    new URL(text.trim());
    return true;
  } catch {
    return false;
  }
}

async function sendTelegramMessage(
  token: string,
  chatId: number,
  text: string
): Promise<void> {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { TELEGRAM_BOT_TOKEN, YOTI_STORE } = context.env;

  if (!TELEGRAM_BOT_TOKEN) {
    return new Response("ok");
  }

  try {
    const update = (await context.request.json()) as {
      message?: { chat?: { id?: number }; text?: string };
    };

    const chatId = update.message?.chat?.id;
    const text = update.message?.text?.trim();

    if (!chatId || !text) {
      return new Response("ok");
    }

    if (isUrl(text)) {
      await YOTI_STORE.put("yoti_link", text);
      await sendTelegramMessage(TELEGRAM_BOT_TOKEN, chatId, "YOTI link updated.");
    } else {
      await sendTelegramMessage(
        TELEGRAM_BOT_TOKEN,
        chatId,
        "Send a URL to update the YOTI verification link."
      );
    }
  } catch {
    // ignore malformed updates
  }

  return new Response("ok");
};
