export type TaskPriority = "baixa" | "media" | "alta";
export type TaskStatus = "pendente" | "em_andamento" | "concluida";

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewTaskInput {
  title: string;
  description?: string;
  category: string;
  priority: TaskPriority;
  due_date?: string | null;
}
