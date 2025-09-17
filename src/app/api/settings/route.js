import setting from './setting.json'
import { NextResponse } from "next/server";

export async function GET() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.website_theme_setting.settings`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Settings error response:', errorText);
            return NextResponse.json({ error: true, message: 'Failed to fetch settings' }, { status: response.status });
        }

        const data = await response.json();
        
        return NextResponse.json(data?.message || {});
    } catch (err) {
        return NextResponse.json({ error: true, message: err?.message || 'Internal server error' }, { status: 500 });
    }
}