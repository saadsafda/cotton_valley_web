import { cookies } from 'next/headers';
import order from './order.json'
import { NextResponse } from "next/server";

export async function GET(request) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.sales_order.get_submited_orders`;
    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get("uat")?.value;

        let headers = {
            "Content-Type": "application/json",
        }
        if (authToken) {
            headers["Cookie"] = `sid=${authToken}`;
            headers["Authorization"] = `Bearer ${authToken}`;
        }

        const searchParams = request?.nextUrl?.searchParams;
        const page = searchParams.get("page");

        const response = await fetch(`${url}?page=${page}`, {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Error response:', errorText);
            return NextResponse.json({ error: 'Failed to fetch orders' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data?.message || []);
    } catch (err) {
        console.error('Fetch error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}