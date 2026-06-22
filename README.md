# 🎍 Panda Life — Admin Dashboard

A modern, production-ready admin dashboard for **Panda Life**, a fictional eco-friendly bamboo products brand. Built as a frontend-only portfolio project using React, Tailwind CSS, and Recharts.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)

## Features

- **11 pages** — Dashboard, Products, Categories, Orders, Customers, Inventory, Reviews, Coupons, Analytics, Settings, Profile
- **Interactive UI** — search, filters, modals, forms, add/edit/delete actions, order timelines, star ratings
- **Charts** — area, bar, line, and pie charts via Recharts
- **Realistic dummy data** — 50 products, 30 orders, 20 customers, 15 reviews, 5 coupons
- **Fully responsive** — mobile, tablet, and desktop layouts
- **Reusable components** — Sidebar, Navbar, Modal, StatusBadge, Pagination, ChartCard, and more

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS 3 | Styling |
| React Router v7 | Client-side routing |
| Recharts | Data visualizations |
| Lucide React | Icons |

## Getting Started

```bash
# 1. Unzip the project
unzip panda-life-dashboard.zip && cd panda-life

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Sidebar.jsx
│   ├── Navbar.jsx
│   ├── Modal.jsx
│   ├── StatusBadge.jsx
│   ├── Pagination.jsx
│   └── ...
├── pages/            # One file per dashboard page
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   ├── Orders.jsx
│   └── ...
├── data/             # Dummy data (products, orders, customers, etc.)
└── App.jsx           # Router setup
```

## Pages Overview

| Page | Description |
|---|---|
| Dashboard | KPI cards, sales charts, recent orders, low stock alerts |
| Products | Table with search/filter, add/edit/delete via modal |
| Categories | Card grid with CRUD |
| Orders | Order table with status filter and detailed order modal |
| Customers | Customer table with profile & order history modal |
| Inventory | Stock levels with in-stock / low-stock / out-of-stock status |
| Reviews | Review moderation with star ratings and approve/reject actions |
| Coupons | Coupon management with add/edit/delete |
| Analytics | Revenue, orders, customer growth, and category performance charts |
| Settings | Pre-filled store configuration form |
| Profile | Admin profile with edit and password change modals |
