import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function GET(request) {

    // Read token from cookies
    const cookieStore = await cookies();
    const authToken = cookieStore.get("uat")?.value;

    let headers = {
        "Content-Type": "application/json",
    }
    if (authToken) {
        headers["Cookie"] = `sid=${authToken}`;
        headers["Customer-Authorization"] = `Bearer ${authToken}`;
    }


    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer.customer_bank_account`;

    const response = await fetch(`${url}`, {
        method: "GET",
        headers: headers,
    });
    // const response = await fetch(`${url}`);


    const data = await response.json();
    // console.log('Checking calling url:', products);

    // Attach pagination keys directly to the array
    return NextResponse.json(data?.message?.data || {});
}

export async function POST(request) {
    // Read token from cookies
    const cookieStore = await cookies();
    const authToken = cookieStore.get("uat")?.value;

    let headers = {
        "Content-Type": "application/json",
    }
    if (authToken) {
        headers["Cookie"] = `sid=${authToken}`;
        headers["Customer-Authorization"] = `Bearer ${authToken}`;
    }

    const reqData = await request.json();

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer.update_customer_bank_account`;

    const response = await fetch(`${url}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(reqData)
    });
    // const response = await fetch(`${url}`);
    const data = await response.json();
    // console.log('Checking calling url:', products);

    // Attach pagination keys directly to the array
    return NextResponse.json(data || {});
}