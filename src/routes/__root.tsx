import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { ProjectsProvider } from "@/providers/projectsProvider";

export const Route = createRootRoute({
  component: () => (
    <>
      <ProjectsProvider>
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b"></header>

            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </ProjectsProvider>

      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
});
