import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { ProjectsContext } from "@/providers/projectsProvider";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
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
    return (
      <div className="p-8 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="scroll-m-20 text-2xl  font-boldt racking-tight text-balance">
              {project.title}
            </h1>
            <Badge>{project.status}</Badge>
          </div>

          <Button variant="outline" size="sm">
            <Plus /> New Task
          </Button>
        </div>

        <div className="dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 md:grid-cols-4  ">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Tasks</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                3
              </CardTitle>
              <CardAction></CardAction>
            </CardHeader>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                0
              </CardTitle>
              <CardAction></CardAction>
            </CardHeader>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>In Progress</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                3
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
          <Card className="@container/card">
            <CardHeader className="border-b">
              <CardTitle>Team Members (3)</CardTitle>
              <CardAction></CardAction>
            </CardHeader>
            <CardContent>
              <Item>
                <ItemContent>
                  <ItemTitle>oliverwatts@example.com</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <Badge variant={"outline"}>Team Lead</Badge>
                </ItemActions>
              </Item>
              <Item>
                <ItemContent>
                  <ItemTitle>alexsmith@example.com</ItemTitle>
                </ItemContent>
              </Item>
              <Item>
                <ItemContent>
                  <ItemTitle>johnwarrel@example.com</ItemTitle>
                </ItemContent>
              </Item>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  return <div> project not found </div>;
}
