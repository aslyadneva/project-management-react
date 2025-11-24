import { type ColumnDef } from "@tanstack/react-table";
import DataTable from "./data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useUpdateTask } from "@/hooks/tasks";
import type { Task } from "@/types";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorFn: (row) => row.project.title,
    header: "Project",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row, table }) => (
      <Select
        defaultValue={row.original.status}
        onValueChange={(value) => {
          table.options.meta?.updateStatus(row.original.id, value);
        }}
      >
        <SelectTrigger
          id="checkout-exp-month-ts6"
          className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
          size="sm"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">Todo</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
];

const TasksTable = ({ tasks }: { tasks: Task[] }) => {
  const { mutate } = useUpdateTask();
  return (
    <DataTable
      columns={columns}
      data={tasks}
      handleUpdateStatus={(taskId: string, value: string) =>
        mutate({ taskId: taskId, value: value })
      }
    />
  );
};

export default TasksTable;
