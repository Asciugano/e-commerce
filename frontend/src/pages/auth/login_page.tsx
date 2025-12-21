import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AxiosError } from "axios";
import { api } from "../../lib/axios";

export default function LoginPage() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassw, setShowPassw] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", formData);
      const user = res.data;

      login(user);

      navigate("/");
    } catch (e) {
      console.error(e);

      const err = e as AxiosError<{ message?: string }>;

      if (err.response?.data.message)
        setError(err.response.data.message);
      else if (typeof err.response?.data === "string")
        setError(err.response.data);
      else
        setError("Ops... Something went wrong");

      setFormData({ ...formData, password: "" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-neutral-300 dark:bg-neutral-700 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Log In
        </h2>
        {(error && error.length > 0) && (
          <h2 className="text-sm text-red-500 text-center mb-6">{error}</h2>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* email */}
          <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-emerald-400">
            <Mail size={20} className="text-neutral-500 dark:text-neutral-400" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
              required
            />
          </div>

          {/* password */}
          <div className="flex items-center gap-3 border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 focus-within:ring-emerald-400">
            <Lock size={20} className="text-neutral-500 dark:text-neutral-400" />
            <input
              type={showPassw ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-transparent outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-500"
              required
            />
            <button onClick={() => setShowPassw(!showPassw)} type="button">
              {showPassw ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg px-4 py-2 transition disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-sm text-center mt-8">You don't have an account? <Link to="/register" className="text-sm text-emerald-400">Register</Link></p>
      </div>
    </div>
  );
}
