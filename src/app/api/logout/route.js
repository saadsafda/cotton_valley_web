import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer.customer_logout`;

    const cookieStore = await cookies();
    const authToken = cookieStore.get("uat")?.value; // assuming cookie name is "uat"

    if (!authToken) {
        return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Cookie": `sid=${authToken}`,
            "Content-Type": "application/json",
            "Authorization": `token ${authToken}`,
        },
    });

    const data = await response.json();

    return NextResponse.json(data?.message);
}