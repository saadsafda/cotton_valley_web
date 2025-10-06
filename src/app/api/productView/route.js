import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.products.make_product_views`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: body.product_id }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to update product views" },
      { status: 500 }
    );
  }
}
