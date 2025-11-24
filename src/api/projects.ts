import { tablesDB } from "@/lib/appwrite";
import { ID, Query, type Models } from "appwrite";
import type { Project, ProjectsTableStatus, TasksTableStatus } from "@/types";

type TaskRow = Models.Row & {
  title: string;
  description: string;
  status: TasksTableStatus;
};

type ProjectRow = Models.Row & {
  title: string;
  description: string;
  status: ProjectsTableStatus;
  tasks: TaskRow[];
  dueDate: string;
};

const params = {
  databaseId: import.meta.env.VITE_APPWRITE_PROJECTS_DATABASE_ID,
  tableId: import.meta.env.VITE_APPWRITE_PROJECTS_TABLE_ID,
};

export async function getProjects() {
  try {
    const response = await tablesDB.listRows<ProjectRow>({
      ...params,
      queries: [Query.select(["*", "tasks.*"]), Query.orderDesc("$createdAt")],
    });

    const normalized: Project[] = response.rows.map((row) => ({
      id: row.$id,
      title: row.title,
      description: row.description,
      tasks: row.tasks.map(({ $id, status, title, description }) => ({
        id: $id,
        title,
        description,
        project: { id: row.$id, title: row.title },
        status,
      })),
      status: row.status,
      date: row.dueDate,
    }));
    return normalized;
  } catch (err) {
    throw new Error();
  }
}

export async function createProject(data: {
  title: string;
  description: string;
}) {
  try {
    const response = await tablesDB.createRow({
      ...params,
      rowId: ID.unique(),
      data: data,
    });

    return response;
  } catch (err) {
    console.log(err); // handle error or show user a message
  }
}

export async function updateProject(data: { projectId: string; data: any }) {
  try {
    const response = await tablesDB.updateRow({
      ...params,
      rowId: data.projectId,
      data: data.data,
    });

    return response;
  } catch (err) {
    console.log(err); // handle error or show user a message
  }
}
