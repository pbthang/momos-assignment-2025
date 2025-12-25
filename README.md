# Notion Integrated Data Table

A React-based data table application that integrates with Notion API, featuring advanced filtering, sorting, column management, and persistent state management.

## Features

- **Data Table**: Interactive table with drag-and-drop column reordering, column resizing, sorting, and pagination.
- **Advanced Filtering**: Complex nested filters with AND/OR operators
- **State Persistence**: Filter, sorting, and column preferences saved to localStorage

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for running the server)
- Notion API credentials:
  - Notion Database ID
  - Notion Integration Secret

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pbthang/momos-assignment-2025.git
cd momos-assignment-2025
```

### 2. Environment Setup

Create a `.env` file in the project root:

```bash
VITE_BACKEND_URL=http://localhost:8000

# Notion API Configuration
NOTION_DATABASE_ID=your_notion_database_id_here
NOTION_DATABASE_SECRET=your_notion_secret_here

# Server Port (optional, defaults to 8000)
PORT=8000
```

### 3. Running the Server

#### Option A: Using Docker Compose (Recommended)

```bash
# Start the server
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the server
docker-compose down
```

The server will be available at `http://localhost:8000`

#### Option B: Manual Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Or build and run in production mode
npm start
```

### 4. Running the Frontend

```bash
# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in the terminal)

## Project Structure

```text
momos-assignment-2025/
├── server/                 # Backend server (Express + Notion API)
│   ├── src/
│   │   └── server.ts      # Server entry point
│   ├── Dockerfile         # Docker configuration
│   └── package.json
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── data-table/    # Table components
│   │   ├── filter/        # Filter components
│   │   └── ui/            # UI components (shadcn/ui)
│   ├── stores/            # Zustand stores
│   │   ├── filter-store.ts
│   │   └── table-store.ts
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript types
├── docker-compose.yml     # Docker Compose configuration
└── package.json
```

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI

### Server

- `npm run dev` - Start development server with hot reload
- `npm start` - Build and start production server

## Features Overview

## Development

### Tech Stack

**Frontend:**

- React 19
- TypeScript
- Vite
- TanStack Table
- TanStack Query
- Zustand (state management)
- shadcn/ui components
- Tailwind CSS
- dnd-kit (drag and drop)

**Backend:**

- Node.js
- Express
- Notion API Client
- TypeScript
