# Fullstack Task: Book Management System

## Overview

A system to manage(Add, update, delete, and search) books. Please follow the following guide to setup the project.

## Prerequisites

Ensure you have the following software installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Nest](https://docs.nestjs.com/first-steps)

## Setup

### Clone the Repository

Clone the repository:

```bash
git clone https://github.com/nabil-ahmad-925/book-management-system.git
```

### Backend Setup Guide

Go to backend folder:

```bash
cd backend
```

#### Configure Environment Variables

Create a `.env` file in the root of your project with the following content:

```bash
MONGODB_URI=mongodb://localhost/book-management-system

PORT=3001
```

Replace MONGODB_URI with your actual data.

### Frontend Setup Guide

Go to frontend folder:

```bash
cd frontend
```

#### Configure Environment Variables

Create a `.env.local` file in the root of your project with the following content:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Replace NEXT_PUBLIC_API_BASE_URL with your actual data.

## Start the services

```bash
docker-compose up
```

Now your application is running at http://localhost:3000

## Stop the services

```bash
docker-compose down
```
