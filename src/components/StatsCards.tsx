import { ListTodo, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import type { Task } from "../lib/types";

export default function StatsCards({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const pendentes = tasks.filter((t) => t.status === "pendente").length;
  const andamento = tasks.filter((t) => t.status === "em_andamento").length;
  const concluidas = tasks.filter((t) => t.status === "concluida").length;
  const progresso = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  const cards = [
    { label: "Total de tarefas", value: total, icon: ListTodo, color: "text-blue-400 bg-blue-950/40" },
    { label: "Pendentes", value: pendentes, icon: Clock, color: "text-orange-400 bg-orange-950/40" },
    { label: "Em andamento", value: andamento, icon: TrendingUp, color: "text-accent bg-purple-950/40" },
    { label: "Concluídas", value: concluidas, icon: CheckCircle2, color: "text-accent2 bg-green-950/40" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-panel border border-border rounded-xl p-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${color}`}>
              <Icon size={20} />
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-muted">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-panel border border-border rounded-xl p-4 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted">Progresso geral do dia</span>
          <span className="font-medium">{progresso}%</span>
        </div>
        <div className="w-full h-2 bg-panel2 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent2 transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>
    </div>
  );
}
