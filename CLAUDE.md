# CLAUDE.md — AI Assistant Guide for Dream Home Vision Board

This file provides context and conventions for AI assistants working in this repository.

## Project Overview

**Dream Home Vision Board** is a React single-page application for curating home design inspiration. Users create vision boards (e.g., "Modern Farmhouse", "Cozy Cabin"), then pin images with titles, notes, and room categories. All data is persisted in the browser via localStorage.

## Tech Stack

- **Framework**: React 19 with Vite 7
- **Routing**: React Router v7 (`react-router-dom`)
- **Icons**: Lucide React
- **IDs**: `uuid` (v4)
- **Styling**: Plain CSS with CSS custom properties (no CSS framework)
- **Storage**: localStorage (no backend)

## Development Setup

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (Vite)
npm run build      # Production build to dist/
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

No environment variables or external services are required.

## Directory Structure

```
visionboard/
├── index.html                    # Entry HTML (loads Google Fonts)
├── package.json
├── vite.config.js
├── eslint.config.js
├── src/
│   ├── main.jsx                  # App entry — BrowserRouter + BoardProvider
│   ├── App.jsx                   # Root layout — header + routes
│   ├── index.css                 # Global styles + CSS custom properties
│   ├── context/
│   │   └── BoardContext.jsx      # Central state: boards, pins, CRUD operations
│   ├── components/
│   │   ├── BoardCard.jsx         # Board preview card on home page
│   │   ├── PinCard.jsx           # Image pin card with hover actions
│   │   ├── CreateBoardModal.jsx  # Modal for creating new boards
│   │   ├── AddPinModal.jsx       # Modal for adding/editing pins
│   │   ├── Lightbox.jsx          # Full-screen image viewer
│   │   └── ConfirmDialog.jsx     # Delete confirmation modal
│   ├── pages/
│   │   ├── HomePage.jsx          # Board listing + create board flow
│   │   └── BoardPage.jsx         # Board detail — pins grid, room filter
│   └── utils/
│       ├── storage.js            # localStorage read/write helpers
│       └── rooms.js              # Room category constants + colors
└── public/
    └── vite.svg
```

## Architecture

### State Management
- **BoardContext** (`src/context/BoardContext.jsx`) is the single source of truth
- Boards and pins are stored as a flat array of board objects, each containing a `pins` array
- All CRUD operations go through context methods: `createBoard`, `updateBoard`, `deleteBoard`, `addPin`, `updatePin`, `deletePin`
- State auto-persists to localStorage via a `useEffect` in the provider

### Routing
- `/` — Home page with board grid
- `/board/:boardId` — Board detail with pins and room filtering

### Styling Conventions
- All styles live in `src/index.css` using BEM-like class naming
- Design tokens are CSS custom properties on `:root` (colors, shadows, radii, fonts)
- Fonts: Playfair Display (headings), Inter (body)
- No component-level CSS files — keeps styles centralized

### Room Categories
- Defined in `src/utils/rooms.js` as a constant array
- Used for pin categorization and board-level filtering
- Categories: Living Room, Kitchen, Bedroom, Bathroom, Home Office, Dining Room, Outdoor, Garage, Entryway, Laundry, Nursery, Other

## Git Workflow

- Default branch: `master`
- Commit message style: imperative mood (e.g., "Add pin editing", not "Added pin editing")
- Keep commits focused — one logical change per commit
- Do not commit secrets, credentials, or `.env` files

## Code Conventions

- React functional components only — no class components
- Use `useState`, `useMemo`, `useCallback` hooks (no external state libraries)
- Named exports for context hooks, default exports for components
- No TypeScript (plain JSX)
- Prefer clarity over cleverness; avoid premature abstraction
- Delete unused code rather than commenting it out

## AI Assistant Notes

- The app has no backend — all data lives in localStorage
- When adding features, update BoardContext with any new state operations
- New room categories should be added to `src/utils/rooms.js`
- New routes go in `src/App.jsx`, new pages in `src/pages/`
- Styles go in `src/index.css` — keep it centralized
- Run `npm run build` to verify changes compile successfully
- Update this CLAUDE.md when significant architectural changes are made
