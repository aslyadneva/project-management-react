import { tablesDB } from "@/lib/appwrite";
import type { ProjectsTableStatus, Task, TasksTableStatus } from "@/types";
import { ID, Query, type Models } from "appwrite";

type ProjectRow = Models.Row & {
  title: string;
  description: string;
  status: ProjectsTableStatus;
  tasks: TaskRow[];
};

type TaskRow = Models.Row & {
  title: string;
  description: string;
  projectId: ProjectRow;
  status: TasksTableStatus;
};

export async function getTasks() {
  try {
    const response = await tablesDB.listRows<TaskRow>({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECTS_DATABASE_ID,
      tableId: import.meta.env.VITE_APPWRITE_TASKS_TABLE_ID,
      // queries: [Query.orderDesc("$createdAt"), Query.limit(10)],
      queries: [
        Query.select(["*", "projectId.*"]),
        Query.orderDesc("$createdAt"),
      ],
    });

    const normalized: Task[] = response.rows.map((row) => ({
      id: row.$id,
      title: row.title,
      description: row.description,
      project: { id: row.projectId.$id, title: row.projectId.title },
      status: row.status,
    }));

    return normalized;
  } catch (err) {
    console.log(err);
  }
}

export async function createTask(data: {
  title: string;
  description: string;
  projectId: string;
}) {
  try {
    const response = await tablesDB.createRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECTS_DATABASE_ID,
      tableId: import.meta.env.VITE_APPWRITE_TASKS_TABLE_ID,
      rowId: ID.unique(),
      data: data,
    });

    return response;
  } catch (err) {
    throw new Error();
  }
}

export async function updateTask(data: { taskId: string; value: string }) {
  try {
    const response = await tablesDB.updateRow({
      databaseId: import.meta.env.VITE_APPWRITE_PROJECTS_DATABASE_ID,
      tableId: import.meta.env.VITE_APPWRITE_TASKS_TABLE_ID,
      rowId: data.taskId,
      data: { status: data.value },
    });

    return response;
  } catch (e) {
    throw new Error();
  }
}
