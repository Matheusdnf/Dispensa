import { NextResponse } from "next/server";
import { destroySession } from "@/app/lib/session";

export async function POST() {
  await destroySession();
  return NextResponse.json({ success: true });
}
