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

## Fake API

The root `db.json` file is the data source for the sample products, collections,
home page picks, and cart items. Start the JSON Server API in a separate
terminal:

```bash
npm run api
```

Each product has a numeric `id`, a description, comments (`name`, `rating`
from 1 to 5, and `text`), one or more hex color codes, and one or more sizes
from `XS`, `S`, `L`, `XL`, and `2XL`.

The API is available at `http://localhost:3001`:

- `GET /products` and `GET /products/:id`
- `GET /collections` and `GET /collections/:id`
- `GET /home`
- `GET /cartItems`

The home response includes the hero's title, subtitle, description, image path,
and alt text. The Home page loads this content from JSON Server and provides a
retry action if the request fails. Its "Explore Collections" and "Shop Now"
buttons are static links to `/collection` and `/shop`.

JSON Server also supports standard `POST`, `PUT`, `PATCH`, and `DELETE`
operations. Changes made through the API are saved back to `db.json`.

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
- `npm run api` — start the JSON Server fake API
- `npm run build` — type-check and create a production build
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build
