"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  ArrowLeft, 
  Filter, 
  Download, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Search,
  ChevronRight,
  MapPin,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

const data = [
  { name: "Ward 12", resolved: 45, pending: 20, delayed: 15 },
  { name: "Ward 05", resolved: 78, pending: 10, delayed: 2 },
  { name: "Ward 08", resolved: 52, pending: 25, delayed: 10 },
  { name: "Ward 21", resolved: 90, pending: 5, delayed: 1 },
  { name: "Ward 15", resolved: 30, pending: 40, delayed: 25 },
];

const categoryData = [
  { name: "Civic", value: 400, color: "#3b82f6" },
  { name: "Governance", value: 300, color: "#f59e0b" },
  { name: "Safety", value: 300, color: "#f43f5e" },
];

export default function DashboardPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComplaints() {
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (!error && data) setComplaints(data);
      setLoading(false);
    }
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <h1 className="text-4xl font-bold tracking-tight">Public Transparency Dashboard</h1>
            <p className="text-zinc-400 mt-2 text-lg">Real-time accountability data across all departments.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" className="border-white/10 bg-white/5 flex-1 md:flex-none">
              <Download className="h-4 w-4 mr-2" /> Export Data
            </Button>
            <Button className="bg-rose-600 hover:bg-rose-700 flex-1 md:flex-none">
              <TrendingUp className="h-4 w-4 mr-2" /> Performance Report
            </Button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-12">
          <Card className="bg-white/5 border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">-12%</Badge>
              </div>
              <div className="text-2xl font-bold">4.2 Days</div>
              <div className="text-sm text-zinc-500">Avg. Response Time</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">+5%</Badge>
              </div>
              <div className="text-2xl font-bold">84.5%</div>
              <div className="text-sm text-zinc-500">Resolution Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-rose-500" />
                </div>
                <Badge variant="outline" className="text-[10px] border-rose-500/30 text-rose-400">+8%</Badge>
              </div>
              <div className="text-2xl font-bold">128</div>
              <div className="text-sm text-zinc-500">Delayed Cases</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  < trending-up className="h-5 w-5 text-amber-500" />
                </div>
                <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400">Stable</Badge>
              </div>
              <div className="text-2xl font-bold">92%</div>
              <div className="text-sm text-zinc-500">Citizen Satisfaction</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <Card className="md:col-span-2 bg-zinc-900/50 border-white/5">
            <CardHeader>
              <CardTitle>Resolution Performance by Ward</CardTitle>
              <CardDescription>Comparison of resolved vs delayed cases per administrative area.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="delayed" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-white/5">
            <CardHeader>
              <CardTitle>Reports by Category</CardTitle>
              <CardDescription>Distribution of complaints filed.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-zinc-500 uppercase">Total</span>
                <span className="text-xl font-bold">1.2k</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Transparency Reports</h2>
            <div className="flex gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <Input placeholder="Search records..." className="bg-white/5 border-white/10 pl-10 h-9" />
              </div>
              <Button variant="outline" size="sm" className="border-white/10">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {complaints.length > 0 ? complaints.map((report, i) => (
              <Card key={i} className="bg-zinc-900/50 border-white/5 hover:border-rose-500/20 transition-all cursor-pointer">
                <CardContent className="p-5 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
                      report.category === 'safety' ? 'bg-rose-500/10 text-rose-500' :
                      report.category === 'governance' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      {report.category === 'safety' ? <Shield className="h-6 w-6" /> :
                       report.category === 'governance' ? <Building2 className="h-6 w-6" /> :
                       <MapPin className="h-6 w-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-[10px] capitalize border-white/10">{report.category}</Badge>
                        <span className="text-xs text-zinc-500">{new Date(report.created_at).toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-bold">{report.title}</h3>
                      <p className="text-sm text-zinc-400 line-clamp-1">{report.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="text-right hidden md:block">
                      <div className="text-xs text-zinc-500 uppercase">SLA Status</div>
                      <div className={`text-sm font-medium ${report.status === 'delayed' ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {report.status === 'delayed' ? 'Action Overdue' : 'On Track'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/5 flex-1 md:flex-none justify-center">
                      <div className={`h-2 w-2 rounded-full ${
                        report.status === 'resolved' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                        report.status === 'pending' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' :
                        'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                      }`} />
                      <span className="text-xs font-medium capitalize">{report.status}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="text-zinc-500">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-2xl">
                <p className="text-zinc-500">No public records found. Reports marked as "Anonymous" are hidden from the public feed.</p>
              </div>
            )}
          </div>
          
          <div className="text-center pt-8">
            <Button variant="link" className="text-rose-500">Load More Historical Data</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
