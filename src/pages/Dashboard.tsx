import { useState } from "react";
import { LogOut, CheckCircle2 } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { useTasks } from "../lib/useTasks";
import StatsCards from "../components/StatsCards";
import NewTaskForm from "../components/NewTaskForm";
import TaskList from "../components/TaskList";
import type { TaskStatus } from "../lib/types";

const FILTERS: { value: TaskStatus | "todas"; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "pendente", label: "Pendentes" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "concluida", label: "Concluídas" },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { tasks, loading, addTask, updateStatus, deleteTask } = useTasks();
  const [filter, setFilter] = useState<TaskStatus | "todas">("todas");

  const filteredTasks = filter === "todas" ? tasks : tasks.filter((t) => t.status === filter);
  const userName = (user?.user_metadata?.name as string) || user?.email?.split("@")[0] || "usuário";

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-panel">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-accent2" size={24} />
            <span className="font-bold text-lg">
              Focus<span className="text-accent">Flow</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted hidden sm:inline">Olá, {userName}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-1 text-sm text-muted hover:text-red-400 transition"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-1">Seu painel de foco</h1>
        <p className="text-muted mb-6">Organize seu dia e acompanhe seu progresso.</p>

        <StatsCards tasks={tasks} />

        <NewTaskForm onAdd={addTask} />

        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition border ${
                filter === f.value
                  ? "bg-accent text-white border-accent"
                  : "bg-panel text-muted border-border hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <TaskList
          tasks={filteredTasks}
          loading={loading}
          onStatusChange={updateStatus}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}
