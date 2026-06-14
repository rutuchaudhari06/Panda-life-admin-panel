// Panda Life — Reviews & Coupons dummy data
import { products } from './products';
import { customers } from './customers';

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
const rand = seededRandom(15);

const reviewTexts = [
  "Absolutely love this product! The bamboo quality is amazing and it feels so sturdy.",
  "Great eco-friendly alternative to plastic. Shipping was fast too.",
  "Good product overall, though the finish could be slightly smoother.",
  "Exceeded my expectations — beautifully crafted and very durable.",
  "Decent quality for the price, but packaging could be improved.",
  "My family loves it! We've replaced all our plastic items with these.",
  "Works well, exactly as described. Will buy again.",
  "The bamboo has a lovely natural smell and feels premium.",
  "Average experience, took a while to arrive but product is fine.",
  "Best purchase this year! Highly recommend to anyone going zero-waste.",
  "A bit smaller than I expected, but still good quality.",
  "Perfect gift idea — sustainable and stylish.",
  "Sturdy build and lightweight, ideal for travel.",
  "Color was slightly different from the photo, but quality is great.",
  "Five stars for sustainability and design!",
];

function randomDate(start, end) {
  const date = new Date(start.getTime() + rand() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

export const reviews = Array.from({ length: 15 }, (_, i) => {
  const product = products[Math.floor(rand() * products.length)];
  const customer = customers[Math.floor(rand() * customers.length)];
  const rating = Math.floor(rand() * 3) + 3; // 3-5
  return {
    id: `REV-${3000 + i}`,
    product: product.name,
    productImage: product.image,
    customer: customer.name,
    customerAvatar: customer.avatar,
    rating,
    text: reviewTexts[i % reviewTexts.length],
    date: randomDate(new Date('2026-02-01'), new Date('2026-06-10')),
    status: ['Pending', 'Approved', 'Approved', 'Pending', 'Rejected'][Math.floor(rand() * 5)],
  };
});

export const coupons = [
  { id: 'CPN-001', code: 'PANDA10', discount: '10%', expiry: '2026-12-31', usageLimit: 500, used: 213, status: 'Active' },
  { id: 'CPN-002', code: 'BAMBOO15', discount: '15%', expiry: '2026-09-30', usageLimit: 300, used: 287, status: 'Active' },
  { id: 'CPN-003', code: 'ECO20', discount: '20%', expiry: '2026-07-15', usageLimit: 200, used: 198, status: 'Active' },
  { id: 'CPN-004', code: 'WELCOME5', discount: '5%', expiry: '2026-12-31', usageLimit: 1000, used: 450, status: 'Active' },
  { id: 'CPN-005', code: 'SUMMER25', discount: '25%', expiry: '2026-06-01', usageLimit: 150, used: 150, status: 'Expired' },
];
