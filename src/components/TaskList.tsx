import { Trash2, Circle, CircleDot, CheckCircle2, Calendar } from "lucide-react";
import type { Task, TaskStatus } from "../lib/types";

const PRIORITY_STYLES: Record<string, string> = {
  baixa: "bg-blue-950/40 text-blue-400 border-blue-900",
  media: "bg-orange-950/40 text-orange-400 border-orange-900",
  alta: "bg-red-950/40 text-red-400 border-red-900",
};

const STATUS_ORDER: TaskStatus[] = ["pendente", "em_andamento", "concluida"];
const STATUS_LABELS: Record<TaskStatus, string> = {
  pendente: "Pendente",
  em_andamento: "Em andamento",
  concluida: "Concluída",
};
const STATUS_ICONS: Record<TaskStatus, typeof Circle> = {
  pendente: Circle,
  em_andamento: CircleDot,
  concluida: CheckCircle2,
};

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, loading, onStatusChange, onDelete }: TaskListProps) {
  if (loading) {
    return <p className="text-muted text-center py-8">Carregando tarefas...</p>;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted">
        <p className="text-lg mb-1">Nenhuma tarefa por aqui ✨</p>
        <p className="text-sm">Adicione sua primeira tarefa para começar o dia com foco.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const StatusIcon = STATUS_ICONS[task.status];
        const nextStatus = STATUS_ORDER[(STATUS_ORDER.indexOf(task.status) + 1) % STATUS_ORDER.length];

        return (
          <div
            key={task.id}
            className={`bg-panel border border-border rounded-xl p-4 flex items-start gap-3 transition ${
              task.status === "concluida" ? "opacity-60" : ""
            }`}
          >
            <button
              onClick={() => onStatusChange(task.id, nextStatus)}
              title={`Marcar como "${STATUS_LABELS[nextStatus]}"`}
              className={`mt-0.5 flex-shrink-0 ${
                task.status === "concluida" ? "text-accent2" : "text-muted hover:text-accent"
              }`}
            >
              <StatusIcon size={22} />
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`font-medium ${task.status === "concluida" ? "line-through" : ""}`}>
                  {task.title}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${PRIORITY_STYLES[task.priority]}`}>
                  {task.priority}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-panel2 text-muted border border-border">
                  {task.category}
                </span>
              </div>
              {task.description && (
                <p className="text-sm text-muted mt-1">{task.description}</p>
              )}
              <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                <span>{STATUS_LABELS[task.status]}</span>
                {task.due_date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(task.due_date + "T00:00:00").toLocaleDateString("pt-BR")}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onDelete(task.id)}
              className="text-muted hover:text-red-400 flex-shrink-0"
              title="Excluir tarefa"
            >
              <Trash2 size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
