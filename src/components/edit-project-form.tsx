import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { ProjectsTableStatus } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  status: z.enum(["Active", "Planning", "Completed"]),
});

interface Form {
  handleSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultValues: {
    title: string;
    description: string;
    status: ProjectsTableStatus;
  };
  status: "idle" | "error" | "success" | "pending";
}

const EditProjectForm = ({ handleSubmit, defaultValues, status }: Form) => {
  const {
    handleSubmit: handleRHFSubmit,
    control,
    formState: { isDirty, dirtyFields, isSubmitSuccessful },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues.title,
      description: defaultValues.description,
      status: defaultValues.status,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    type FieldKey = keyof typeof dirtyFields;

    // Only submit the fields that have been modified
    const dataToSubmit = (Object.keys(dirtyFields) as Array<FieldKey>).reduce(
      (
        acc: {
          [key in FieldKey]?: string;
        },
        field
      ) => {
        acc[field] = data[field];
        return acc;
      },
      {}
    );

    handleSubmit(dataToSubmit as z.infer<typeof formSchema>);
  }

  useEffect(() => {
    if (isSubmitSuccessful && status === "success") {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, status, reset]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-edit-project" onSubmit={handleRHFSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Project Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    // placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Project Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      // placeholder="I'm having an issue with the login button on mobile."
                      rows={1}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Status</FieldLabel>
                    <Select
                      name={field.name}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="checkout-exp-month-ts6">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="form-edit-project"
          disabled={!isDirty || status === "pending"}
        >
          {status === "pending" && <Spinner />}
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditProjectForm;
