"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Shield,
  Building2,
  Calendar,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!trackingId) return;
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .eq('id', trackingId)
        .single();
      
      if (error) throw new Error("Report not found. Please check the ID.");
      setReport(data);
    } catch (err: any) {
      setError(err.message);
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const timelineSteps = [
    { status: "pending", label: "Filed", date: report?.created_at, desc: "Complaint successfully registered in the system." },
    { status: "acknowledged", label: "Acknowledged", date: null, desc: "Department official has viewed the report." },
    { status: "in_progress", label: "Action Started", date: null, desc: "Official has been assigned and resolution is underway." },
    { status: "resolved", label: "Resolved", date: null, desc: "The issue has been marked as fixed/closed." },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Track Your Report</h1>
          <p className="text-zinc-400">Enter your unique Tracking ID to see real-time updates and escalation status.</p>
          
          <div className="mt-8 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
              <Input 
                placeholder="Enter Tracking ID (e.g. uuid)..." 
                className="bg-white/5 border-white/10 pl-12 h-12"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>
            <Button size="lg" onClick={handleTrack} disabled={loading} className="bg-rose-600 hover:bg-rose-700 px-8">
              {loading ? "Searching..." : "Track Status"}
            </Button>
          </div>
          {error && <p className="text-rose-500 text-sm mt-3">{error}</p>}
        </div>

        {report ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2 bg-zinc-900/50 border-white/5">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-rose-600 text-white border-none uppercase">{report.category}</Badge>
                    <span className="text-xs text-zinc-500">ID: {report.id.slice(0, 8)}...</span>
                  </div>
                  <CardTitle className="text-2xl">{report.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-zinc-400">{report.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <MapPin className="h-4 w-4 text-rose-500" /> {report.location_address}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <Calendar className="h-4 w-4 text-rose-500" /> {new Date(report.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-white/5">
                <CardHeader>
                  <CardTitle className="text-lg">SLA Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                  <div className="h-24 w-24 rounded-full border-4 border-emerald-500/20 flex items-center justify-center mx-auto">
                    <div className="text-center">
                      <div className="text-xl font-bold text-emerald-500">48h</div>
                      <div className="text-[10px] text-zinc-500">REMAINING</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-400 italic">"Department has 72 hours to acknowledge this report before it appears on the Public Dashboard."</p>
                    <Button variant="outline" className="w-full border-white/10 text-xs h-8">View SLA Policy</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-zinc-900/50 border-white/5">
              <CardHeader>
                <CardTitle>Accountability Timeline</CardTitle>
                <CardDescription>Track every step taken by the authorities.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-zinc-800">
                  {timelineSteps.map((step, i) => {
                    const isCompleted = report.status === step.status || (report.status === 'resolved' && i < 3);
                    const isCurrent = report.status === step.status;
                    
                    return (
                      <div key={i} className="relative pl-10">
                        <div className={`absolute left-0 top-1 h-6 w-6 rounded-full border-2 ${
                          isCompleted ? 'bg-rose-600 border-rose-600' : 'bg-zinc-950 border-zinc-800'
                        } flex items-center justify-center z-10`}>
                          {isCompleted && <CheckCircle2 className="h-4 w-4 text-white" />}
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div>
                            <h4 className={`font-bold ${isCompleted ? 'text-white' : 'text-zinc-500'}`}>{step.label}</h4>
                            <p className="text-sm text-zinc-500 mt-1">{step.desc}</p>
                          </div>
                          {step.date && (
                            <span className="text-xs text-zinc-500 font-mono">
                              {new Date(step.date).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              {report.category === 'safety' && (
                <Button variant="outline" className="border-rose-500/30 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10">
                  <FileText className="h-4 w-4 mr-2" /> Generate AI FIR Draft
                </Button>
              )}
              <Button variant="destructive" className="bg-rose-950 text-rose-500 border border-rose-900/50 hover:bg-rose-900 ml-auto">
                <AlertCircle className="h-4 w-4 mr-2" /> Report Inaccurate Status
              </Button>
            </div>
          </motion.div>
        ) : !loading && trackingId && (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-2xl">
            <p className="text-zinc-500">Enter a Tracking ID to see details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
