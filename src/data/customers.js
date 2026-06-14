// Panda Life — Customers dummy data

const firstNames = ['Aarav', 'Diya', 'Rohan', 'Isha', 'Kabir', 'Meera', 'Vikram', 'Ananya', 'Arjun', 'Priya', 'Sara', 'Nikhil', 'Tara', 'Dev', 'Riya', 'Aman', 'Neha', 'Karan', 'Pooja', 'Yash'];
const lastNames = ['Sharma', 'Patel', 'Mehta', 'Gupta', 'Kapoor', 'Reddy', 'Singh', 'Iyer', 'Nair', 'Joshi'];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
const rand = seededRandom(7);

function randomDate(start, end) {
  const date = new Date(start.getTime() + rand() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

export const customers = Array.from({ length: 20 }, (_, i) => {
  const first = firstNames[i % firstNames.length];
  const last = lastNames[Math.floor(rand() * lastNames.length)];
  const totalOrders = Math.floor(rand() * 12) + 1;

  const averageOrderValue = Math.floor(800 + rand() * 2200); // ₹800 - ₹3000
  const totalSpending = Math.round(totalOrders * averageOrderValue);

  return {
    id: `CUST-${2000 + i}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    phone: `+91 9${Math.floor(100000000 + rand() * 899999999)}`,
    totalOrders,
    totalSpending,
    joinDate: randomDate(new Date('2023-01-01'), new Date('2025-12-31')),
    address: `${Math.floor(rand() * 200) + 1}, Green Park Lane, Ahmedabad, Gujarat, India`,
    avatar: `https://i.pravatar.cc/100?img=${(i % 70) + 1}`,
  };
});
