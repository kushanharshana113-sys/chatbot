import { NextRequest, NextResponse } from "next/server";
import { replyFor } from "../../../lib/flow";
import { sendWhatsAppText } from "../../../lib/whatsapp";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const mode = q.get("hub.mode");
  const token = q.get("hub.verify_token");
  const challenge = q.get("hub.challenge");
  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const messages = payload?.entry?.[0]?.changes?.[0]?.value?.messages;
    if (!messages?.length) return NextResponse.json({ ok: true });
    const message = messages[0];
    const from = message.from;
    const text = message?.text?.body;
    if (from && text) await sendWhatsAppText(from, replyFor(from, text));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
