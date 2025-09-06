# 🚀 Nexus Desktop – Admin Panel

A modern, role-based admin dashboard for Nexus Desktop POS, built with **Next.js 15**, **Tailwind CSS**, and **TypeScript**. The dashboard includes secure admin login, access control via reusable table components, and an interactive analytics interface.

---

## ✨ Features

- 🔐 **Admin Login Flow**
- 🧭 **Role-based Routing**
- 🧱 **Reusable UI Components (Table, Button, Input)**
- 📊 **Analytics Dashboard with Charts & Summary Cards**
- ✅ **User Access Table with Approve/Reject Actions**
- 🌙 **Responsive Design with Dark/Light Mode Friendly Theme**

---

## 🛠 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide React Icons](https://lucide.dev/)
- [Recharts (for charts)](https://recharts.org/en-US/)

---

## 🧩 Reusable Components

| Component          | Description                       |
| ------------------ | --------------------------------- |
| `Table.tsx`        | Reusable, styled table component  |
| `Button.tsx`       | Consistent button design system   |
| `Input.tsx`        | Input field with styles and props |
| `SummaryCards.tsx` | Key metrics (sales, orders, etc.) |
| `SalesCharts.tsx`  | Bar chart visualizing sales data  |
| `AdminSidebar.tsx` | Collapsible admin sidebar         |
| `Navbar.tsx`       | Top nav bar with logout & email   |

---

## 📂 Folder Structure

```
nexus-desktop/
├── src/
│   ├── app/
│   │   ├── (auth)/login/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── access-control/page.tsx
│   │   │   └── analytics/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── Navbar.tsx
│   │   ├── analytics/
│   │   │   ├── SalesCharts.tsx
│   │   │   ├── SummaryCards.tsx
│   │   │   └── AnalyticsTable.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Table.tsx
│   ├── lib/utils.ts
│   ├── middleware.ts
├── public/
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## ⚙️ Workflow

- User lands on landing page and clicks "Get Started"
- Redirects to login screen
- On login success → Admin Dashboard
- Sidebar links: Dashboard, Access Control, Analytics
- Top navbar displays admin email and logout
- Users Page: Table with access requests (Approve/Reject)
- Analytics Page: Sales Bar Chart + Summary Cards
- Logout redirects back to home

---

## 📈 Analytics

The analytics page includes:

- Sales chart (Daily, Weekly, Monthly, Top Products)
- Summary cards:
  - Total Sales
  - Orders
  - Sales in Last 30 Days
  - Products Sold

---
