import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email } = body;

        // Validate input
        if (!email) {
            return NextResponse.json(
                { status: "error", message: "Email is required" },
                { status: 400 }
            );
        }

        const headers = {
            "Content-Type": "application/json",
        };

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer.forgot_password`;
        
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                email,
                company: "Cotton Valley"
            }),
        });

        const data = await response.json();

        if (data.message?.status === "success") {
            return NextResponse.json({
                status: 200,
                data: {
                    message: data.message.message,
                    ...data.message.data
                }
            });
        } else {
            return NextResponse.json(
                {
                    status: 400,
                    data: {
                        message: data.message?.message || "Failed to send reset email"
                    }
                },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { 
                status: 500,
                data: {
                    message: "An error occurred while processing your request"
                }
            },
            { status: 500 }
        );
    }
}
