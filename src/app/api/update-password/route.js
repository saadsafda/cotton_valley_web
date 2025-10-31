import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { token, password } = body;

        // Validate input
        if (!token || !password) {
            return NextResponse.json(
                { status: "error", message: "Reset token and new password are required" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { status: "error", message: "Password must be at least 8 characters long" },
                { status: 400 }
            );
        }

        const headers = {
            "Content-Type": "application/json",
        };

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer.reset_password`;
        
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                reset_token: token,
                new_password: password
            }),
        });

        const data = await response.json();

        if (data.message?.status === "success") {
            return NextResponse.json({
                status: 200,
                data: {
                    message: data.message.message
                }
            });
        } else {
            return NextResponse.json(
                {
                    status: 400,
                    data: {
                        message: data.message?.message || "Failed to reset password"
                    }
                },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            { 
                status: 500,
                data: {
                    message: "An error occurred while resetting your password"
                }
            },
            { status: 500 }
        );
    }
}
