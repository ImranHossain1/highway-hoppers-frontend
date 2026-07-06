<div align="center">

# 🚌 Highway Hoppers — Frontend

**A modern bus ticket booking web app for travel across Bangladesh.**

Built with Next.js 16, React 19, Redux Toolkit & Ant Design — featuring interactive seat selection, role-based dashboards, profile management with image upload, and a searchable route finder.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Ant Design](https://img.shields.io/badge/Ant_Design-5-0170FE?logo=antdesign&logoColor=white)](https://ant.design/)

**Live Site:** https://highway-hoppers-frontend.vercel.app &nbsp;·&nbsp; **API:** https://highway-hoppers-backend.onrender.com/api/v1

</div>

---

## ✨ Features

- **Route finder** — search by origin, destination and date across all 64 districts of Bangladesh
- **Interactive seat map** — pick seats visually with live availability and instant fare totals
- **Role-based dashboards** — tailored views for Admin, Driver and Traveller
- **Profile management** — edit details and upload a profile photo
- **Booking lifecycle** — book, confirm, cancel; view pending & completed journeys
- **Ratings & reviews** — rate completed trips with a polished review flow
- **Admin tools** — manage buses, drivers, schedules and bookings
- **JWT auth** with automatic token refresh via Axios interceptors
- **Responsive, themed UI** built on a cohesive design-token system

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 |
| Language | TypeScript |
| State / Data | Redux Toolkit · RTK Query |
| UI | Ant Design 5 · CSS Modules |
| Forms | React Hook Form · Yup |
| HTTP | Axios (with auth interceptors) |
| Auth | JWT (decoded client-side via `jwt-decode`) |

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- The [backend API](https://github.com/ImranHossain1/highway-hoppers-backend) running (locally or hosted)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
echo 'NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1' > .env.local

# 3. Start the dev server
npm run dev
```

Open **http://localhost:3000**.

## 🔐 Environment Variables

Create a `.env.local` file:

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the backend API | `http://localhost:5000/api/v1` |

> In production this points to the deployed backend, e.g. `https://highway-hoppers-backend.onrender.com/api/v1`.

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint the codebase |

## 🗂️ Project Structure

```
src/
├─ app/
│  ├─ (public)/         # home, login, sign-up, book-now
│  ├─ admin/            # admin dashboard (buses, drivers, schedules, bookings)
│  ├─ driver/           # driver dashboard
│  └─ user/             # traveller dashboard & bookings
├─ components/
│  ├─ Forms/            # reusable RHF form controls
│  ├─ ui/               # shared UI (tables, modals, profile, search)
│  └─ view/             # layout pieces (navbar, buttons)
├─ redux/
│  ├─ api/              # RTK Query endpoints
│  └─ slices/           # local state slices
├─ helpers/             # axios instance, config
├─ services/            # auth service (token handling)
└─ constants/           # static data (districts, options)
```

## 🔗 Key User Flows

- **Book a trip:** Home / Book Now → search route → pick a schedule → select seats → confirm
- **Traveller:** view pending / completed bookings, rate journeys, edit profile
- **Admin:** create & manage buses, drivers, schedules; review all bookings
- **Driver:** view assigned schedules and received reviews

## ☁️ Deployment

Deployed on **Vercel**.

1. Push to GitHub
2. Vercel → **Add New Project** → import this repo
3. Set `NEXT_PUBLIC_API_BASE_URL` to your backend URL (`.../api/v1`)
4. Deploy

> Ensure the backend's `CLIENT_SITE` env var is set to this frontend's URL so CORS allows requests.

## 👤 Author

**Md Imran Hossain**

---

<div align="center">
<sub>Built with Next.js, React & Ant Design.</sub>
</div>
