"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const initial: ContactFormState = { success: false, message: "" };

const inputClass =
  "w-full rounded-xl glass px-4 py-3 text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/50 min-h-[44px]";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initial);

  return (
    <form action={action} className="glass rounded-2xl p-6 md:p-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-secondary">
            Name *
          </label>
          <input id="name" name="name" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-secondary">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-text-secondary">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+91 ..." />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-medium text-text-secondary">
            Service Needed
          </label>
          <select id="service" name="service" className={cn(inputClass, "cursor-pointer")}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name} className="bg-bg-card">
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-text-secondary">
            Project Budget
          </label>
          <select id="budget" name="budget" className={cn(inputClass, "cursor-pointer")}>
            <option value="">Select budget range</option>
            {siteConfig.budgetOptions.map((b) => (
              <option key={b} value={b} className="bg-bg-card">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-secondary">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(inputClass, "resize-none")}
          placeholder="Tell us about your project..."
        />
      </div>
      {state.message && (
        <p
          className={cn(
            "text-sm rounded-lg px-4 py-3",
            state.success ? "bg-success/10 text-success" : "bg-red-500/10 text-red-400"
          )}
          role="status"
          aria-live="polite"
        >
          {state.message}
        </p>
      )}
      <Button type="submit" variant="primary" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
