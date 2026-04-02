# Portfolio Frontend

React-based portfolio website showcasing projects, skills, and GitHub repositories.

## Setup

```bash
npm install
npm run dev
```

## Structure

```
frontend/
├── components/         # Reusable React components
├── pages/             # Page-level components
├── styles/            # CSS and styling files
├── portfolio.jsx      # Main portfolio component
└── README.md          # This file
```

## Features

- **Project Showcase** - Display of featured projects with links
- **Skills Section** - Technical skills organized by category
- **GitHub Integration** - Real-time GitHub repositories
- **Responsive Design** - Mobile-friendly layout
- **Dark/Light Theme** - Theme switching capability

## Components

Place reusable components in the `components/` directory:
- Navigation
- Project Cards
- Skill Bars
- Contact Form
- etc.

## Styling

Place stylesheets in the `styles/` directory:
- Global styles
- Component-specific CSS
- Theme files

## Environment Variables

Create a `.env` file:
```
VITE_API_URL=http://localhost:5000
VITE_GITHUB_USER=GodelVivek1068
```
