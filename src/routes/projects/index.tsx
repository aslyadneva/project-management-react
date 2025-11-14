import { createFileRoute } from "@tanstack/react-router";
import ProjectCard from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { ProjectsContext } from "@/providers/projectsProvider";
import { Plus } from "lucide-react";
import { useContext } from "react";

export const Route = createFileRoute("/projects/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projects } = useContext(ProjectsContext);
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
      <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
        {projects
          ? projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))
          : null}
      </div>
    </div>
  );
}
