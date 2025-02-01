import { fetchUserData, fetchUserStarCount } from "@/lib/fetchUserDetails";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get("name");
  if (!username) {
    return Response.json(
      {
        success: false,
        data: null,
        message: "No username provided",
      },
      { status: 411 },
    );
  }

  try {
    const [userData, userStars] = await Promise.all([
      fetchUserData(username),
      fetchUserStarCount(username),
    ]);

    return Response.json({
      success: true,
      data: { ...userData, ...userStars },
      message: "User details fetched successfully",
    });
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        success: false,
        data: null,
        message: "User details fetch failed",
      },
      { status: 400 },
    );
  }
}
