import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "./ui/card";
import { Item, ItemContent, ItemTitle, ItemDescription } from "./ui/item";

const tasks: Task[] = [
  {
    title: "UI/UX Design Mockups",
    description: "Create design mockups for the new mobile app interface.",
  },
  { title: "Androip App Development", description: "feature - high priority" },
  {
    title: "Backend API Integration",
    description: "Integrate third-party APIs for payment processing.",
  },
];

const MyTasks = () => {
  return (
    <Card>
      <CardHeader className="border-b items-center">
        <CardTitle className="row-span-full">My Tasks</CardTitle>
        <CardAction>
          <Button variant="link">View All</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <Item variant="muted" key={task.title}>
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

{
  /* <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge> */
}
