import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("uat")?.value;

    let headers = {
        "Content-Type": "application/json",
    }
    if (authToken) {
        headers["Cookie"] = `sid=${authToken}`;
        headers["Customer-Authorization"] = `Bearer ${authToken}`;
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer.customer_logout`;

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
    });

    const data = await response.json();

    return NextResponse.json(data?.message);
}