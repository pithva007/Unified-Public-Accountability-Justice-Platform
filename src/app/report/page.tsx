"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  MapPin, 
  Building2, 
  Camera, 
  Upload, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  AlertTriangle,
  Send,
  Loader2,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Link from "next/link";

const steps = [
  { id: 1, title: "Category" },
  { id: 2, title: "Details" },
  { id: 3, title: "Evidence" },
  { id: 4, title: "Review" }
];

export default function ReportPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    title: "",
    description: "",
    location: "",
    anonymous: false,
    severity: "low"
  });

  const categories = [
    { id: "civic", label: "Civic Infrastructure", icon: <MapPin className="h-6 w-6" />, color: "bg-blue-500", subCategories: ["Potholes", "Garbage", "Streetlights", "Water Leakage", "Drainage"] },
    { id: "governance", label: "Governance Negligence", icon: <Building2 className="h-6 w-6" />, color: "bg-amber-500", subCategories: ["Service Delay", "Officer Misconduct", "Corruption Indicator", "Pending Files"] },
    { id: "safety", label: "Public Safety & Crime", icon: <Shield className="h-6 w-6" />, color: "bg-rose-500", subCategories: ["Harassment", "Public Violence", "Illegal Activities", "Theft", "Emergency"] }
  ];

  const handleNext = () => setStep(s => Math.min(s + 1, steps.length));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // In a real app, we'd get the user session
      const { data, error } = await supabase
        .from('complaints')
        .insert([{
          category: formData.category,
          sub_category: formData.subCategory,
          title: formData.title,
          description: formData.description,
          location_address: formData.location,
          anonymous: formData.anonymous,
          severity: formData.category === 'safety' ? 'high' : 'low',
          status: 'pending'
        }]);

      if (error) throw error;
      
      setSubmitted(true);
      toast.success("Report submitted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="mx-auto h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold text-white">Report Submitted!</h2>
          <p className="text-zinc-400">
            Your complaint has been filed and assigned a tracking ID. You can monitor the progress on the transparency dashboard.
          </p>
          <div className="pt-6">
            <Link href="/">
              <Button size="lg" className="w-full bg-rose-600 hover:bg-rose-700">Back to Home</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Report an Issue</h1>
          <div className="flex items-center justify-between">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s.id ? 'bg-rose-600 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                  {step > s.id ? <CheckCircle2 className="h-5 w-5" /> : s.id}
                </div>
                <span className={`text-xs ${step >= s.id ? 'text-zinc-200' : 'text-zinc-500'}`}>{s.title}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-rose-600"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Select Category</h2>
                    <p className="text-sm text-zinc-400">What type of issue are you reporting?</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setFormData({ ...formData, category: cat.id, subCategory: "" });
                          handleNext();
                        }}
                        className={`flex flex-col items-center p-6 rounded-xl border transition-all ${formData.category === cat.id ? 'border-rose-500 bg-rose-500/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                      >
                        <div className={`p-4 rounded-full mb-4 ${cat.color} text-white`}>
                          {cat.icon}
                        </div>
                        <span className="font-medium text-sm">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Incident Details</h2>
                    <p className="text-sm text-zinc-400">Tell us more about what happened.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Sub-category</Label>
                      <Select 
                        value={formData.subCategory} 
                        onValueChange={(v) => setFormData({ ...formData, subCategory: v })}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                          {categories.find(c => c.id === formData.category)?.subCategories.map(sub => (
                            <SelectItem key={sub} value={sub.toLowerCase()}>{sub}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input 
                        placeholder="Brief summary" 
                        className="bg-white/5 border-white/10"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea 
                        placeholder="Provide details..." 
                        className="bg-white/5 border-white/10 min-h-[120px]"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handleBack} className="border-white/10 text-zinc-400">Back</Button>
                    <Button onClick={handleNext} disabled={!formData.title || !formData.subCategory} className="bg-rose-600 hover:bg-rose-700">Continue</Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Location & Evidence</h2>
                    <p className="text-sm text-zinc-400">Help us locate the issue and verify it.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Location Address / Ward</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                        <Input 
                          placeholder="Enter location or use GPS" 
                          className="bg-white/5 border-white/10 pl-10"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-white/5 cursor-pointer transition-colors">
                        <Camera className="h-8 w-8 text-zinc-500" />
                        <span className="text-xs text-zinc-400">Take Photo</span>
                      </div>
                      <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-white/5 cursor-pointer transition-colors">
                        <Upload className="h-8 w-8 text-zinc-500" />
                        <span className="text-xs text-zinc-400">Upload Media</span>
                      </div>
                    </div>

                    {formData.category === 'safety' && (
                      <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 flex gap-3">
                        <Lock className="h-5 w-5 text-rose-500 shrink-0" />
                        <div className="text-xs text-rose-200">
                          <strong>Safety Encryption Active:</strong> For crime reports, evidence is automatically encrypted and shared only with verified authorities.
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handleBack} className="border-white/10 text-zinc-400">Back</Button>
                    <Button onClick={handleNext} disabled={!formData.location} className="bg-rose-600 hover:bg-rose-700">Review Report</Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Review & Submit</h2>
                    <p className="text-sm text-zinc-400">Verify your information before sending.</p>
                  </div>
                  
                  <div className="rounded-xl border border-white/10 p-6 space-y-4 bg-white/5">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-rose-600 text-white border-none">{formData.category.toUpperCase()}</Badge>
                      <span className="text-xs text-zinc-500 capitalize">{formData.subCategory}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{formData.title}</h3>
                      <p className="text-sm text-zinc-400 mt-1">{formData.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <MapPin className="h-4 w-4" /> {formData.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-xs text-amber-200">False reporting may lead to account penalties.</span>
                  </div>

                  <div className="flex flex-col gap-4 pt-4">
                    <Button 
                      size="lg" 
                      onClick={handleSubmit} 
                      disabled={loading}
                      className="bg-rose-600 hover:bg-rose-700 w-full"
                    >
                      {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Send className="h-5 w-5 mr-2" />}
                      Submit Report
                    </Button>
                    <Button variant="ghost" onClick={handleBack} disabled={loading} className="text-zinc-500 hover:text-white">
                      Edit Details
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
