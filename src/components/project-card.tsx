import { Link } from "@tanstack/react-router";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  // ItemFooter,
  ItemTitle,
} from "@/components/ui/item";
import { Progress } from "./ui/progress";
import type { Project, Task } from "@/types";
import ProjectBadge from "./project-badge";

const ProjectCard = ({
  project,
  tasks,
}: {
  project: Project;
  tasks: Task[];
}) => {
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const progress = tasks.length
    ? Math.trunc((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <Item asChild variant="outline">
      <Link
        to="/projects/$projectId"
        params={{
          projectId: project.id,
        }}
      >
        <ItemContent>
          <ItemTitle>{project.title}</ItemTitle>
          <ItemDescription>{project.description}</ItemDescription>
          <ProjectBadge status={project.status} />
        </ItemContent>

        <ItemFooter className="flex-col">
          <div className="flex self-stretch justify-between">
            <div className="text-muted-foreground text-xs">Progress</div>
            <div className="text-muted-foreground text-xs">{progress}%</div>
          </div>
          <Progress value={progress} className="w-full" />
        </ItemFooter>
      </Link>
    </Item>
  );
};

export default ProjectCard;
