import { createTask, getTasks, updateTask } from "@/api/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (error) => alert(error),
  });
}

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (error) => alert(error),
  });
}
