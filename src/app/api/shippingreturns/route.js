import { NextResponse } from "next/server";

export async function GET() {

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.pages.get_shipping_and_return_page`;
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data?.message ? data.message : {});
}
