import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TasksTable from "@/components/tasks-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjects } from "@/hooks/projects";
import { useTasks } from "@/hooks/tasks";

export const Route = createFileRoute("/tasks/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: projects } = useProjects();
  const { data: tasks } = useTasks();

  if (tasks) {
    return (
      <div className="p-8 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance">
              Tasks
            </h1>
            <p className="text-muted-foreground ">
              Manage and track your tasks.
            </p>
          </div>

          <Button variant="outline" size="sm">
            <Plus /> New Task
          </Button>
        </div>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All projects" />
          </SelectTrigger>
          <SelectContent>
            {projects?.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <TasksTable tasks={tasks} />
      </div>
    );
  }
}
