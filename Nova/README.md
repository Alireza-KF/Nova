# Nova

Nova is a single-page React application built with TypeScript and Vite. It uses
React Router for client-side navigation, Tailwind CSS for styling, and
[Tabler Icons for React](https://tabler.io/icons) for icons.

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

## Static content

The storefront is frontend-only. Keep page content and sample product or
collection data in the app; do not add a Fake API or require a backend server.

## Pages

- `/` — Home
- `/shop` — Shop
- `/collection` — Collection
- `/product/:productId` — Product details
- `/cart` — Cart

## Tabler Icons

Import individual icons from `@tabler/icons-react` and use them as React
components:

```tsx
import { IconCheck } from '@tabler/icons-react'

function Example() {
  return <IconCheck size={20} stroke={2} aria-label="Complete" />
}
```

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — type-check and create a production build
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build
