import { NextResponse } from 'next/server';
import order from '../order.json'
import { cookies } from 'next/headers';
export async function GET(_, { params }) {
    const orderId = params.orderId
    const cookieStore = await cookies();
    const authToken = cookieStore.get("uat")?.value;

    let headers = {
        "Content-Type": "application/json",
    }
    if (authToken) {
        headers["Cookie"] = `sid=${authToken}`;
        headers["Customer-Authorization"] = `Bearer ${authToken}`;
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.sales_order.get_order_details?order_number=${orderId}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Error response:', errorText);
            return NextResponse.json({ error: 'Failed to fetch order details' }, { status: response.status });
        }

        const data = await response.json();
        const orderObj = data?.message || {}
        return NextResponse.json(orderObj)
    } catch (err) {
        console.error('Fetch error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

}