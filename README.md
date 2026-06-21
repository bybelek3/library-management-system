A full-stack **Library Management System** developed using **React**, **Spring Boot**, and **MySQL/H2**. The application allows users to register, log in, browse books, borrow and return books, while administrators can manage the library through a complete CRUD interface.

---

## Features

* User registration and login
* Password encryption using BCrypt
* Role-based authorization (ADMIN / READER)
* Books management (Create, Read, Update, Delete)
* Borrow and return books
* Dashboard
* Responsive Bootstrap interface
* Dark/Light mode
* Protected routes
* Swagger API documentation

---

## Technologies Used

### Frontend

* React
* React Router
* Axios
* Bootstrap 5

### Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* Maven

### Database

* MySQL / H2 Database

---

## Project Structure

```
library-project
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│   ├── dto
│   └── config
│
└── frontend
    ├── pages
    ├── components
    ├── services
    └── assets
```

---

## Main Functionalities

### Authentication

* User registration
* User login
* BCrypt password hashing
* Role management

### Books

* View all books
* Add new books
* Edit books
* Delete books

### Loans

* Borrow books
* Return books
* View borrowed books
* Track due dates

---

## Security

* Password hashing with BCrypt
* Protected frontend routes
* Role-based interface (ADMIN / READER)
* Spring Security configuration

---

## API Documentation

Swagger UI is available after running the backend:

```
http://localhost:8080/swagger-ui/index.html
```

---

## Installation

### Backend

```
cd backend
./mvnw spring-boot:run
```

or on Windows

```
mvnw.cmd spring-boot:run
```

### Frontend

```
cd frontend
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:8080
```

---

## Screenshots

The project report contains screenshots of:

* Login
* Register
* Dashboard
* Books
* Loans
* Swagger API
* Dark Mode

---


Ali Belek
Wrocław University of Science and Technology

2026
