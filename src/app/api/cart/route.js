import { cookies } from 'next/headers';
import cart from './cart.json'
import { NextResponse } from "next/server";

export async function GET() {
    // return NextResponse.json(cart)
    const cookieStore = await cookies();
    const authToken = cookieStore.get("uat")?.value;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.sales_order.get_cart`;

    let headers = {
        "Content-Type": "application/json",
    }

    if (authToken) {
        headers["Cookie"] = `sid=${authToken}`;
        headers["Authorization"] = `token ${authToken}`;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        return NextResponse.json(data.message || []);
    } catch (err) {
        return NextResponse.json({ error: true, message: err?.message || 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        // Read token from cookies
        const cookieStore = await cookies();
        const authToken = cookieStore.get("uat")?.value;
        const { items } = await request.json();
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.sales_order.create_or_update_sales_order`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Cookie": `sid=${authToken}`,
                "Content-Type": "application/json",
                "Authorization": `token ${authToken}`,
            },
            body: JSON.stringify({ items: items })
        });
        console.log(response, "response checking");
        if (!response.ok) {
            throw new Error('Failed to add item to cart');
        }
        const data = await response.json();
        return NextResponse.json({ message: 'Item added to cart', cart: data });
    } catch (err) {
        return NextResponse.json({ error: true, message: err?.message || 'Internal server error' }, { status: 500 });
    }
}