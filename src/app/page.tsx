"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  MapPin, 
  Building2, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  FileText,
  Clock,
  ArrowLeft,
  Info
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [activeView, setActiveView] = useState<"hero" | "features" | "dashboard" | "ai">("hero");

  const categories = [
    {
      id: "civic",
      title: "Civic Infrastructure",
      description: "Report potholes, broken streetlights, or water leakages directly to the municipal department.",
      icon: <MapPin className="h-10 w-10 text-blue-500" />,
      color: "blue",
      items: ["Potholes", "Garbage", "Streetlights", "Water Leakage"]
    },
    {
      id: "governance",
      title: "Governance Negligence",
      description: "Track delays in government services, pending files, or non-responsive officials with full transparency.",
      icon: <Building2 className="h-10 w-10 text-amber-500" />,
      color: "amber",
      items: ["Pending Files", "Service Delays", "Officer Conduct", "Transparency"]
    },
    {
      id: "safety",
      title: "Public Safety & Crime",
      description: "Securely report harassment, public violence, or illegal activities with encrypted evidence handling.",
      icon: <Shield className="h-10 w-10 text-rose-500" />,
      color: "rose",
      items: ["Harassment", "Public Violence", "Illegal Activities", "Emergency Reporting"]
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white selection:bg-rose-500 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6">
          <button 
            onClick={() => setActiveView("hero")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 font-bold text-white shadow-lg shadow-rose-500/20">
              U
            </div>
            <span className="text-xl font-bold tracking-tight">UPAP</span>
          </button>
          <div className="hidden space-x-8 md:flex">
            <button 
              onClick={() => setActiveView("features")} 
              className={`text-sm font-medium transition-colors hover:text-white ${activeView === 'features' ? 'text-white' : 'text-zinc-400'}`}
            >
              Features
            </button>
            <button 
              onClick={() => setActiveView("dashboard")} 
              className={`text-sm font-medium transition-colors hover:text-white ${activeView === 'dashboard' ? 'text-white' : 'text-zinc-400'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveView("ai")} 
              className={`text-sm font-medium transition-colors hover:text-white ${activeView === 'ai' ? 'text-white' : 'text-zinc-400'}`}
            >
              AI Features
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/report">
              <Button className="bg-rose-600 text-white hover:bg-rose-700">Report Issue</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          {activeView === "hero" && (
            <motion.section 
              key="hero"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-5xl text-center"
            >
              <Badge variant="outline" className="mb-6 border-rose-500/30 bg-rose-500/10 text-rose-400 px-4 py-1">
                Unified Public Accountability & Justice Platform
              </Badge>
              <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl mb-8">
                Justice & Accountability <br />
                <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">In Your Hands.</span>
              </h1>
              
              <div className="grid gap-6 md:grid-cols-3 mt-12">
                <button 
                  onClick={() => setActiveView("features")}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all hover:border-rose-500/50 hover:bg-white/10"
                >
                  <Info className="mb-4 h-8 w-8 text-rose-500" />
                  <h3 className="text-xl font-bold mb-2">Explore Features</h3>
                  <p className="text-zinc-400 text-sm">See how we separate reporting by risk and impact.</p>
                  <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-zinc-500 group-hover:text-rose-500 transition-colors" />
                </button>

                <button 
                  onClick={() => setActiveView("dashboard")}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all hover:border-blue-500/50 hover:bg-white/10"
                >
                  <BarChart3 className="mb-4 h-8 w-8 text-blue-500" />
                  <h3 className="text-xl font-bold mb-2">Public Dashboard</h3>
                  <p className="text-zinc-400 text-sm">View real-time response times and SLA tracking.</p>
                  <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-zinc-500 group-hover:text-blue-500 transition-colors" />
                </button>

                <button 
                  onClick={() => setActiveView("ai")}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all hover:border-purple-500/50 hover:bg-white/10"
                >
                  <Shield className="mb-4 h-8 w-8 text-purple-500" />
                  <h3 className="text-xl font-bold mb-2">AI Protection</h3>
                  <p className="text-zinc-400 text-sm">Discover how AI assists in justice and safety.</p>
                  <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-zinc-500 group-hover:text-purple-500 transition-colors" />
                </button>
              </div>
            </motion.section>
          )}

          {activeView === "features" && (
            <motion.section 
              key="features"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-7xl"
            >
              <button 
                onClick={() => setActiveView("hero")}
                className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Overview
              </button>
              
              <div className="mb-16 text-center">
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Reporting Ecosystem</h2>
                <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">Specific workflows tailored for civic issues, governance, and public safety.</p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-3">
                {categories.map((cat, i) => (
                  <Card key={i} className="h-full border-white/10 bg-zinc-900 text-white">
                    <CardHeader>
                      <div className="mb-4">{cat.icon}</div>
                      <CardTitle className="text-2xl">{cat.title}</CardTitle>
                      <CardDescription className="text-zinc-400 leading-relaxed">
                        {cat.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item, j) => (
                          <Badge key={j} variant="secondary" className="bg-white/5 text-zinc-300 border-none">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          {activeView === "dashboard" && (
            <motion.section 
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-7xl"
            >
              <button 
                onClick={() => setActiveView("hero")}
                className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Overview
              </button>
              
              <div className="grid gap-12 md:grid-cols-2 items-center">
                <div>
                  <Badge className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/30">Public Accountability</Badge>
                  <h2 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">Real-time Accountability.</h2>
                  <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                    Every report triggers an SLA-backed timeline. If action is delayed beyond the standard response window, the "No Action Taken" flag automatically elevates the issue to the Public Transparency Dashboard.
                  </p>
                  
                  <ul className="space-y-4 text-zinc-300">
                    <li className="flex items-start gap-3"><CheckCircle2 className="h-6 w-6 text-rose-500 shrink-0" /> Real-time status tracking</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="h-6 w-6 text-rose-500 shrink-0" /> Automated escalation</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="h-6 w-6 text-rose-500 shrink-0" /> Department performance ranking</li>
                  </ul>
                </div>
                
                <div className="relative rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl text-white">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold">Live Transparency Stats</h3>
                    <BarChart3 className="text-rose-500" />
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { label: "Ward 12 (Civic)", progress: 45, status: "Delayed", color: "text-rose-400" },
                      { label: "Ward 05 (Governance)", progress: 92, status: "Active", color: "text-emerald-400" },
                      { label: "Police Dist. A (Safety)", progress: 78, status: "Active", color: "text-emerald-400" }
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">{item.label}</span>
                          <span className={item.color}>{item.status}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.status === 'Delayed' ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                            style={{ width: `${item.progress}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeView === "ai" && (
            <motion.section 
              key="ai"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-7xl"
            >
              <button 
                onClick={() => setActiveView("hero")}
                className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Overview
              </button>
              
              <div className="mb-16 text-center">
                <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/30">AI Ecosystem</Badge>
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Intelligent Justice</h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: "Incident Severity", desc: "AI automatically prioritizes high-risk safety incidents.", icon: <AlertCircle className="text-rose-500" /> },
                  { title: "Evidence Auth", desc: "Detects reused or fake media to prevent malicious reports.", icon: <Shield className="text-blue-500" /> },
                  { title: "FIR Draft Gen", desc: "Automatically converts reports into legal-ready drafts.", icon: <FileText className="text-emerald-500" /> },
                  { title: "Smart Escalation", desc: "Predicts delays and escalates before the deadline hits.", icon: <Clock className="text-amber-500" /> }
                ].map((item, i) => (
                  <Card key={i} className="border-white/10 bg-zinc-900 text-white">
                    <CardHeader>
                      <div className="mb-2">{item.icon}</div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="text-zinc-400">{item.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 font-bold text-white">
              U
            </div>
            <span className="text-lg font-bold tracking-tight">UPAP</span>
          </div>
          <p className="text-zinc-500 text-sm">© 2024 Unified Public Accountability Platform.</p>
        </div>
      </footer>
    </div>
  );
}
