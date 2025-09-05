import self from './self.json'
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer.get_current_customer`;

    // Read token from cookies
    const cookieStore = cookies();
    const authToken = cookieStore.get("uat")?.value; // assuming cookie name is "uat"

    if (!authToken) {
        return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        },
    });

    const data = await response.json();

    console.log(data, "Self Data checking");

    if (data?.message?.status === "error") {
        return NextResponse.json({}, { status: 401 });
    }

    return NextResponse.json(data?.message || {});
}