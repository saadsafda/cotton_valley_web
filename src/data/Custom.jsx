import { RiArrowLeftRightLine, RiHeartLine, RiProfileLine, RiSearchLine, RiShoppingCartLine, RiUser3Line } from 'react-icons/ri';

export const footerUseFulLink = [
  { value: 'order', name: 'YourOrder' },
  { value: 'account', name: 'YourAccount' },
  { value: 'track-order', name: 'TrackOrder' },
  { value: 'wishlist', name: 'YourWishlist' },
  { value: 'search', name: 'Search' },
  { value: 'faq', name: 'FAQ' },
];

export const optionList = [
  { id: 1, path: '/', customClass: 'user-icon search-icon', icon: <RiUser3Line /> },
  { id: 2, path: '/', customClass: 'search-box search-icon', icon: <RiSearchLine /> },
  { id: 3, path: '/compare', icon: <RiArrowLeftRightLine /> },
  { id: 4, path: '/wishlist', customClass: 'swap-icon', icon: <RiHeartLine /> },
  { id: 5, customClass: 'bag-icon', icon: <RiShoppingCartLine />, isBadge: true },
];

export const categoryTags = [
  { id: 1, title: 'ValueOfTheDay', path: '/' },
  { id: 2, title: 'Top50Offers', path: '/' },
  { id: 3, title: 'NewArrivals', path: '/' },
];

export const optionListMinimal = [
  { id: 1, icon: <RiSearchLine />, customClass: 'search-box search-icon' },
  { id: 2, path: '/compare', icon: <RiArrowLeftRightLine /> },
  { id: 3, path: '/wishlist', icon: <RiHeartLine />, customClass: 'swap-icon' },
  { id: 4, icon: <RiShoppingCartLine />, customClass: 'bag-icon', isBadge: true },
];

export const filterPrice = [
  {
    id: 1,
    price: 10,
    text: 'Below',
    value: '10',
  },
  {
    id: 2,
    minPrice: 10,
    maxPrice: 20,
    value: '0-20',
  },
  {
    id: 3,
    minPrice: 20,
    maxPrice: 40,
    value: '20-40',
  },
  {
    id: 4,
    minPrice: 40,
    maxPrice: 60,
    value: '40-60',
  },
  {
    id: 5,
    minPrice: 60,
    maxPrice: 80,
    value: '60-80',
  },
  {
    id: 6,
    minPrice: 80,
    maxPrice: 100,
    value: '80-100',
  },
  {
    id: 7,
    price: 100,
    text: 'Above',
    value: '100',
  },
];

export const filterPCSPrice = [
  {
    id: 1,
    price: 0.5,
    text: 'Below',
    value: '0.5',
  },
  {
    id: 2,
    minPrice: 0.5,
    maxPrice: 1,
    value: '0-01',
  },
  {
    id: 3,
    minPrice: 2,
    maxPrice: 4,
    value: '2-4',
  },
  {
    id: 4,
    minPrice: 4,
    maxPrice: 6,
    value: '4-6',
  },
  {
    id: 5,
    minPrice: 6,
    maxPrice: 8,
    value: '6-8',
  },
  {
    id: 6,
    minPrice: 8,
    maxPrice: 10,
    value: '8-10',
  },
  {
    id: 7,
    price: 10,
    text: 'Above',
    value: '10',
  },
];

export const filterSort = [
  {
    value: 'asc',
    label: 'Ascending Order',
  },
  {
    value: 'desc',
    label: 'Descending Order',
  },
  {
    value: 'low-high',
    label: 'Low - High Price',
  },
  {
    value: 'high-low',
    label: 'High - Low Price',
  },
  {
    value: 'a-z',
    label: 'A - Z Order',
  },
  {
    value: 'z-a',
    label: 'Z - A Order',
  },
  {
    value: 'discount-high-low',
    label: '% Off - Hight To Low',
  },
];

export const blogSkeleton = [
  { xs: 6 },
  { xs: 7 },
  { xs: 10 },
  { xs: 9 },
  { xs: 7 },
  { xs: 6 },
  { xs: 7 },
  { xs: 11 },
  { xs: 9 },
  { xs: 7 },
  { xs: 8 },
  { xs: 7 },
  { xs: 11 },
  { xs: 9 },
  { xs: 7 },
  { xs: 6 },
  { xs: 8 },
  { xs: 4 },
  { xs: 9 },
  { xs: 7 },
];
