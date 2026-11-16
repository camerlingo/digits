# Digits: Contact Management Application

<img src="doc/landing.png" alt="Digits Landing Page" width="800">

## Overview

Digits is a contact management application built using Next.js, React, TypeScript, React Bootstrap, Prisma, and PostgreSQL.

The application allows users to create, view, and edit their contacts. Users can also add timestamped notes to individual contacts to keep track of conversations and important information.

The application includes user authentication and administrator functionality.

## Installation Instructions

To install and run Digits locally, follow these steps:

### 1. Clone the Repository

Clone the Digits GitHub repository to your computer using GitHub Desktop or Git.

### 2. Install Dependencies

Open the project folder in Visual Studio Code and run:

```bash
npm install
```

### 3. Configure PostgreSQL

Make sure PostgreSQL is installed and running.

Create a PostgreSQL database for the application.

Configure the `DATABASE_URL` environment variable with the database connection information.

### 4. Set Up Prisma

Run the database migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma client:

```bash
npx prisma generate
```

Seed the database with development accounts and sample contacts:

```bash
npx prisma db seed
```

### 5. Start the Application

Run:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Application Walkthrough

### Landing Page

<img src="doc/landing.png" alt="Landing Page" width="800">

The landing page introduces users to the Digits application and provides navigation to the login and registration pages.

### Add Contact Page

<img src="doc/add.png" alt="Add Contact Page" width="800">

The Add Contact page allows authenticated users to create new contacts by entering their first name, last name, address, image URL, and description.

After submitting the form, the new contact is saved to the PostgreSQL database.

### List Contacts Page

<img src="doc/list.png" alt="List Contacts Page" width="800">

The List Contacts page displays contacts belonging to the currently logged-in user.

Each contact card displays the contact's name, address, image, and description.

Users can also add timestamped notes to individual contacts to record conversations and other important information.

### Edit Contact Page

The Edit Contact page allows users to update the information associated with an existing contact.

Users can modify the contact's name, address, image URL, and description.

### Admin Page

<img src="doc/admin.png" alt="Admin Page" width="800">

The Admin page is accessible only to users with administrator privileges.

Administrators can view contacts belonging to different users, including their associated notes and owner information.

## Technologies Used

- Next.js
- React
- TypeScript
- React Bootstrap
- Prisma ORM
- PostgreSQL
- NextAuth
- GitHub

## Conclusion

Digits provides a simple way to organize contact information and maintain records of conversations through timestamped notes.

This project demonstrates full-stack web development concepts, including authentication, database relationships, form validation, and database operations.
