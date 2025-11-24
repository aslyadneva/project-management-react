import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/components/ui/item";
import { Badge } from "./ui/badge";
import { Calendar } from "lucide-react";
import { Progress } from "./ui/progress";
import { Link } from "@tanstack/react-router";
import ProjectBadge from "./project-badge";
import type { Project } from "@/types";

const ProjectOverViewItem = ({ project }: { project: Project }) => {
  const totalTasks = project.tasks.length;

  const completedTasks = project.tasks?.filter(
    (task) => task.status === "completed"
  ).length;

  const progress = totalTasks
    ? Math.trunc((completedTasks / totalTasks) * 100)
    : 0;

  const formattedDate = new Date(project.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Item>
      <ItemContent>
        <ItemTitle>
          <Link to={"/projects/$projectId"} params={{ projectId: project.id }}>
            <h2 className="text-lg leading-none font-semibold">
              {project.title}
            </h2>
          </Link>
        </ItemTitle>

        <ItemDescription>{project.description}</ItemDescription>

        <div className="flex gap-2">
          {/* <Badge variant="outline">
            <UsersRound />
            {project.members.length} members
          </Badge> */}

          <Badge variant="outline">
            <Calendar />
            {/* {project.date} */}
            {formattedDate}
          </Badge>
        </div>
      </ItemContent>

      <ItemActions>
        <ProjectBadge status={project.status} />
      </ItemActions>
      <ItemFooter className="flex-col">
        <div className="flex self-stretch justify-between">
          <div className="text-muted-foreground text-xs">Progress</div>
          <div className="text-muted-foreground text-xs">{progress}%</div>
        </div>
        <Progress value={progress} className="w-full" />
      </ItemFooter>
    </Item>
  );
};

export default ProjectOverViewItem;
