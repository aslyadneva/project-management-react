# Project Management Dashboard

An application for managing projects and their related tasks. This project focuses on server state management while performing create and update operations on individual task and project properties.

## 📦 Technologies

- `Vite`
- `React.js`
- `TypeScript`
- `TanStack Router`
- `TanStack Query`
- `TanStack Table`
- `React Hook Form`
- `Zod`
- `Shadcn UI`
- `Appwrite`

## Features

Here's what you can do:

- **Create a project**: Create a project with a title and description via the main dashboard or the /projects route. A project's default status is "Planning". All projects appear on the sidebar as navigation items.

- **Create a task for a project**: Create a task within a project or in the /tasks route. Tasks have a many-to-one relationship to projects. A task's default status is "To do". 

- **Edit a project**: Inside an individual project, in the settings tab, edit the project's title, description, and status. A project can have a status of "Planning", "Active", or "Completed". 

- **Edit a task's status**: In the /tasks route or in a project route, select a new status for a task. A task with a "Completed" status will be included in the completion percentage of a project.

- **View completion status across all projects**: A completion status for each project is derived from dividing the number of completed tasks by the number of total tasks.

- **View all tasks**: View all tasks across all projects via the /tasks route. 

- **View all project**: View all projects and their completion statuses via the /projects route. 

## Running the Project

To run the project in your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` in the project directory to install the required dependencies.
3. Run `npm run dev` to get the project started.
4. Open [http://localhost:3000](http://localhost:3000) (or the address shown in your console) in your web browser to view the app.

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).
