import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer.customer_login`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorText = await response.json();
            console.log('Login error response:', errorText);
            
            return NextResponse.json(errorText?.message || 'Login failed', { status: response.status });
        }

        const data = await response.json();
        if (data?.message?.status === 'error') {
            return NextResponse.json(data.message, { status: 401 });
        }
        return NextResponse.json(data?.message);
    } catch (err) {
        return NextResponse.json({ error: true, message: err?.message || 'Internal server error' }, { status: 500 });
    }
}