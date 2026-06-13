import { useState, FormEvent } from "react";
import { Plus, X } from "lucide-react";
import type { NewTaskInput, TaskPriority } from "../lib/types";

const CATEGORIES = ["geral", "estudo", "trabalho", "pessoal", "saude"];

export default function NewTaskForm({ onAdd }: { onAdd: (input: NewTaskInput) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("geral");
  const [priority, setPriority] = useState<TaskPriority>("media");
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      priority,
      due_date: dueDate || null,
    });
    setSaving(false);
    setTitle("");
    setDescription("");
    setCategory("geral");
    setPriority("media");
    setDueDate("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 border border-dashed border-border rounded-xl py-3 text-muted hover:text-accent hover:border-accent transition mb-6"
      >
        <Plus size={18} />
        Nova tarefa
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-panel border border-border rounded-xl p-4 mb-6 space-y-3"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Nova tarefa</h3>
        <button type="button" onClick={() => setOpen(false)} className="text-muted hover:text-white">
          <X size={18} />
        </button>
      </div>

      <input
        autoFocus
        type="text"
        required
        placeholder="O que precisa ser feito?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-panel2 border border-border rounded-lg px-3 py-2 outline-none focus:border-accent"
      />

      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className="w-full bg-panel2 border border-border rounded-lg px-3 py-2 outline-none focus:border-accent resize-none"
      />

      <div className="grid grid-cols-3 gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-panel2 border border-border rounded-lg px-2 py-2 text-sm outline-none focus:border-accent"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="bg-panel2 border border-border rounded-lg px-2 py-2 text-sm outline-none focus:border-accent"
        >
          <option value="baixa">Prioridade baixa</option>
          <option value="media">Prioridade média</option>
          <option value="alta">Prioridade alta</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-panel2 border border-border rounded-lg px-2 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-accent hover:bg-accent/90 transition rounded-lg py-2 font-medium disabled:opacity-60"
      >
        {saving ? "Salvando..." : "Adicionar tarefa"}
      </button>
    </form>
  );
}
