# 🌤️ Simple Modern Weather

A sleek, modern weather application built with **React 19**, **TypeScript**, and **Vite**. It delivers real-time weather data with a beautiful dark UI, smooth animations, and a glassmorphism aesthetic — all powered by the **free, no-key-required [Open-Meteo API](https://open-meteo.com/)**.

---

## ✨ Features

- 🌡️ **Current Weather** — Temperature, condition, feels-like, and dynamic weather icons
- 🕐 **Hourly Forecast** — Scrollable hour-by-hour breakdown for the day
- 📅 **Daily Forecast** — Multi-day outlook at a glance
- 📊 **Weather Metrics** — Humidity, wind speed, UV index, visibility, and more
- 🔍 **City Search** — Debounced search with real-time location suggestions
- 📍 **Geolocation** — Use your device's current location with one click
- 💾 **Persistent Location** — Last viewed location saved to `localStorage`
- 🎨 **Dynamic Backgrounds** — Gradient changes based on weather condition and time of day
- ✨ **Particle Background** — Animated visual effects behind the weather display
- 🔔 **Toast Notifications** — Friendly feedback using [Sonner](https://sonner.emilkowal.ski/)
- ⚡ **Smooth Animations** — Powered by [Framer Motion](https://www.framer.com/motion/) and [GSAP](https://gsap.com/)

---

## 🛠️ Tech Stack

| Category        | Technology                                      |
|-----------------|-------------------------------------------------|
| Framework       | React 19, TypeScript                            |
| Build Tool      | Vite 7                                          |
| Styling         | Tailwind CSS v3 + shadcn/ui theme               |
| UI Components   | Radix UI primitives + 40+ shadcn/ui components  |
| Animations      | Framer Motion, GSAP                             |
| Weather API     | Open-Meteo (free, no API key needed)            |
| Forms           | React Hook Form + Zod                           |
| Charts          | Recharts                                        |
| Icons           | Lucide React                                    |
| Notifications   | Sonner                                          |
| Node Version    | 20                                              |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankitdey01/simple-modern-weather.git
   cd simple-modern-weather
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** *(optional)*
   ```bash
   cp .env.example .env
   ```
   > No API key is required! The app uses [Open-Meteo](https://open-meteo.com/), which is completely free.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

---

## 📦 Available Scripts

| Script          | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Start the local development server       |
| `npm run build` | Type-check and build for production      |
| `npm run preview` | Preview the production build locally   |
| `npm run lint`  | Lint the codebase with ESLint            |

---

## 📁 Project Structure

```
simple-modern-weather/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components (40+)
│   │   └── weather/         # Weather-specific components
│   │       ├── Navigation.tsx
│   │       ├── SearchModal.tsx
│   │       ├── MainWeatherDisplay.tsx
│   │       ├── WeatherMetrics.tsx
│   │       ├── HourlyForecast.tsx
│   │       ├── DailyForecast.tsx
│   │       ├── LoadingSkeleton.tsx
│   │       └── ParticleBackground.tsx
│   ├── hooks/
│   │   └── useWeather.ts    # Core weather data & location hook
│   ├── sections/            # Page section components
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Root React component
│   ├── App.css              # App-specific styles
│   ├── index.css            # Global styles & Tailwind imports
│   └── main.tsx             # Application entry point
├── index.html               # HTML entry point
├── tailwind.config.js       # Tailwind theme configuration
├── vite.config.ts           # Vite build configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── .env.example             # Environment variable template
```

---

## 🌐 API

This project uses the **[Open-Meteo API](https://open-meteo.com/)** — a free, open-source weather API with no authentication required. Location search is handled via a geocoding API to convert city names to coordinates.

---

## 🎨 UI Components

This project includes **40+ shadcn/ui components** pre-configured with a custom dark theme:

`accordion` `alert` `alert-dialog` `avatar` `badge` `breadcrumb` `button` `calendar` `card` `carousel` `chart` `checkbox` `collapsible` `command` `context-menu` `dialog` `drawer` `dropdown-menu` `form` `hover-card` `input` `input-otp` `label` `menubar` `navigation-menu` `pagination` `popover` `progress` `radio-group` `resizable` `scroll-area` `select` `separator` `sheet` `sidebar` `skeleton` `slider` `sonner` `spinner` `switch` `table` `tabs` `textarea` `toggle` `toggle-group` `tooltip`

**Example usage:**
```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
```

---

## 📄 License

This project is open source. Feel free to use, modify, and distribute it.

---

<p align="center">Built with ❤️ using React, TypeScript, and Open-Meteo</p>
