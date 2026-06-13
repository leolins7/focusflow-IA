import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/AuthContext";
import type { Task, NewTaskInput, TaskStatus } from "../lib/types";

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setTasks(data as Task[]);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function addTask(input: NewTaskInput) {
    if (!user) return;
    const { data, error } = await supabase
      .from("tasks")
      .insert({ ...input, user_id: user.id })
      .select()
      .single();

    if (error) setError(error.message);
    else setTasks((prev) => [data as Task, ...prev]);
  }

  async function updateStatus(id: string, status: TaskStatus) {
    const { data, error } = await supabase
      .from("tasks")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) setError(error.message);
    else setTasks((prev) => prev.map((t) => (t.id === id ? (data as Task) : t)));
  }

  async function deleteTask(id: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) setError(error.message);
    else setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return { tasks, loading, error, addTask, updateStatus, deleteTask, refresh: fetchTasks };
}
