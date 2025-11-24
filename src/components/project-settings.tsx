import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { Badge } from "./ui/badge";
import EditProjectForm from "./edit-project-form";
import { type Project } from "@/types";
import { useUpdateProject } from "@/hooks/projects";

const teamMembers = [
  { email: "oliverwatts@example.com", role: "Team Lead" },
  { email: "alexsmith@example.com" },
  { email: "johnwarrel@example.com" },
];

const ProjectSettings = ({ project }: { project: Project }) => {
  const { mutate, status } = useUpdateProject();

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
      <EditProjectForm
        handleSubmit={(data) => {
          mutate({ projectId: project.id, data: data });
        }}
        status={status}
        defaultValues={{
          title: project.title,
          description: project.description,
          status: project.status,
        }}
      />
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Team Members (3)</CardTitle>
        </CardHeader>
        <CardContent>
          {teamMembers.map((member) => (
            <Item className="px-0" key={member.email}>
              <ItemContent>
                <ItemTitle>{member.email}</ItemTitle>
              </ItemContent>
              {member.role && (
                <ItemActions>
                  <Badge variant={"outline"}>{member.role}</Badge>
                </ItemActions>
              )}
            </Item>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectSettings;
