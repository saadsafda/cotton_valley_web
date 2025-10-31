import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        // Read token from cookies
        const cookieStore = await cookies();
        const authToken = cookieStore.get("uat")?.value;

        if (!authToken) {
            return NextResponse.json(
                { status: "error", message: "Authentication required. Please login." },
                { status: 401 }
            );
        }

        let headers = {
            "Content-Type": "application/json",
            "Cookie": `sid=${authToken}`,
            "Customer-Authorization": `Bearer ${authToken}`,
        };

        const body = await request.json();
        const { current_password, new_password } = body;

        // Validate input
        if (!current_password || !new_password) {
            return NextResponse.json(
                { status: "error", message: "Current password and new password are required" },
                { status: 400 }
            );
        }

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer.change_password`;
        
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                current_password,
                new_password
            }),
        });

        const data = await response.json();

        if (data.message?.status === "success") {
            return NextResponse.json(data.message);
        } else {
            return NextResponse.json(
                data.message || { status: "error", message: "Failed to change password" },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error("Change password error:", error);
        return NextResponse.json(
            { status: "error", message: "An error occurred while changing password" },
            { status: 500 }
        );
    }
}
