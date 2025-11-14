import { ProjectsContext } from "@/providers/projectsProvider";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";

export const Route = createFileRoute("/projects/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { projects } = useContext(ProjectsContext);

  const project = projects?.filter(
    (project) => project.id === params.projectId
  )[0];

  if (project) {
    return <div> {project.title}</div>;
  }
  return <div> project not found </div>;
}
