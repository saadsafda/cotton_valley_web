import { NextResponse } from "next/server";

export async function GET() {
    //    call the api to get the data
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.homepage.get_homepage_slides`;
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data.message || []);
}