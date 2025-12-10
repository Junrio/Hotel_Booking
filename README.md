# Hotel Booking System - Frontend

Next.js 15 frontend application for the Hotel Booking System.

## Features

- 🏨 Room browsing and filtering
- 📅 Availability checking
- 📝 Booking creation and management
- 👤 User authentication (JWT)
- 🔐 Admin dashboard for room and booking management
- 📱 Fully responsive design

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript**
- **Tailwind CSS** for styling
- **React Hook Form** + **Zod** for form validation
- **Axios** for API calls

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── rooms/             # Rooms listing and detail
│   ├── bookings/          # User bookings
│   ├── login/             # Login page
│   └── admin/             # Admin pages
├── components/
│   ├── layout/            # Layout components
│   ├── rooms/             # Room-related components
│   ├── bookings/          # Booking components
│   └── common/            # Reusable UI components
├── lib/
│   ├── api/               # API wrappers
│   ├── types.ts           # TypeScript types
│   ├── auth.ts            # Auth helpers
│   ├── apiClient.ts       # Axios instance
│   └── utils.ts           # Utility functions
└── context/
    └── AuthContext.tsx    # Auth context provider
```

## API Endpoints

The frontend expects the following backend endpoints:

- `POST /api/auth/login` - User login
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room by ID
- `GET /api/rooms/:id/availability` - Check room availability
- `POST /api/bookings` - Create booking
- `GET /api/bookings/me` - Get user bookings
- `GET /api/admin/bookings` - Get all bookings (admin)
- `PUT /api/admin/bookings/:id` - Update booking status
- `DELETE /api/admin/bookings/:id` - Delete booking

## Color Palette

- Primary: `#0C4A6E` (deep ocean blue)
- Secondary: `#38BDF8` (sky blue)
- Accent: `#FBBF24` (sunset gold)
- Background: `#F8FAFC` (soft cloud gray)
- Surface: `#FFFFFF` (white)
- Text: `#1E293B` (slate)

## Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm start`
- Lint code: `npm run lint`

## Notes

- Ensure the backend API is running on `http://localhost:3000`
- JWT tokens are stored in localStorage
- All API calls include authentication headers when user is logged in
- Admin routes are protected and require admin role
