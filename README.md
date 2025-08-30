# 🧵 Tailor Shop App

A full-stack application to manage a tailor shop’s workflow.  
This system allows customers to place orders with measurements and design selections, and lets tailors manage those orders, update their statuses, and notify customers via email in realtime.

---

## ✨ Features
- 👤 **Customer Orders** – Place new tailoring orders with measurements & design selections.
- 🖼 **Design Uploads** – Customers can upload/select multiple designs for an order.
- 📏 **Measurements** – Capture detailed measurements per customer.
- 📊 **Dashboard** – Tailors can view and manage all customer orders.
- 📩 **Email Notifications** – Customers receive automatic status updates (Accepted, Rejected, Done).
- 🔒 **Role-Based Access** – Separate dashboards for customers and tailors.
- ⚡ **Modern Stack** – Built with Next.js, Prisma, and Nodemailer.

---

## 🛠 Tech Stack
- **Frontend:** Next.js 15 (App Router) + React 19 + TailwindCSS 4 
- **Backend:** Next.js API Routes  
- **Database:** MongoDB (via Prisma ORM)  
- **Auth & Permissions:** JWT   
- **Email:** Nodemailer + SMTP (Mailtrap for testing)
- **Tools:** Zod + Axios + Argon2

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/tailor-shop-app.git
cd tailor-shop-app
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment Variables
```bash
# Database
DATABASE_URL="your database URL"

# JWT
JWT_SECRET="your-secret-key"

# SMTP (Mailtrap or Gmail)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"
SMTP_FROM="Tailor Shop <no-reply@tailorshop.local>"
```

### 4. Setup the Database
```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Run the App
```bash
npm run dev
```

---
Made with ❤️ by Sabesh
