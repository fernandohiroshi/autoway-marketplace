import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await prisma.session.deleteMany({
      where: {
        expires: {
          lt: thirtyDaysAgo,
        },
      },
    });

    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

    await prisma.verificationToken.deleteMany({
      where: {
        expires: {
          lt: oneDayAgo,
        },
      },
    });

    console.log("Cleanup job completed successfully");
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cleanup job failed:", error);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}
