import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/components/ui/item";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Calendar, UsersRound } from "lucide-react";
import { Link } from "@tanstack/react-router";

const ProjectOverViewItem = ({ project }: { project: Project }) => {
  return (
    <Item>
      {/* <Link to={"/projects/$projectId"} params={{ projectId: project.id }}> */}
      <ItemContent>
        <ItemTitle>
          <h2 className="text-lg leading-none font-semibold">
            {project.title}
          </h2>
        </ItemTitle>
        <ItemDescription>{project.description}</ItemDescription>
        <div className="flex gap-2">
          <Badge variant="outline">
            <UsersRound />
            {project.members.length} members
          </Badge>
          <Badge variant="outline">
            <Calendar />
            {project.date}
          </Badge>
        </div>
      </ItemContent>

      <ItemActions>
        <Badge>{project.status}</Badge>
      </ItemActions>
      <ItemFooter className="flex-col">
        <div className="flex self-stretch justify-between">
          <div className="text-muted-foreground text-xs">Progress</div>
          <div className="text-muted-foreground text-xs">
            {project.progress}%
          </div>
        </div>
        <Progress value={project.progress} className="w-full" />
      </ItemFooter>
      {/* </Link> */}
    </Item>
  );
};

export default ProjectOverViewItem;
