import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "./ui/card";
import { Item, ItemContent, ItemTitle, ItemDescription } from "./ui/item";
import type { Task } from "@/types";

const MyTasks = ({ tasks }: { tasks: Task[] }) => {
  return (
    <Card>
      <CardHeader className="border-b items-center">
        <CardTitle className="row-span-full">My Tasks</CardTitle>
        <CardAction>
          <Link to={"/tasks"}>
            <Button variant="link">View All</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <Item variant="muted" key={task.id}>
              <ItemContent>
                <ItemTitle>{task.title}</ItemTitle>
                <ItemDescription>{task.description}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyTasks;
