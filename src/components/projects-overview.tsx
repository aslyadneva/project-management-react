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
import { Link } from "@tanstack/react-router";
import type { Project } from "@/types";

const ProjectsOverview = ({ projects }: { projects: Project[] }) => {
  return (
    <Card className="h-full ">
      <CardHeader className="border-b items-center">
        <CardTitle className="row-span-full">Project Overview</CardTitle>
        <CardAction>
          <Link to={"/projects"}>
            <Button variant="link">View All</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {/* {projects.map((project) => (
            <ProjectOverViewItem key={project.title} project={project} />
          ))} */}
          <ProjectOverViewItem project={projects[0]} />
          <ProjectOverViewItem project={projects[1]} />
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default ProjectsOverview;
