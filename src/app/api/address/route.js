import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { address } = await request.json();

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.address.add_address`;
    const cookieStore = await cookies();
    const authToken = cookieStore.get("uat")?.value;

    let headers = {
        "Content-Type": "application/json",
    }
    if (authToken) {
        headers["Cookie"] = `sid=${authToken}`;
        headers["Customer-Authorization"] = `Bearer ${authToken}`;
    }

    

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ address }),
    });

    const data = await response.json();
    return NextResponse.json(data?.message);
}

export async function PUT(request) {
    const { address } = await request.json();

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.address.update_address`;
    const cookieStore = await cookies();
    const authToken = cookieStore.get("uat")?.value;

    let headers = {
        "Content-Type": "application/json",
    }
    if (authToken) {
        headers["Cookie"] = `sid=${authToken}`;
        headers["Customer-Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ address }),
    });

    const data = await response.json();

    return NextResponse.json(data?.message);
}

export async function DELETE(request) {
    const { id } = await request.json();

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.address.delete_address`;
    const cookieStore = await cookies();
    const authToken = cookieStore.get("uat")?.value;

    let headers = {
        "Content-Type": "application/json",
    }
    if (authToken) {
        headers["Cookie"] = `sid=${authToken}`;
        headers["Customer-Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({ address_id: id }),
    });

    const data = await response.json();
    return NextResponse.json(data?.message);
}

export async function GET(request) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.address.get_addresses`;
    const cookieStore = await cookies();
    const authToken = cookieStore.get("uat")?.value;

    let headers = {
        "Content-Type": "application/json",
    }
    if (authToken) {
        headers["Cookie"] = `sid=${authToken}`;
        headers["Customer-Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, {
        method: "GET",
        headers: headers,
    });

    const data = await response.json();
    return NextResponse.json(data?.message || []);
}