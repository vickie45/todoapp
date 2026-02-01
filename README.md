# Todo Full-Stack Application

This is a basic full-stack Todo application built with Angular 17 for the frontend and .NET 8 Minimal APIs for the backend, using PostgreSQL as the database. It demonstrates fundamental CRUD (Create, Read, Update, Delete) operations with a modern user interface.

## Technologies Used

### Frontend
- **Angular 17 (Standalone Components):** A powerful framework for building single-page applications.
- **Angular Material:** A UI component library for building consistent and accessible user interfaces.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **RxJS:** For reactive programming and handling asynchronous operations.

### Backend
- **.NET 8:** The latest version of Microsoft's cross-platform development framework.
- **Minimal APIs:** A lightweight and efficient way to build HTTP APIs in .NET.
- **Entity Framework Core 8:** An object-relational mapper (ORM) for database interaction.
- **Npgsql.EntityFrameworkCore.PostgreSQL:** PostgreSQL provider for Entity Framework Core.
- **Swagger/OpenAPI:** For API documentation and testing.

### Database
- **PostgreSQL:** A powerful, open-source relational database system.

## Features

- **Create Todo:** Add new todo items with a title and description.
- **Read Todos:** View a list of all todo items.
- **Update Todo:** Mark todo items as completed/incomplete.
- **Delete Todo:** Remove todo items from the list.
- **Angular Material UI:** A clean and responsive user interface.
- **Client-Side Validation:** Real-time feedback for required fields in the Angular app.
- **Confirmation Dialog:** Prevents accidental deletion of todo items.
- **Persistent Storage:** All todo data is stored in a PostgreSQL database.
- **Separation of Concerns:** Frontend API calls are encapsulated in an Angular service.
- **Server-Side Validation:** Basic validation for todo creation/update requests on the API.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js & npm:** [Download Node.js](https://nodejs.org/en/download/) (includes npm).
- **Angular CLI:** Install globally via npm: `npm install -g @angular/cli`.
- **.NET SDK 8.0:** Download .NET SDK.
- **PostgreSQL:** Download PostgreSQL and ensure a PostgreSQL server is running locally (default port 5432).

## Getting Started

Follow these steps to get your development environment set up.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME # Navigate to the root of the cloned project
```

### 2. Backend Setup (.NET API)

1.  **Navigate to the API directory:**
    ```bash
    cd todoapi
    ```

2.  **Configure Database Connection:**
    Open `appsettings.Development.json` and ensure your PostgreSQL connection string is correctly configured. Replace `vishy123` with your actual PostgreSQL password and `todo_user` with your username if different.
    ```json
    {
      "ConnectionStrings": {
        "DefaultConnection": "Host=localhost;Port=5432;Database=todoappdb;Username=todo_user;Password=vishy123"
      }
    }
    ```
    **Note:** `appsettings.Development.json` is typically ignored by Git to prevent sensitive information from being committed. For production, you would use environment variables or a secrets manager.

3.  **Create PostgreSQL Database:**
    Ensure you have a PostgreSQL database named `todoappdb` created. You can create it using `psql` or a GUI tool like pgAdmin.
    ```sql
    -- Example psql command to create user and database
    CREATE USER todo_user WITH PASSWORD 'vishy123';
    CREATE DATABASE todoappdb OWNER todo_user;
    ```

4.  **Run Entity Framework Core Migrations:**
    This will create the necessary tables in your `todoappdb` database.
    ```bash
    dotnet ef database update
    ```

5.  **Run the .NET API:**
    ```bash
    dotnet run
    ```
    The API will typically run on `https://localhost:5257`. You can access the Swagger UI at `https://localhost:5257/swagger` to test the endpoints.

### 3. Frontend Setup (Angular Client)

1.  **Navigate to the Angular client directory:**
    ```bash
    cd ../todoapp # Go back to the root, then into todoapp
    ```

2.  **Install npm packages:**
    ```bash
    npm install
    ```

3.  **Run the Angular application:**
    ```bash
    ng serve --open
    ```
    This will open the application in your default browser, usually at `http://localhost:4200`.

## Usage

- Use the input fields at the top to add new todo items.
- Click the checkbox next to a todo to mark it as completed/incomplete.
- Click the trash can icon to delete a todo item (a confirmation dialog will appear).

## Future Enhancements

- **Filtering/Searching:** Add functionality to filter todos by status or search by title/description.
- **User Authentication:** Implement user registration and login to manage personal todo lists.
- **Routing:** Create separate routes for viewing individual todo details or editing.
- **Error Handling:** More sophisticated error handling and display in the UI.
- **Deployment:** Set up CI/CD pipelines for automated deployment to cloud platforms.
