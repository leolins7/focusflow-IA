import { useState, FormEvent } from "react";
import { useAuth } from "../lib/AuthContext";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    if (mode === "login") {
      const { error } = await signIn(email, password);
      if (error) setError(error);
    } else {
      const { error } = await signUp(email, password, name);
      if (error) setError(error);
      else setInfo("Conta criada! Verifique seu e-mail para confirmar o cadastro (ou faça login se a confirmação estiver desativada).");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <CheckCircle2 className="text-accent2" size={32} />
          <h1 className="text-2xl font-bold">
            Focus<span className="text-accent">Flow</span>
          </h1>
        </div>

        <div className="bg-panel border border-border rounded-2xl p-8 shadow-xl">
          <div className="flex mb-6 bg-panel2 rounded-lg p-1">
            <button
              onClick={() => { setMode("login"); setError(null); setInfo(null); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                mode === "login" ? "bg-accent text-white" : "text-muted"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => { setMode("register"); setError(null); setInfo(null); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                mode === "register" ? "bg-accent text-white" : "text-muted"
              }`}
            >
              Criar conta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm text-muted mb-1">Nome</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-panel2 border border-border rounded-lg px-3 py-2 outline-none focus:border-accent"
                  placeholder="Seu nome"
                />
              </div>
            )}
            <div>
              <label className="block text-sm text-muted mb-1">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-panel2 border border-border rounded-lg px-3 py-2 outline-none focus:border-accent"
                placeholder="voce@email.com"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Senha</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-panel2 border border-border rounded-lg px-3 py-2 outline-none focus:border-accent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
            {info && (
              <div className="text-sm text-accent2 bg-green-950/40 border border-green-900 rounded-lg px-3 py-2">
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 transition rounded-lg py-2.5 font-medium disabled:opacity-60"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {mode === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>
        </div>

        <p className="text-center text-muted text-sm mt-6">
          Sistema de gerenciamento de tarefas — Vibe Coding 🚀
        </p>
      </div>
    </div>
  );
}
