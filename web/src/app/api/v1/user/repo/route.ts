import { fetchUserRepos } from "@/lib/fetchUserDetails";
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

  try {
    const repos = await fetchUserRepos(username);
    return Response.json({
      success: true,
      data: repos,
      message: "User repos fetched successfully",
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      {
        success: false,
        data: null,
        message: "User repos fetch failed",
      },
      {
        status: 400,
      },
    );
  }
}
