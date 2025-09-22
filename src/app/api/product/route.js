import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {

    // Read token from cookies
    const cookieStore = await cookies();
    const authToken = cookieStore.get("uat")?.value;

    let headers = {
        "Content-Type": "application/json",
    }
    if (authToken) {
        headers["Cookie"] = `sid=${authToken}`;
        headers["Authorization"] = `token ${authToken}`;
    }

    const searchParams = request?.nextUrl?.searchParams;

    const ids = searchParams.get("ids");
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const sortBy = searchParams.get("sortBy");
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const attribute = searchParams.get("attribute");
    // console.log(product_ids, "search Params checking");

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.products.get_all_products`;
    const params = new URLSearchParams({ ids, category, subcategory, sortBy, search, page, attribute });

    const response = await fetch(`${url}?${params.toString()}`, {
        method: "GET",
        headers: headers,
    });
    // const response = await fetch(`${url}`);


    const data = await response.json();
    const products = data?.message?.data || [];
    // console.log('Checking calling url:', products);

    // Attach pagination keys directly to the array
    products && products.length > 0 && (products[0].total = data?.message?.total);
    products && products.length > 0 && (products[0].current_page = data?.message?.current_page || 1);
    products && products.length > 0 && (products[0].per_page = data?.message?.per_page || 30);
    products && products.length > 0 && (products[0].from = data?.message?.from || 1);
    products && products.length > 0 && (products[0].to = data?.message?.to || 30);
    return NextResponse.json(products);
}
