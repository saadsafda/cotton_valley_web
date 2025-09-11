import paris from "../../public/assets/images/themes/01.jpg";
import tokyo from "../../public/assets/images/themes/02.jpg";
import osaka from "../../public/assets/images/themes/03.jpg";
import rome from "../../public/assets/images/themes/04.jpg";
import madrid from "../../public/assets/images/themes/05.jpg";
import berlin from "../../public/assets/images/themes/06.jpg";
import denver from "../../public/assets/images/themes/07.jpg";
import comingSoon from "../../public/assets/images/themes/08.jpg";

export const headerMenu = [
  {
    id: 1,
    title: "HOME",
    customChildren: false,
    path: "/theme/paris",
  },
  {
    id: 2,
    title: "SHOP",
    styleType: "image",
    customChildren: true,
    children: [],
  },
  {
    id: 3,
    title: "Collection",
    styleType: "link",
    slider: "product",
    customChildren: true,
    children: [
      {
        column: [
          {
            title: "CollectionLayouts",
            type: "sub",
          },
          {
            title: "CollectionLeftSidebar",
            path: "collections",
            params: { layout: "collection_left_sidebar" },
            label: "Hot",
            labelClass: "warning-label",
          },
          {
            title: "CollectionRightSidebar",
            path: "collections",
            params: { layout: "collection_right_sidebar" },
          },
          {
            title: "CollectionNoSidebar",
            path: "collections",
            params: { layout: "collection_no_sidebar" },
          },
          {
            title: "Collection3Grid",
            path: "collections",
            params: { layout: "collection_3_grid" },
          },
          {
            title: "Collection4Grid",
            path: "collections",
            params: { layout: "collection_4_grid" },
            label: "New",
          },
          {
            title: "Collection5Grid",
            path: "collections",
            params: { layout: "collection_5_grid" },
          },
          {
            title: "CollectionListView",
            path: "collections",
            params: { layout: "collection_list_view" },
          },
        ],
      },
      {
        column: [
          {
            title: "CollectionLayouts",
            type: "sub",
          },
          {
            title: "CategorySlider",
            path: "collections",
            params: { layout: "collection_category_slider" },
          },
          {
            title: "CategorySidebar",
            path: "collections",
            label: "New",
            params: { layout: "collection_category_sidebar" },
          },
          {
            title: "CategoryBanner",
            path: "collections",
            params: { layout: "collection_banner" },
          },
          {
            title: "OffCanvasFilter",
            path: "collections",
            params: { layout: "collection_offcanvas_filter" },
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "INFORMATION",
    children: [
      {
        title: "Privacy Policy",
        path: "/privacy-policy",
      },
      {
        title: "Shipping & Returns",
        path: "/shipping-and-returns",
      },
      {
        title: "Terms & Conditions",
        path: "/terms-and-conditions",
      },
    ],
  },
  {
    id: 5,
    title: "ABOUT US",
    customChildren: false,
    path: "/about-us",
  },
  {
    id: 6,
    title: "CONTACT US",
    customChildren: false,
    path: "/contact-us",
  },
  {
    id: 7,
    title: "EVENTS",
    badge: "New",
    styleType: "link",
    customChildren: true,
    slider: "banner_landscape",
    children: [
      {
        column: [
          {
            title: "PopularCategories",
            type: "sub",
          },
          {
            title: "VegetablesFruits",
            type: "link",
            path: "collections",
            params: { category: "vegetables-fruits" },
          },
          {
            title: "BiscuitsSnacks",
            type: "link",
            label: "new",
            path: "collections",
            params: { category: "biscuits-snacks" },
          },
          {
            title: "DailyBreakfast",
            type: "link",
            label: "new",
            path: "collections",
            params: { category: "daily-breakfast" },
          },
          {
            title: "TrendyFashion",
            type: "link",
            path: "collections",
            params: { category: "fashion" },
          },
          {
            title: "FurnitureDecore",
            type: "link",
            path: "collections",
            params: { category: "furniture" },
          },
        ],
      },
      {
        column: [
          {
            title: "PopularTags",
            type: "sub",
          },
          {
            title: "BeautyProducts",
            type: "link",
            path: "collections",
            params: { tag: "beauty" },
          },
          {
            title: "ElectronicsAccessories",
            type: "link",
            label: "hot",
            labelClass: "warning-label",
            path: "collections",
            params: { tag: "electronics" },
          },
          {
            title: "PetShop",
            type: "link",
            path: "collections",
            params: { tag: "pet-shop" },
          },
          {
            title: "MilkDairyProducts",
            type: "link",
            path: "collections",
            params: { tag: "milk-dairy-products" },
          },
          {
            title: "Sports",
            type: "link",
            path: "collections",
            params: { tag: "sports" },
          },
        ],
      },
      {
        column: [
          {
            title: "EmailTemplate",
            type: "sub",
          },
          {
            title: "WelcomeTemplate",
            type: "external_link",
            path: "https://themes.pixelstrap.com/fastkart/email-templete/welcome.html",
          },
          {
            title: "Abandonment",
            type: "external_link",
            label: "hot",
            labelClass: "warning-label",
            path: "https://themes.pixelstrap.com/fastkart/email-templete/abandonment-email.html",
          },
          {
            title: "OfferTemplate",
            type: "external_link",
            path: "https://themes.pixelstrap.com/fastkart/email-templete/offer-template.html",
          },
          {
            title: "OrderSuccess",
            type: "external_link",
            label: "new",
            path: "https://themes.pixelstrap.com/fastkart/email-templete/order-success.html",
          },
          {
            title: "ResetPassword",
            type: "external_link",
            path: "https://themes.pixelstrap.com/fastkart/email-templete/reset-password.html",
          },
        ],
      },
      {
        column: [
          {
            title: "InvoiceTemplate",
            type: "sub",
          },
          {
            title: "InvoiceTemplate1",
            type: "external_link",
            path: "https://themes.pixelstrap.com/fastkart/invoice/invoice-1.html",
          },
          {
            title: "InvoiceTemplate2",
            type: "external_link",
            label: "hot",
            path: "https://themes.pixelstrap.com/fastkart/invoice/invoice-2.html",
          },
          {
            title: "InvoiceTemplate3",
            type: "external_link",
            path: "https://themes.pixelstrap.com/fastkart/invoice/invoice-3.html",
          },
        ],
      },
    ],
  },
];
