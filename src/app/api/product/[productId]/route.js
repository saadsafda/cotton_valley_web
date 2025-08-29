// import { NextResponse } from 'next/server';
// import product from '../product.json'

// export async function GET(_, { params }) {
//     const productId = params.productId

//     const productObj = product.data?.find((elem) => elem.slug == productId)

//     return NextResponse.json(productObj)
// }

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const productId = params.productId;

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.products.get_product?product_id=${productId}`;

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        cache: "no-store", // avoid caching
    });

    const data = await response.json();

    return NextResponse.json(data.message || {});
}
