# Digital CV / Portfolio

A modern, premium digital CV and portfolio website built with React, TypeScript, Tailwind CSS, Express, and Vercel-friendly serverless API routing.

## Features
- Premium black and green visual theme
- Responsive single-page portfolio experience
- Smooth Framer Motion transitions
- Contact form with validated REST API endpoint
- Ready for Vercel deployment

## Project Structure
- frontend/: Vite + React + TypeScript app
- backend/: Express + TypeScript API for Vercel

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Environment Variables
Copy [.env.example](.env.example) to .env and adjust values as needed.

## Deployment
1. Deploy the repository from the root folder to Vercel.
2. Vercel will build the frontend from `frontend/` and serve the contact endpoint from the root `api/contact.ts` function.
3. Set SMTP environment variables in the Vercel project settings instead of committing them to git.
