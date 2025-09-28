import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFound from "@/pages/not-found";
import * as api from "@/services/api";
import { useEffect, useState } from "react";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const [state, setState] = useState<"loading" | "ok" | "unauth">("loading");
  useEffect(() => {
    let mounted = true;
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        if (mounted) setState("unauth");
        return;
      }
      try {
        // validate token with server
        await api.getCurrentUser();
        if (mounted) setState("ok");
      } catch {
        // invalid token -> clear & redirect
        localStorage.removeItem("token");
        if (mounted) setState("unauth");
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (state === "loading") return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (state === "unauth") return <Redirect to="/login" />;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/login" />} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={() => <ProtectedRoute component={DashboardPage} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
