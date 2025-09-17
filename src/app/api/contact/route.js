import { NextResponse } from "next/server";

export async function GET() {

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.contact_page.get_contact_page`;
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data?.message?.data || {});
}

export async function POST(request) {
    try {
        const { name, email, phone, subject, message } = await request.json();
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.contact_page.submit_contact_form`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, phone, subject, message }),
        });

        if (!response.ok) {
            const errorText = await response.json();
            console.log('Contact message error response:', errorText);

            return NextResponse.json(errorText?.message || 'Failed to send message', { status: response.status });
        }

        const data = await response.json();
        if (data?.message?.status === 'error') {
            return NextResponse.json(data.message, { status: 400 });
        }
        return NextResponse.json(data?.message);
    } catch (err) {
        return NextResponse.json({ error: true, message: err?.message || 'Internal server error' }, { status: 500 });
    }
}
