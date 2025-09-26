import { cookies } from 'next/headers';
import coupon from './coupon.json'
import { NextResponse } from "next/server";

export async function GET(request) {
    const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.sales_order.apply_coupon`;

    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get("uat")?.value;

        let headers = {
            "Content-Type": "application/json",
        }
        if (authToken) {
            headers["Cookie"] = `sid=${authToken}`;
            headers["Customer-Authorization"] = `Bearer ${authToken}`;
        }

        const searchParams = request?.nextUrl?.searchParams;
        const couponCode = searchParams.get("coupon_code");

        const response = await fetch(`${baseURL}?code=${couponCode}`, {
            method: "GET",
            headers: headers,
        });
        const data = await response.json();

        return NextResponse.json(data?.message);
    } catch (error) {
        console.error("Error fetching coupon data:", error);
        return NextResponse.error();
    }
}