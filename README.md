# Hiring Management Web App

A modern web application built with **Next.js** for managing job vacancies and candidate applications efficiently.  
This project provides an intuitive admin interface to create, update, and manage job postings, along with form configurations and vacancy tracking.

---

## 🚀 Project Overview

The **Hiring Management Web App** streamlines the process of handling job openings by allowing HR teams to:

- Create and manage job vacancies  
- Configure dynamic application forms  
- Display job lists with skeleton loading  
- Provide real-time feedback via toast notifications  
- Ensure clean data management using Prisma ORM  

The project follows a modular and scalable folder structure with a clear separation of concerns between API routes, components, hooks, and UI elements.

---

## 🧰 Tech Stack Used

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | [Next.js 14+](https://nextjs.org/) (App Router) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **ORM** | [Prisma](https://www.prisma.io/) |
| **Database** | PostgreSQL / MySQL (configurable via Prisma) |
| **Toast Notifications** | [React Hot Toast](https://react-hot-toast.com/) |
| **Icons** | [Lucide React](https://lucide.dev/icons) |
| **Language** | TypeScript |
| **State & Form Handling** | React Hooks, Custom Hooks, React Hook Form |
| **Deployment Ready** | Supports Next.js build & production start |

---
## 🧩 How to Run Locally

### Clone the Repository

git clone https://github.com/your-username/hiring-management-web-app.git
cd hiring-management-web-app

### Install Dependencies

npm install

### Setup Environment Variables

DATABASE_URL="postgresql://user:password@localhost:5432/hiring_db"
DIRECT_URL="postgresql://user:password@localhost:6432/hiring_db"

### Setup Prisma

Generate the Prisma client and push schema to the database:
npm run prisma:generate
npm run prisma:push

### Run the Development Server

npm run dev