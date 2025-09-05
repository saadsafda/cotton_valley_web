import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, password } = await request.json();

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer.customer_login`;

    console.log('Login request received with email:', email);
    

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return NextResponse.json(data?.message);
}