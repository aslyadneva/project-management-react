export enum TasksTableStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

export enum ProjectsTableStatus {
  PLANNING = "Planning",
  ACTIVE = "Active",
  COMPLETED = "Completed",
}

export type Project = {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  status: ProjectsTableStatus;
  date: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  project: Pick<Project, "id" | "title">;
  status: TasksTableStatus;
};
