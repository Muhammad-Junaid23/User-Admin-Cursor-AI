# 💻 Nexus Desktop – Modular POS Platform

A **modern, modular POS (Point of Sale)** web platform built with **Next.js 15**, **Tailwind CSS**, and **TypeScript**.  
Nexus Desktop is designed for shopkeepers and small businesses to manage sales, products, and analytics — with role-based dashboards for **Admins** and **Users**, dynamic POS modules, and offline-first PWA support.

---

## 🚀 Overview

Nexus Desktop is a **progressive web app (PWA)** that combines the simplicity of retail POS systems with the scalability of enterprise dashboards.  
Each business type (Pharmacy, Grocery, etc.) can activate its own modules — making Nexus Desktop highly **customizable** and **modular**.

---

## ✨ Core Features

### 🧩 POS & User Features
- 🛒 **Modular Product Grid** (Dynamic per business type)
- 🧠 **Smart Cart System** with context state & toast notifications  
- 💳 **Billing Summary** with quantity management and totals  
- 📦 **Product Filtering** by category/sub-category  
- ⚡ **Fast Navigation** between modules (state resets on module switch)  
- 📱 **Responsive UI** for desktop and tablet views  

### 🧑‍💻 Admin Panel Features
- 🔐 **Secure Login & Logout Flow**
- 🧭 **Role-Based Access Control**
- 🧱 **Reusable Components** (Table, Input, Button, etc.)
- 📊 **Interactive Analytics Dashboard**
- ✅ **User Access Control Table** (Approve / Reject)
- 🌙 **Light & Dark Mode Friendly**

### 📈 Analytics & Reporting
- Sales tracking (Daily / Weekly / Monthly / Top Products)
- Summary cards for quick insights:
  - Total Sales  
  - Orders  
  - Sales in last 30 days  
  - Products Sold  
- Dynamic charts powered by **Recharts**

---

## 🛠 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js 15 (App Router)** | Modern React framework |
| **Tailwind CSS** | Utility-first responsive styling |
| **TypeScript** | Type safety and maintainability |
| **Lucide React Icons** | Elegant and consistent icon set |
| **Recharts** | Interactive analytics visualization |
| **Framer Motion** | Smooth UI animations and transitions |
| **Serwist** | PWA + offline caching support |

---

## 🧩 Modular Architecture

| Module | Description |
|---------|--------------|
| **CartContext** | Global cart state management |
| **ProductCard** | Displays product info & image |
| **CartSidebar** | Displays added items, total & checkout |
| **AnalyticsTable** | Tabular view of sales data |
| **SummaryCards** | Highlights metrics (sales, orders, etc.) |
| **SalesCharts** | Dynamic charts for performance tracking |
| **AdminSidebar / Navbar** | Navigation for admin routes |

---

## 📂 Folder Structure

```
nexus-desktop/
├── src/
│   ├── app/
│   │   ├── (auth)/login/page.tsx
│   │   ├── (user)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── modules/[module]/page.tsx
│   │   │   └── cart/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── access-control/page.tsx
│   │   │   └── analytics/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── UserSidebar.tsx
│   │   ├── analytics/
│   │   │   ├── SalesCharts.tsx
│   │   │   ├── SummaryCards.tsx
│   │   │   └── AnalyticsTable.tsx
│   │   ├── pos/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ItemsGrid.tsx
│   │   │   ├── CartSidebar.tsx
│   │   │   └── CartContext.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Table.tsx
│   ├── lib/utils.ts
│   ├── middleware.ts
│   └── context/
│       └── AuthContext.tsx
├── public/
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## ⚙️ Workflow

1. **Landing Page → Login**
2. **Login (Admin/User)** → Redirect to relevant dashboard
3. **Admin Dashboard**
   - View Analytics
   - Manage Users
   - Approve Access
4. **User Dashboard**
   - View product modules
   - Add to cart
   - Generate bills
5. **Logout** → Back to landing page

---

## 📊 Sample Analytics Page

- **Summary Cards:** Key metrics (sales, orders, products)
- **Sales Chart:** Dynamic filters (Last Month, Daily, Weekly, Top Products)
- **Analytics Table:** Data-driven breakdown of performance

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Muhammad-Junaid23/Nexus-Desktop.git

# Navigate to project
cd nexus-desktop

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit **http://localhost:3000**

---

## 🌍 Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_API_URL=your_backend_api
NEXTAUTH_SECRET=your_secret
```

---

## 📱 Progressive Web App (PWA)

- Fully offline capable (via **Serwist**)
- Can be installed on desktop
- Auto-caches static assets for speed

---

## 🧑‍💻 Author

**Muhammad Junaid**  
Junior MERN / Next.js Developer  
[GitHub](https://github.com/Muhammad-Junaid23) • [LinkedIn](https://www.linkedin.com/in/mjunaid23)

---

## ⭐ Future Improvements
- Multi-store management  
- Invoice printing & PDF exports  
- Real-time sync between devices  
- Cloud database integration (Supabase / Firebase)
