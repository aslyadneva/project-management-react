import React, { useEffect, useState, type ReactNode } from "react";
import {
  tablesDB,
  // APPWRITE_PROJECTS_DATABASE_ID,
  // APPWRITE_PROJECTS_TABLE_ID,
} from "@/lib/appwrite";
import { Query, ID } from "appwrite";

export interface ProjectsContext {
  projects: Project[] | null;
}

interface ProjectsContextProviderProps {
  children: ReactNode;
}

export const ProjectsContext = React.createContext<ProjectsContext>(
  {} as ProjectsContext
);

export const ProjectsProvider: React.FC<ProjectsContextProviderProps> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const response = await tablesDB.listRows({
          databaseId: import.meta.env.VITE_APPWRITE_PROJECTS_DATABASE_ID,
          tableId: import.meta.env.VITE_APPWRITE_PROJECTS_TABLE_ID,
          queries: [Query.orderDesc("$createdAt"), Query.limit(10)],
        });

        const normalized = response.rows.map((row) => ({
          id: row.$id,
          title: row.title,
          description: row.description,
          status: "Active",
          progress: 2,
          date: "Jan 20, 2026",
          members: [],
        }));

        //@ts-ignore
        setProjects(normalized);
      } catch (err) {
        console.log(err);
      }
    }
    init();
  }, []);

  async function createProject(data: { title: string; description: string }) {
    try {
      const response = await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_PROJECTS_DATABASE_ID,
        tableId: import.meta.env.VITE_APPWRITE_PROJECTS_TABLE_ID,
        rowId: ID.unique(),
        data: data,
      });

      setProjects((projects) => [
        {
          id: response.$id,
          title: response.title,
          description: response.description,
          status: "Active",
          progress: 2,
          date: "Jan 20, 2026",
          members: [],
        },
        ...(projects ? projects : []),
      ]);
    } catch (err) {
      console.log(err); // handle error or show user a message
    }
  }

  const value = {
    projects,
    createProject,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
