# QR Code Login App

A full-stack application featuring user authentication, QR code generation, and AI-powered messaging using Next.js, PostgreSQL, and Google Gemini.

## Features

- User registration and authentication
- QR code generation for each user
- AI-generated personalized messages
- Responsive design
- Docker-based PostgreSQL database

## Prerequisites

- Node.js 18 or later
- Docker and Docker Compose
- Google Gemini API key

## Setup

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Copy the environment variables template:
```bash
cp .env.example .env
```

3. Update the `.env` file with your credentials:
- Generate a secure NEXTAUTH_SECRET (you can use `openssl rand -base64 32`)
- Add your Google Gemini API key

4. Start the PostgreSQL database:
```bash
docker-compose up -d
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Database Management

- Start the database:
```bash
docker-compose up -d
```

- Stop the database:
```bash
docker-compose down
```

- View database logs:
```bash
docker-compose logs postgres
```

## Development

- Run Prisma Studio (database GUI):
```bash
npx prisma studio
```

- Generate Prisma Client after schema changes:
```bash
npx prisma generate
```

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - React components
- `/lib` - Utility functions and configurations
- `/prisma` - Database schema and migrations

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
