import { NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    // You can add authentication logic here if needed
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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.customer_price.get_price_filters`,
      {
        method: 'GET',
        headers: headers,
        cache: 'no-store', // Disable caching for fresh data
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch price filters');
    }

    const data = await response.json();

    
    
    return NextResponse.json(data.message || data, { status: 200 });
  } catch (error) {
    console.error('Error fetching price filters:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: error.message || 'Failed to fetch price filters' 
      },
      { status: 500 }
    );
  }
}
