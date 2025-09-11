import { NextResponse } from "next/server";

export async function POST() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer.customer_logout`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log(response, "logout response");
    

    const data = await response.json();

    return NextResponse.json(data?.message);
}