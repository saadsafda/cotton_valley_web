import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { name,
            business_type,
            company_name,
            phone,
            square_footage,
            email, } = await request.json();
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.lead.create_lead`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, phone, company_name, business_type, square_footage }),
        });

        if (!response.ok) {
            const errorText = await response.json();
            console.log('Lead creation error response:', errorText);

            return NextResponse.json(errorText?.message || 'Lead creation failed', { status: response.status });
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