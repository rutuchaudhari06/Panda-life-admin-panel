// Panda Life — Product catalog dummy data

const productTemplates = [
  { name: 'Bamboo Bottle', category: 'Bamboo Bottles', basePrice: 899, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80' },
  { name: 'Bamboo Toothbrush', category: 'Bamboo Toothbrushes', basePrice: 199, img: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&q=80' },
  { name: 'Bamboo Straw Kit', category: 'Bamboo Straws', basePrice: 349, img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=300&q=80' },
  { name: 'Bamboo Mug', category: 'Bamboo Kitchenware', basePrice: 499, img: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=300&q=80' },
  { name: 'Bamboo Cutlery Set', category: 'Bamboo Kitchenware', basePrice: 599, img: 'https://images.unsplash.com/photo-1584346133934-a3afd2a72d29?w=300&q=80' },
  { name: 'Bamboo Lunch Box', category: 'Bamboo Kitchenware', basePrice: 999, img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&q=80' },
  { name: 'Bamboo Phone Stand', category: 'Bamboo Accessories', basePrice: 449, img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&q=80' },
  { name: 'Bamboo Cutting Board', category: 'Bamboo Kitchenware', basePrice: 799, img: 'https://images.unsplash.com/photo-1594228204405-d8d1167e9b14?w=300&q=80' },
  { name: 'Bamboo Comb', category: 'Bamboo Accessories', basePrice: 149, img: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&q=80' },
  { name: 'Bamboo Coasters Set', category: 'Bamboo Accessories', basePrice: 299, img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=300&q=80' },
];

const adjectives = ['Classic', 'Premium', 'Eco', 'Travel', 'Compact', 'Deluxe', 'Natural', 'Minimal', 'Family', 'Pro'];
const variants = ['500ml', 'Soft Bristle', 'Set of 4', '350ml', '4-Piece', 'Large', 'Mini', 'XL', 'Standard', 'Double Wall'];

export const categories = [
  { id: 'cat1', name: 'Bamboo Bottles', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80', description: 'Reusable bamboo water bottles for everyday hydration.' },
  { id: 'cat2', name: 'Bamboo Toothbrushes', image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80', description: 'Biodegradable bamboo toothbrushes for a plastic-free routine.' },
  { id: 'cat3', name: 'Bamboo Kitchenware', image: 'https://images.unsplash.com/photo-1584346133934-a3afd2a72d29?w=400&q=80', description: 'Mugs, cutlery, lunch boxes and cutting boards for sustainable kitchens.' },
  { id: 'cat4', name: 'Bamboo Straws', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80', description: 'Reusable straw kits with cleaning brushes and pouches.' },
  { id: 'cat5', name: 'Bamboo Accessories', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80', description: 'Phone stands, combs, coasters and other home accessories.' },
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rand = seededRandom(42);

export const products = Array.from({ length: 50 }, (_, i) => {
  const tmpl = productTemplates[i % productTemplates.length];
  const adj = adjectives[Math.floor(rand() * adjectives.length)];
  const variant = variants[Math.floor(rand() * variants.length)];
  const stock = Math.floor(rand() * 200);
  const price = +(tmpl.basePrice + rand() * 10).toFixed(2);
  return {
    id: `PROD-${1000 + i}`,
    name: `${adj} ${tmpl.name} ${variant}`,
    category: tmpl.category,
    price,
    stock,
    minStock: 15,
    status: stock > 0 ? 'Active' : 'Inactive',
    image: tmpl.img,
    description: `The ${adj} ${tmpl.name} (${variant}) is crafted from 100% organic bamboo, designed to reduce plastic waste while bringing natural style to your daily routine.`,
    sold: Math.floor(rand() * 500) + 10,
  };
});

export const lowStockProducts = products.filter(p => p.stock <= p.minStock);

export const topSellingProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);
