import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { ItemGroup } from "./ui/item";
import ProjectOverViewItem from "./project-overview-item";

const ProjectsOverview = ({ projects }: { projects: Project[] }) => {
  return (
    <Card className="h-full ">
      <CardHeader className="border-b items-center">
        <CardTitle className="row-span-full">Project Overview</CardTitle>
        <CardAction>
          <Button variant="link">View All</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {projects.map((project) => (
            <ProjectOverViewItem key={project.title} project={project} />
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default ProjectsOverview;
