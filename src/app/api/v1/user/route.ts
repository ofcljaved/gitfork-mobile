import { fetchUserDetails } from "@/lib/fetchUserDetails";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get("name");
  if (!username) {
    return Response.json({
      success: false,
      data: null,
      message: "No username provided",
    });
  }

  const userData = await fetchUserDetails(username);
  return Response.json({
    success: true,
    data: userData,
    message: "User details fetched successfully",
  });
}
