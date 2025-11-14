import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/components/ui/item";

const ProjectCard = ({ project }: { project: Project }) => {
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
          <Badge>{project.status}</Badge>
        </ItemContent>

        <ItemFooter className="flex-col">
          <div className="flex self-stretch justify-between">
            <div className="text-muted-foreground text-xs">Progress</div>
            <div className="text-muted-foreground text-xs">
              {project.progress}%
            </div>
          </div>
          <Progress value={project.progress} className="w-full" />
        </ItemFooter>
      </Link>
    </Item>
  );
};

export default ProjectCard;
