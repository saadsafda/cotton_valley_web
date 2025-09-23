import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.products.get_product_ids`;
        const searchParams = request?.nextUrl?.searchParams;
        const search = searchParams.get("search");

        console.log('Search query:', `${url}?search=${search}`);

        const response = await fetch(`${url}?search=${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Error response:', errorText);
            return NextResponse.json({ error: true, message: 'Failed to fetch product IDs' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data?.message);
    } catch (err) {
        return NextResponse.json({ error: true, message: err?.message || 'Internal server error' }, { status: 500 });
    }
}