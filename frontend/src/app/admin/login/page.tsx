"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Shield, Mail, Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://covisualise-backend.onrender.com";

  // CHECK EXISTING LOGIN
  useEffect(() => {
    const checkSession = async () => {
      try {

        const token =
          localStorage.getItem("vc_admin_token");

        if (!token) return;

        const res = await fetch(
          `${BACKEND_URL}/api/admin/stats`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },

            cache: "no-store",
          }
        );

        if (res.ok) {
          router.replace("/admin");
        }

      } catch (err) {
        console.error("Session check failed:", err);
      }
    };

    checkSession();
  }, [router, BACKEND_URL]);

  // LOGIN
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {

      const res = await fetch(
        `${BACKEND_URL}/api/admin/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      let data: any = {};

      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
  throw new Error(data?.message || "Login failed.");
}

console.log("LOGIN RESPONSE:", data);

// SAVE ONLY REAL TOKEN
localStorage.setItem(
  "vc_admin_token",
  data.token
);

router.push("/admin");

    } catch (err) {

      console.error("Admin login error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Unable to login.";

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
          <GlassCard
            hover={false}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-accent" />

              <h2 className="font-display text-xl font-semibold">
                Secure access
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* EMAIL */}
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
                    placeholder="visualiseco@gmail.com"
                    required
                    className="w-full bg-transparent text-sm text-white outline-none"
                  />
                </div>
              </label>

              {/* PASSWORD */}
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

              {/* ERROR */}
              {error && (
                <p className="text-sm text-red-400">
                  {error}
                </p>
              )}

              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading
                  ? "Signing in..."
                  : "Sign in"}

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