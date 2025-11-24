import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import TaskForm from "@/components/task-form";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

import TasksTable from "@/components/tasks-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectSettings from "@/components/project-settings";
import { useProjects } from "@/hooks/projects";
import { useCreateTask, useTasks } from "@/hooks/tasks";
import ProjectBadge from "@/components/project-badge";

export const Route = createFileRoute("/projects/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = Route.useParams();

  const {
    data: projects,
    isError,
    isLoading: isProjectsLoading,
  } = useProjects();
  const { data: tasks, isLoading: isTasksLoading } = useTasks();
  const { mutate } = useCreateTask();

  const project = projects?.filter(
    (project) => project.id === params.projectId
  )[0];

  if (isProjectsLoading || isTasksLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  if (project && tasks) {
    const tasksForProject = tasks.filter(
      (task) => task.project.id === params.projectId
    );

    const completedTasks = tasksForProject.filter(
      (task) => task.status === "completed"
    );
    const inProgressTasks = tasksForProject.filter(
      (task) => task.status === "in-progress"
    );

    return (
      <div className="p-8 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="scroll-m-20 text-2xl  font-boldt racking-tight text-balance">
              {project.title}
            </h1>
            <ProjectBadge status={project.status} />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus /> New Task
          </Button>
        </div>

        <div className="dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4  ">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Tasks</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {tasksForProject.length}
              </CardTitle>
              <CardAction></CardAction>
            </CardHeader>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {completedTasks.length}
              </CardTitle>
              <CardAction></CardAction>
            </CardHeader>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>In Progress</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {inProgressTasks.length}
              </CardTitle>
              <CardAction></CardAction>
            </CardHeader>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Team Members</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                3
              </CardTitle>
              <CardAction></CardAction>
            </CardHeader>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="tasks">
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks">
              <TasksTable tasks={tasksForProject} />
            </TabsContent>
            <TabsContent value="settings">
              <ProjectSettings project={project} />
            </TabsContent>
          </Tabs>
        </div>
        <Dialog open={isModalOpen}>
          <DialogContent
            className="sm:max-w-md"
            showCloseButton={false}
            onPointerDownOutside={() => setIsModalOpen(false)}
          >
            <TaskForm
              handleSubmit={({ title, description }) => {
                mutate({
                  title,
                  description,
                  projectId: project.id,
                });
                setIsModalOpen(false);
              }}
              closeModal={() => {}}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  return <div> project not found </div>;
}
