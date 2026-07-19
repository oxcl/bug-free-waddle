interface Env {
  YOTI_STORE: KVNamespace;
}

interface OtpVerifyRequest {
  userId: string;
  code: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { YOTI_STORE } = context.env;

  try {
    const body = (await context.request.json()) as OtpVerifyRequest;

    if (!body.userId || !body.code) {
      return new Response(
        JSON.stringify({ error: "Missing userId or code" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const stored = await YOTI_STORE.get(`otp:${body.userId}`);

    if (!stored) {
      return new Response(
        JSON.stringify({ verified: false, error: "OTP expired or not found" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (stored !== body.code) {
      return new Response(
        JSON.stringify({ verified: false, error: "Invalid code" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    await YOTI_STORE.delete(`otp:${body.userId}`);

    return new Response(
      JSON.stringify({ verified: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
