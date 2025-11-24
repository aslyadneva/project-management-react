import MyTasks from "@/components/my-tasks";
import ProjectForm from "@/components/create-project-form";
import ProjectsOverview from "@/components/projects-overview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCreateProject, useProjects } from "@/hooks/projects";
import { useTasks } from "@/hooks/tasks";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: projects } = useProjects();
  const { data: tasks } = useTasks();
  const { mutate } = useCreateProject();

  return (
    <div className="p-8 flex flex-1 flex-col gap-4">
      {projects && tasks && (
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
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <Plus /> New Project
            </Button>
          </div>

          <div className="dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Total Projects</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {projects.length}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
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
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="text-muted-foreground">Assigned to me</div>
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Overdue</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  0
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="text-muted-foreground">need attention</div>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <ProjectsOverview projects={projects} />
            <MyTasks tasks={tasks} />
          </div>
        </>
      )}
      <Dialog open={isModalOpen}>
        <DialogContent
          className="sm:max-w-md"
          showCloseButton={false}
          onPointerDownOutside={() => setIsModalOpen(false)}
        >
          <ProjectForm
            handleSubmit={(data) => mutate(data)}
            closeModal={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
