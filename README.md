# Stripe Payment Flow Practice (React + Node)

## 🔗 Live Demo
You can preview the project, hosted here: [dialogix-platform.vercel.app](https://dialogix-platform.vercel.app/)

This project is a **practice implementation** of a payment flow inspired.
It uses **React (frontend)** and **Node.js (backend)** to simulate the checkout process with **Stripe Payment Elements**.

---

## Screenshots

### Plan Page

![Plan Page Screenshot](./assets/Screenshot%201.avif)

### Payment Page

![Payment Page Screenshot](./assets/Screenshot%202.avif)

---

## Project Structure

```
stripe-practice/
├── backend/           # Node.js backend server
│   ├── index.js
│   └── package.json
├── frontend/          # React frontend (Vite)
│   ├── src/
│   │   ├── assets/
│   │   ├── component/
│   │   ├── pages/
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── LandingPage.tsx
│   │   │   └── PlansPage.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/...
cd stripe-practice
```

### 2. Start the backend

```bash
cd backend
npm install
node index.js
```

The backend will start on its configured port (check `index.js` for details).

### 3. Start the frontend

Open a **new terminal** in the root folder:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```
Local:   http://localhost:5173
Network: use --host to expose
```

---

## Environment Variables

Configure your backend `.env`:

```env
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXX
```
