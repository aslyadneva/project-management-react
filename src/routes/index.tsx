import MyTasks from "@/components/my-tasks";
import ProjectsOverview from "@/components/projects-overview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProjectsContext } from "@/providers/projectsProvider";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { useContext } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { projects } = useContext(ProjectsContext);

  return (
    <div className="p-8 flex flex-1 flex-col gap-4">
      {projects && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance">
                Welcome back, User
              </h1>
              <p className="text-muted-foreground ">
                Here's what's happening with your projects today.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              // onClick={() =>
              //   setIsCreateProjectModalOpen(!isCreateProjectModalOpen)
              // }
            >
              <Plus /> New Project
            </Button>
          </div>

          <div className="dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Total Projects</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {projects.length}
                </CardTitle>
                <CardAction>
                  {/* <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge> */}
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div> */}
                <div className="text-muted-foreground">
                  Projects in Cloud Ops Hub
                </div>
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Completed Projects</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  0
                </CardTitle>
                <CardAction>
                  {/* <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge> */}
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div> */}
                <div className="text-muted-foreground">
                  of {projects.length} total
                </div>
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>My Tasks</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  1
                </CardTitle>
                <CardAction>
                  {/* <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge> */}
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div> */}
                <div className="text-muted-foreground">Assigned to me</div>
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Overdue</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  0
                </CardTitle>
                <CardAction>
                  {/* <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge> */}
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div> */}
                <div className="text-muted-foreground">need attention</div>
              </CardFooter>
            </Card>
          </div>
          {/* <div className="@container/main flex flex-1 flex-col gap-2">
        Index route
      </div> */}

          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            {/* Project Overview */}
            <ProjectsOverview projects={projects} />
            <MyTasks />
          </div>
        </>
      )}
    </div>
  );
}
