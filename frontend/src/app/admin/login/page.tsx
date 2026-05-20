"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Shield, Mail, Lock, ArrowRight } from "lucide-react";

const apiBase =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "https://covisualise-backend.onrender.com";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check existing session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${apiBase}/api/admin/stats`, {
          cache: "no-store",
          credentials: "include",
        });

        if (res.ok) {
          router.replace("/admin");
        }
      } catch {
        // ignore
      }
    };

    checkSession();
  }, [router]);

  // Handle login
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${apiBase}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
        cache: "no-store",
      });

      let data;

      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response.");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Login failed.");
      }

      setPassword("");

      router.push("/admin");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Login failed.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        label="Admin"
        title="Admin Login"
        description="Sign in to access dashboard analytics and customer enquiries."
      />

      <Container className="pb-16">
        <div className="max-w-2xl">
          <GlassCard hover={false} className="space-y-6">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-accent" />

              <h2 className="font-display text-xl font-semibold">
                Secure access
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm text-text-secondary">
                Email

                <div className="mt-2 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-3">
                  <Mail className="h-4 w-4 text-accent" />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="admin@visualise.co"
                    required
                    className="w-full bg-transparent text-sm text-white outline-none"
                  />
                </div>
              </label>

              <label className="block text-sm text-text-secondary">
                Password

                <div className="mt-2 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-3">
                  <Lock className="h-4 w-4 text-accent" />

                  <input
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    required
                    className="w-full bg-transparent text-sm text-white outline-none"
                  />
                </div>
              </label>

              {error && (
                <p className="text-sm text-accent">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}

                {!loading && (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </form>
          </GlassCard>
        </div>
      </Container>
    </>
  );
}