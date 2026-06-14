// Panda Life — Analytics & chart dummy data

export const monthlySales = [
  { month: 'Jan', sales: 42000, orders: 320 },
  { month: 'Feb', sales: 38500, orders: 290 },
  { month: 'Mar', sales: 51000, orders: 410 },
  { month: 'Apr', sales: 47800, orders: 380 },
  { month: 'May', sales: 62000, orders: 470 },
  { month: 'Jun', sales: 58500, orders: 445 },
  { month: 'Jul', sales: 67200, orders: 510 },
  { month: 'Aug', sales: 71500, orders: 540 },
  { month: 'Sep', sales: 65300, orders: 495 },
  { month: 'Oct', sales: 78900, orders: 600 },
  { month: 'Nov', sales: 84200, orders: 645 },
  { month: 'Dec', sales: 96500, orders: 720 },
];

export const ordersTrend = monthlySales.map(m => ({ month: m.month, orders: m.orders }));

export const customerGrowth = [
  { month: 'Jan', customers: 120 },
  { month: 'Feb', customers: 145 },
  { month: 'Mar', customers: 180 },
  { month: 'Apr', customers: 210 },
  { month: 'May', customers: 265 },
  { month: 'Jun', customers: 310 },
  { month: 'Jul', customers: 365 },
  { month: 'Aug', customers: 420 },
  { month: 'Sep', customers: 470 },
  { month: 'Oct', customers: 540 },
  { month: 'Nov', customers: 605 },
  { month: 'Dec', customers: 690 },
];

export const categoryPerformance = [
  { name: 'Bamboo Bottles', value: 28, revenue: 145000 },
  { name: 'Bamboo Kitchenware', value: 32, revenue: 168000 },
  { name: 'Bamboo Toothbrushes', value: 15, revenue: 62000 },
  { name: 'Bamboo Straws', value: 12, revenue: 48000 },
  { name: 'Bamboo Accessories', value: 13, revenue: 55000 },
];

export const PIE_COLORS = ['#549144', '#72ab63', '#98c68b', '#c0ddb8', '#3f7333'];
