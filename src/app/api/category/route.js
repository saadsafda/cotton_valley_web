// import category from './category.json'
import { NextResponse } from "next/server";

export async function GET() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.category.get_category_list`;
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data.message || []);
}