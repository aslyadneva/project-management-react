import { Badge } from "@/components/ui/badge";
import type { ProjectsTableStatus } from "@/types";

const ProjectBadge = ({ status }: { status: ProjectsTableStatus }) => {
  return (
    <Badge
      variant={
        status === "Active"
          ? "default"
          : status === "Planning"
            ? "outline"
            : "secondary"
      }
    >
      {status}
    </Badge>
  );
};

export default ProjectBadge;
