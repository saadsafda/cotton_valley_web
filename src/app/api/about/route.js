import { NextResponse } from "next/server";

export async function GET() {

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.about_page.get_about_page`;
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data?.message?.data || {});
}
