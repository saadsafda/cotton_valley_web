import self from './self.json'
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer.get_current_customer`;

    // Read token from cookies
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
            "Customer-Authorization": `Bearer ${authToken}`,
        },
    });

    const data = await response.json();


    if (data?.exception || data?.exc_type === "AuthenticationError") {
        return NextResponse.json({ status: "error", message: "Invalid token" }, { status: 401 });
    }

    if (data?.message?.status === "error") {
        return NextResponse.json({}, { status: 401 });
    }

    return NextResponse.json(data?.message || {});
}