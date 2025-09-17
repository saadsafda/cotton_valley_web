import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const productId = params.productId;
    // Read token from cookies
    const cookieStore = await cookies();
    const authToken = cookieStore.get("uat")?.value;

    let headers = {
        "Content-Type": "application/json",
    }
    if (authToken) {
        headers["Cookie"] = `sid=${authToken}`;
        headers["Authorization"] = `token ${authToken}`;
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.products.get_product?product_id=${productId}`;

    const response = await fetch(url, {
        headers: headers,
        cache: "no-store", // avoid caching
    });

    const data = await response.json();

    return NextResponse.json(data.message || {});
}
