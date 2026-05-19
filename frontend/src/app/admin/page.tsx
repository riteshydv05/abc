"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  RefreshCcw,
  Shield,
  Users,
  FileText,
  MessageSquare,
  Phone,
  Briefcase,
  LogOut,
} from "lucide-react";

const apiBase = "/api/admin";

type StatsResponse = {
  contacts: { total: number; new: number };
  quotes: { total: number; pending: number };
  subscribers: { active: number };
  recent: {
    contacts: ContactRecord[];
    quotes: QuoteRecord[];
  };
};

type ContactRecord = {
  _id: string;
  name: string;
  email: string;
  phone?: string | null;
  service?: string;
  budget?: string;
  message?: string;
  status?: string;
  createdAt?: string;
};

type QuoteRecord = {
  _id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  services?: string[];
  plan?: string;
  budget?: string | null;
  timeline?: string;
  projectDescription?: string;
  status?: string;
  createdAt?: string;
};

type PaginatedResponse<T> = {
  data: T[];
  pagination: { total: number; page: number; limit: number; pages: number };
};

function formatDate(value?: string) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleString();
}

function truncate(text?: string, max = 140) {
  if (!text) return "N/A";
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3)}...`;
}

function formatServices(services?: string[]) {
  if (!services || services.length === 0) return "N/A";
  return services.join(", ");
}

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchJson = useCallback(async <T,>(url: string): Promise<T> => {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = data?.message || "Request failed.";
      const err = new Error(message) as Error & { status?: number };
      err.status = res.status;
      throw err;
    }
    return data as T;
  }, []);

  const clearSession = useCallback(() => {
    setAuthenticated(false);
    setStats(null);
    setContacts([]);
    setQuotes([]);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // Ignore logout failures; local state will still clear
    }
    clearSession();
    router.push("/admin/login");
  }, [clearSession, router]);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [statsRes, contactsRes, quotesRes] = await Promise.all([
        fetchJson<{ success: boolean; data: StatsResponse }>(`${apiBase}/stats`),
        fetchJson<{ success: boolean } & PaginatedResponse<ContactRecord>>(
          `${apiBase}/contacts?limit=20`
        ),
        fetchJson<{ success: boolean } & PaginatedResponse<QuoteRecord>>(
          `${apiBase}/quotes?limit=20`
        ),
      ]);

      setStats(statsRes.data);
      setContacts(contactsRes.data || []);
      setQuotes(quotesRes.data || []);
      setLastUpdated(new Date().toLocaleString());
      setAuthenticated(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to load admin data.";
      setError(message);
      const status = err && typeof err === "object" && "status" in err ? (err as any).status : 0;
      if (status === 401) {
        clearSession();
        router.push("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  }, [clearSession, fetchJson, router]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <>
      <PageHeader
        label="Admin"
        title="Admin Dashboard"
        description="Monitor quotes, contact queries, and subscriber activity in one place."
      />

      <Container className="pb-16">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <GlassCard hover={false} className="space-y-4">
            <div className="flex items-center gap-3 text-text-primary">
              <Shield className="h-5 w-5 text-accent" />
              <h2 className="font-display text-xl font-semibold">Admin Session</h2>
            </div>
            {authenticated ? (
              <>
                <p className="text-sm text-text-secondary">
                  Signed in. You can refresh the dashboard any time.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={handleLogout} className="px-5">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-text-secondary">
                  No active admin session. Sign in to unlock protected dashboard data.
                </p>
                <Button href="/admin/login" className="px-5">
                  Sign in
                </Button>
              </>
            )}
          </GlassCard>

          <GlassCard hover={false} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                  Status
                </p>
                <p className="mt-2 text-sm text-text-primary">
                  {authenticated ? "Authenticated" : "Not signed in"}
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={loadDashboard}
                disabled={loading}
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
            <div className="space-y-1 text-sm text-text-secondary">
              <p>Last updated: {lastUpdated || "N/A"}</p>
              {loading && <p className="text-text-primary">Loading dashboard data...</p>}
              {error && <p className="text-accent">{error}</p>}
            </div>
          </GlassCard>
        </div>

        {authenticated && (
          <>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <GlassCard hover={false} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="text-xs text-text-secondary">Subscribers</span>
                </div>
                <p className="font-display text-3xl font-semibold">
                  {stats?.subscribers?.active ?? 0}
                </p>
                <p className="text-sm text-text-secondary">Active newsletter subscribers</p>
              </GlassCard>

              <GlassCard hover={false} className="space-y-3">
                <div className="flex items-center justify-between">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  <span className="text-xs text-text-secondary">Queries</span>
                </div>
                <p className="font-display text-3xl font-semibold">
                  {stats?.contacts?.total ?? 0}
                </p>
                <p className="text-sm text-text-secondary">Total contact queries</p>
              </GlassCard>

              <GlassCard hover={false} className="space-y-3">
                <div className="flex items-center justify-between">
                  <FileText className="h-5 w-5 text-accent" />
                  <span className="text-xs text-text-secondary">Quotes</span>
                </div>
                <p className="font-display text-3xl font-semibold">
                  {stats?.quotes?.total ?? 0}
                </p>
                <p className="text-sm text-text-secondary">Quote requests received</p>
              </GlassCard>

              <GlassCard hover={false} className="space-y-3">
                <div className="flex items-center justify-between">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  <span className="text-xs text-text-secondary">New</span>
                </div>
                <p className="font-display text-3xl font-semibold">
                  {stats?.contacts?.new ?? 0}
                </p>
                <p className="text-sm text-text-secondary">New contact queries</p>
              </GlassCard>
            </div>

            <section className="mt-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                    Contact Queries
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary">
                    People who contacted us
                  </h2>
                </div>
                <p className="text-sm text-text-secondary">
                  Showing {contacts.length} most recent records
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {contacts.map((contact) => (
                  <GlassCard key={contact._id} hover={false} className="space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-lg font-semibold text-text-primary">
                          {contact.name}
                        </p>
                        <p className="text-sm text-text-secondary">{contact.email}</p>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary">
                        {contact.status || "N/A"}
                      </span>
                    </div>

                    <div className="grid gap-2 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-accent" />
                        <span>{contact.phone || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-accent" />
                        <span>{contact.service || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-[0.2em]">Budget</span>
                        <span>{contact.budget || "N/A"}</span>
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary">
                      {truncate(contact.message, 180)}
                    </p>

                    <p className="text-xs text-text-secondary">
                      Received: {formatDate(contact.createdAt)}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Quotes</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary">
                    Quote requests received
                  </h2>
                </div>
                <p className="text-sm text-text-secondary">
                  Showing {quotes.length} most recent records
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {quotes.map((quote) => (
                  <GlassCard key={quote._id} hover={false} className="space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-lg font-semibold text-text-primary">
                          {quote.name}
                        </p>
                        <p className="text-sm text-text-secondary">{quote.email}</p>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary">
                        {quote.status || "N/A"}
                      </span>
                    </div>

                    <div className="grid gap-2 text-sm text-text-secondary">
                      <p>Company: {quote.company || "N/A"}</p>
                      <p>Plan: {quote.plan || "N/A"}</p>
                      <p>Services: {formatServices(quote.services)}</p>
                      <p>Budget: {quote.budget || "N/A"}</p>
                    </div>

                    <p className="text-sm text-text-secondary">
                      {truncate(quote.projectDescription, 180)}
                    </p>

                    <p className="text-xs text-text-secondary">
                      Received: {formatDate(quote.createdAt)}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </section>
          </>
        )}
      </Container>
    </>
  );
}
