import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/method/cotton_valley.api.testimonial.get_testimonials';
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data?.message?.data || []);
  } catch (error) {
    return NextResponse.error();
  }
}