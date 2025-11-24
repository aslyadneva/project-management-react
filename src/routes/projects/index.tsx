import { createFileRoute } from "@tanstack/react-router";
import ProjectCard from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
// import { useContext, useState } from "react";

import { useProjects } from "@/hooks/projects";
import { useTasks } from "@/hooks/tasks";
// import {
//   Dialog,
//   DialogContent,
//   // DialogDescription,
//   // DialogHeader,
//   // DialogTitle,
//   // DialogTrigger,
// } from "@/components/ui/dialog";
// import TaskForm from "@/components/task-form";

export const Route = createFileRoute("/projects/")({
  component: RouteComponent,
});

function RouteComponent() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: projects } = useProjects();
  const { data: tasks } = useTasks();

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance">
            Projects
          </h1>
          <p className="text-muted-foreground ">
            Manage and track your projects.
          </p>
        </div>

        <Button variant="outline" size="sm">
          <Plus /> New Project
        </Button>
      </div>

      {/* Project Cards */}
      <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        {projects && tasks
          ? projects.map((project) => {
              const tasksForProject = tasks.filter(
                (task) => task.project.id === project.id
              );
              return (
                <ProjectCard
                  key={project.title}
                  project={project}
                  tasks={tasksForProject}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
