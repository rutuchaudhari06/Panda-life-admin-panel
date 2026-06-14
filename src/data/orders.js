// Panda Life — Orders dummy data
import { products } from './products';
import { customers } from './customers';

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
const rand = seededRandom(99);

const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const paymentMethods = ['Credit Card', 'UPI', 'PayPal', 'Cash on Delivery', 'Debit Card'];

function randomDate(start, end) {
  const date = new Date(start.getTime() + rand() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function statusTimeline(status) {
  const all = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const idx = {
    Pending: 0,
    Processing: 1,
    Shipped: 2,
    Delivered: 4,
    Cancelled: 1,
  }[status];

  if (status === 'Cancelled') {
    return [
      { label: 'Order Placed', done: true, date: '2026-05-01' },
      { label: 'Processing', done: true, date: '2026-05-02' },
      { label: 'Cancelled', done: true, date: '2026-05-03' },
    ];
  }

  return all.map((label, i) => ({
    label,
    done: i <= idx,
    date: i <= idx ? randomDate(new Date('2026-04-01'), new Date('2026-06-01')) : null,
  }));
}

export const orders = Array.from({ length: 30 }, (_, i) => {
  const customer = customers[Math.floor(rand() * customers.length)];
  const itemCount = Math.floor(rand() * 3) + 1;
  const items = Array.from({ length: itemCount }, () => {
    const product = products[Math.floor(rand() * products.length)];
    const qty = Math.floor(rand() * 3) + 1;
    return { name: product.name, image: product.image, price: product.price, qty };
  });
  const total = +items.reduce((sum, it) => sum + it.price * it.qty, 0).toFixed(2);
  const status = statuses[Math.floor(rand() * statuses.length)];

  return {
    id: `ORD-${5000 + i}`,
    customer: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    shippingAddress: customer.address,
    products: items,
    productSummary: items.length === 1 ? items[0].name : `${items[0].name} +${items.length - 1} more`,
    date: randomDate(new Date('2026-03-01'), new Date('2026-06-10')),
    total,
    status,
    paymentMethod: paymentMethods[Math.floor(rand() * paymentMethods.length)],
    timeline: statusTimeline(status),
  };
});

export const recentOrders = [...orders]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 6);
