// import product from './product.json'
// import { NextResponse } from "next/server";

// export async function GET(request) {

//     const searchParams = request?.nextUrl?.searchParams
//     const queryCategory = searchParams.get('category')
//     const querySortBy = searchParams.get('sortBy')
//     const querySearch = searchParams.get('search')
//     let products = product?.data || []
//     // Note:- we have covered only few filters as demo purpose

//     if (querySortBy || queryCategory || querySearch) {
//         products = product?.data?.filter(product => (
//             queryCategory && product?.categories?.length &&
//             product?.categories?.some(category => queryCategory?.split(',')?.includes(category.slug))
//         ))
//         products = products.length ? products : product?.data;

//         if (querySortBy === 'asc') {
//             products = products.sort((a, b) => {
//                 if (a.id < b.id) {
//                     return -1;
//                 } else if (a.id > b.id) {
//                     return 1;
//                 }
//                 return 0;
//             })
//         } else if (querySortBy === 'desc') {
//             products = products.sort((a, b) => {
//                 if (a.id > b.id) {
//                     return -1;
//                 } else if (a.id < b.id) {
//                     return 1;
//                 }
//                 return 0;
//             })
//         } else if (querySortBy === 'a-z') {
//             products = products.sort((a, b) => {
//                 if (a.name < b.name) {
//                     return -1;
//                 } else if (a.name > b.name) {
//                     return 1;
//                 }
//                 return 0;
//             })
//         } else if (querySortBy === 'z-a') {
//             products = products.sort((a, b) => {
//                 if (a.name > b.name) {
//                     return -1;
//                 } else if (a.name < b.name) {
//                     return 1;
//                 }
//                 return 0;
//             })
//         } else if (querySortBy === 'low-high') {
//             products = products.sort((a, b) => {
//                 if (a.sale_price < b.sale_price) {
//                     return -1;
//                 } else if (a.price > b.price) {
//                     return 1;
//                 }
//                 return 0;
//             })
//         } else if (querySortBy === 'high-low') {
//             products = products.sort((a, b) => {
//                 if (a.sale_price > b.sale_price) {
//                     return -1;
//                 } else if (a.price < b.price) {
//                     return 1;
//                 }
//                 return 0;
//             })
//         }

//         if (querySearch) {
//             products = products.filter(product => product.name.toLowerCase().includes(querySearch.toLowerCase()))
//         }
//     }


//     products = products?.length ? products : product?.data;
//     return NextResponse.json(products)
// }

import { NextResponse } from "next/server";

export async function GET(request) {
    const searchParams = request?.nextUrl?.searchParams;

    const ids = searchParams.get("ids");
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const sortBy = searchParams.get("sortBy");
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    // console.log(product_ids, "search Params checking");

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.products.get_all_products`;
    const params = new URLSearchParams({ ids, category, subcategory, sortBy, search, page });


    console.log('Checking calling url:', `${url}?${params.toString()}`);
    const response = await fetch(`${url}?${params.toString()}`);
    // const response = await fetch(`${url}`);


    const data = await response.json();
    const products = data?.message?.data || [];

    // Attach pagination keys directly to the array
    products && products.length > 0 && (products[0].total = data?.message?.total);
    products && products.length > 0 && (products[0].current_page = data?.message?.current_page || 1);
    products && products.length > 0 && (products[0].per_page = data?.message?.per_page || 30);
    return NextResponse.json(products);
}
