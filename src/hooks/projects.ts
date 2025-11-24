import { createProject, getProjects, updateProject } from "@/api/projects";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (error) => alert(error),
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (error) => alert(error),
  });
}
