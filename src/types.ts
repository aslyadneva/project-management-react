type Project = {
  id: string;
  title: string;
  description: string;
  status: "Active" | "Planning";
  progress: number;
  date: string;
  members: Member[];
};

type Task = {
  title: string;
  description: string;
};

type Member = {};
