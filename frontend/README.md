# CampusConnect — Frontend

Frontend implementation for **CampusConnect**, a Student CommunityHub where students
introduce themselves, share posts, showcase learning activities, and connect
with each other. This covers the frontend UI section of the group project,
built from the design spec (colour system, components, page layouts).

## Stack

- React + Vite
- React Router (client-side routing)
- Tailwind CSS (design tokens configured in `tailwind.config.js` to match the spec's colour system)

## Structure

```
frontend/src/
├── components/   # Navbar, Button, PostCard, Avatar, Input, CommentItem
├── pages/        # Home, CreatePost, PostDetail, Profile, Login, Register
├── layouts/      # MainLayout (navbar + content), AuthLayout (login/register)
├── data/         # Mock data (placeholder until wired to the backend)
└── styles/       # Global styles + Tailwind entry point
```

## Pages implemented

- Home / Feed — post cards, create post CTA
- Create Post — text area, publish flow
- Post Detail — full post + comments thread
- Profile — cover, avatar, bio, user's posts
- Login / Register — forms with inline validation
- Responsive layout — mobile nav, single-column feed on small screens

## Running locally

```bash
npm install
npm run dev
```

## Notes for the team

- Data is currently mocked in `src/data/mockData.js`. Swap this out once the
  API/backend endpoints are ready — component props are already shaped for
  that (e.g. `PostCard` takes a `post` object).
- Colour tokens live in `tailwind.config.js` under `theme.extend.colors`
  (`primary`, `secondary`, `accent`, `surface`, `card`, `ink`, `border`, `danger`)
  so anyone adding new components can reuse them instead of hardcoding hex values.
