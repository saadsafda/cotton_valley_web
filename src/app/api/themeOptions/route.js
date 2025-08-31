// import themeOption from './themeOption.json'
import { NextResponse } from "next/server";

export async function GET() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.website_theme_setting.get_website_theme_settings`;
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data.message || []);
}