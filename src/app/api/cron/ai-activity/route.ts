import { NextRequest, NextResponse } from "next/server";
import { runPeriodicAiActivity } from "@/lib/aiActivityEngine";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    const expectedSecret = process.env.CRON_SECRET || "wangwang-cron-secret-key";

    // Bearer token or ?key= query param check
    const isAuthorized =
      authHeader === `Bearer ${expectedSecret}` || key === expectedSecret;

    if (!isAuthorized && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await runPeriodicAiActivity();
    return NextResponse.json({ timestamp: new Date(), ...result });
  } catch (error) {
    console.error("Cron AI activity execution failed:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
