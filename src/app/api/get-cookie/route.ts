import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookies = req.cookies;
  const authToken =
    cookies.get("token")?.value || localStorage.getItem("auth_token");
  return NextResponse.json({
    token: authToken,
  });
}
