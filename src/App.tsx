/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Network, 
  Cpu, 
  Layers, 
  Check, 
  Menu, 
  X,
  Info,
  Globe
} from "lucide-react";
import { translations, MetricCategory } from "./translations";

export default function App() {
  const [lang, setLang] = useState<"en" | "zh">("zh");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMetric, setActiveMetric] = useState<MetricCategory>("throughput");
  const [activeNodes, setActiveNodes] = useState<number>(16384);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [submitError, setSubmitError] = useState("");

  const t = translations[lang];
  const metrics = t.metrics;
  const chartData = t.chartData;
  const nodeSizes = [1024, 4096, 16384, 32768];
  const apiConsoleHref = import.meta.env.VITE_API_CONSOLE_URL?.trim() || "#products";
  const desktopDownloadHref = import.meta.env.VITE_DESKTOP_DOWNLOAD_URL?.trim() || "#early-access";
  const externalLinkProps = (href: string) =>
    href.startsWith("#") ? {} : { target: "_blank", rel: "noreferrer" };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !normalizedEmail.includes("@")) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          language: lang,
          source: "homepage",
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Request failed");
      }

      setRequestId(payload.id || Math.floor(Math.random() * 89999 + 10000).toString());
      setIsSubmitted(true);
      setEmail("");
    } catch {
      setSubmitError(lang === "en" ? "Request failed. Please try again." : "提交失败，请稍后再试。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#F2EFE9] text-[#0A0A0A] flex flex-col antialiased">
      
      {/* 1. TOP NAV */}
      <nav className="sticky top-0 z-50 bg-[#F2EFE9]/90 backdrop-blur-md border-b border-[#0A0A0A]/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8 lg:gap-12">
            <a href="#" className="flex items-center group focus:outline-none" aria-label="Prism-Edge home">
              <span className="font-serif font-bold text-xl md:text-2xl leading-none tracking-tight text-[#0A0A0A] border-2 border-[#E4A617] rounded-sm px-1.5 py-0.5 bg-[#F2EFE9] shadow-[0_0_0_1px_rgba(10,10,10,0.08)] group-hover:border-[#7C6AF7] transition-colors">
                Prism-Edge
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#0A0A0A]/80">
              <a href="#scale" className="hover:text-[#7C6AF7] transition-colors relative focus:outline-none">{t.nav.scale}</a>
              <a href="#architecture" className="hover:text-[#7C6AF7] transition-colors relative focus:outline-none">{t.nav.architecture}</a>
              <a href="#benchmarks" className="hover:text-[#7C6AF7] transition-colors relative focus:outline-none">{t.nav.benchmarks}</a>
              <a href="#scaling-laws" className="hover:text-[#7C6AF7] transition-colors relative focus:outline-none">{t.nav.scalingLaws}</a>
              <a href="#products" className="hover:text-[#7C6AF7] transition-colors relative focus:outline-none">{t.nav.products}</a>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Desktop Globe Switcher */}
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="p-1.5 rounded-sm hover:bg-[#0A0A0A]/5 border border-[#0A0A0A]/10 text-[#0A0A0A] flex items-center gap-1.5 transition-all text-xs font-mono font-bold focus:outline-none cursor-pointer"
              title={lang === "en" ? "切换至中文" : "Switch to English"}
              id="lang-toggle-desktop"
            >
              <Globe className="w-4 h-4 text-[#7C6AF7]" />
              <span>{lang === "en" ? "EN" : "ZH"}</span>
            </button>

            <a href={apiConsoleHref} {...externalLinkProps(apiConsoleHref)} className="text-sm font-medium border border-[#0A0A0A] rounded-sm px-4 py-1.5 hover:bg-[#0A0A0A] hover:text-white transition-all focus:outline-none">
              {t.nav.consoleApi}
            </a>
            <a href="#early-access" className="text-sm font-medium bg-[#0A0A0A] text-[#F2EFE9] rounded-sm px-4 py-1.5 hover:bg-[#7C6AF7] hover:text-white transition-all focus:outline-none">
              {t.nav.requestAccess}
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Globe Switcher outside menu */}
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="p-1.5 rounded-sm hover:bg-[#0A0A0A]/5 border border-[#0A0A0A]/10 text-[#0A0A0A] flex items-center gap-1 transition-all text-[11px] font-mono font-bold focus:outline-none"
              title={lang === "en" ? "切换至中文" : "Switch to English"}
              id="lang-toggle-mobile"
            >
              <Globe className="w-4 h-4 text-[#7C6AF7]" />
              <span>{lang === "en" ? "EN" : "ZH"}</span>
            </button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#0A0A0A] p-1.5 rounded-sm hover:bg-[#0A0A0A]/5 focus:outline-none">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-b border-[#0A0A0A]/10 bg-[#F2EFE9] overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4 text-sm font-medium">
                <a href="#scale" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0A0A0A]/70 hover:text-[#7C6AF7] py-1 border-b border-[#0A0A0A]/5">{t.nav.scale}</a>
                <a href="#architecture" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0A0A0A]/70 hover:text-[#7C6AF7] py-1 border-b border-[#0A0A0A]/5">{t.nav.architecture}</a>
                <a href="#benchmarks" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0A0A0A]/70 hover:text-[#7C6AF7] py-1 border-b border-[#0A0A0A]/5">{t.nav.benchmarks}</a>
                <a href="#scaling-laws" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0A0A0A]/70 hover:text-[#7C6AF7] py-1 border-b border-[#0A0A0A]/5">{t.nav.scalingLaws}</a>
                <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0A0A0A]/70 hover:text-[#7C6AF7] py-1 border-b border-[#0A0A0A]/5">{t.nav.products}</a>
                <div className="flex flex-col gap-2 pt-4">
                  <a href={apiConsoleHref} {...externalLinkProps(apiConsoleHref)} onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 border border-[#0A0A0A] rounded-sm font-medium hover:bg-[#0A0A0A] hover:text-white transition-all text-sm">{t.nav.consoleApi}</a>
                  <a href="#early-access" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 bg-[#0A0A0A] text-[#F2EFE9] rounded-sm font-medium hover:bg-[#7C6AF7] transition-all text-sm">{t.nav.requestAccess}</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative py-16 md:py-24 overflow-hidden flex items-center border-b border-[#0A0A0A]/10">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0A0A0A" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 border border-[#7C6AF7]/30 bg-[#7C6AF7]/5 rounded-sm px-3.5 py-1 text-[11px] font-mono font-medium text-[#7C6AF7]">
              <span>{t.hero.manifesto}</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[54px] font-medium tracking-tight leading-[1.1] text-[#0A0A0A] max-w-4xl">
              {t.hero.titlePart1}<span className="italic text-[#7C6AF7]">{t.hero.titleAccent}</span>{t.hero.titlePart2}
            </h1>
            
            <p className="font-sans text-sm md:text-base text-[#0A0A0A]/80 leading-relaxed max-w-3xl">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a href="#early-access" className="bg-[#0A0A0A] hover:bg-[#7C6AF7] text-white font-medium px-6 py-3 rounded-sm transition-all flex items-center justify-center gap-2 text-sm">
                {t.hero.btnRequest} <span className="text-base">→</span>
              </a>
              <a href="#scale" className="border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white text-[#0A0A0A] font-medium px-6 py-3 rounded-sm transition-all text-center text-sm">
                {t.hero.btnExplore}
              </a>
            </div>
          </div>

          {/* Side Telemetry Panel */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative p-5 border border-[#0A0A0A]/15 rounded-sm bg-white/50 backdrop-blur-sm max-w-sm w-full">
              <div className="absolute -top-3 left-4 px-2 bg-[#F2EFE9] border border-[#0A0A0A]/15 rounded-sm">
                <span className="font-mono text-[9px] tracking-wider uppercase text-gray-500 font-semibold">{t.hero.telemetry}</span>
              </div>
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center border-b border-[#0A0A0A]/10 pb-2">
                  <span className="text-xs font-mono text-gray-500">{t.hero.sysState}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-600">
                    <span className="w-2 h-2 rounded-sm bg-emerald-500 animate-pulse"></span>
                    {t.hero.stateStable}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider">{t.hero.bandwidth}</span>
                  <div className="flex items-baseline gap-1 text-2xl font-mono text-[#0A0A0A] font-semibold">
                    <span>1,840.4</span>
                    <span className="text-xs font-sans text-[#7C6AF7] font-semibold">events/s</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider">{t.hero.cores}</span>
                  <div className="flex items-baseline gap-1 text-2xl font-mono text-[#0A0A0A] font-semibold">
                    <span>214</span>
                    <span className="text-xs font-sans text-gray-500">venues</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider">{t.hero.overclock}</span>
                  <div className="flex items-baseline gap-1 text-2xl font-mono text-[#7C6AF7] font-semibold">
                    <span>99.982%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPUTE DENSITY COMPARISON BAR */}
      <section className="px-6 md:px-12 py-6 border-b border-[#0A0A0A]/10 bg-[#F2EFE9]">
        <div className="max-w-7xl mx-auto">
          <div className="w-full flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-white/50 border border-[#0A0A0A]/10 p-2.5 rounded-sm">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A]/50 px-2 font-bold whitespace-nowrap">{t.computeDensity.title}</div>
            <div className="flex-1 h-8 flex overflow-hidden rounded-sm border border-[#0A0A0A]/5">
              <div className="h-full bg-[#0A0A0A]/10 w-[80%] flex items-center px-4 text-xs font-semibold text-[#0A0A0A]/80">{t.computeDensity.legacy}</div>
              <div className="h-full bg-[#7C6AF7] w-[20%] flex items-center px-4 text-xs font-semibold text-white">{t.computeDensity.nodeV}</div>
            </div>
            <div className="font-mono text-[11px] font-bold text-[#7C6AF7] whitespace-nowrap px-2">{t.computeDensity.capacity}</div>
          </div>
        </div>
      </section>

      {/* 3. SCALE METRICS (Horizontal bar comparison) */}
      <section id="scale" className="py-20 border-b border-[#0A0A0A]/10 bg-[#F2EFE9] scroll-mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#7C6AF7] font-semibold block">{t.scaleMetrics.sectionNum}</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
              {t.scaleMetrics.title}
            </h2>
            <p className="text-[#0A0A0A]/70 text-sm md:text-base">
              {t.scaleMetrics.subtitle}
            </p>
          </div>

          {/* Selector Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
            {(Object.keys(metrics) as MetricCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveMetric(cat)}
                className={`p-4 text-left border rounded-sm transition-all focus:outline-none cursor-pointer ${
                  activeMetric === cat 
                    ? "border-[#0A0A0A] bg-white" 
                    : "border-[#0A0A0A]/10 bg-white/20 hover:border-[#0A0A0A]/20"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className={`p-1 rounded-sm ${activeMetric === cat ? "bg-[#7C6AF7] text-white" : "bg-[#0A0A0A]/5 text-[#0A0A0A]/60"}`}>
                    {cat === "throughput" && <Cpu className="w-4 h-4" />}
                    {cat === "latency" && <Network className="w-4 h-4" />}
                    {cat === "cost" && <Layers className="w-4 h-4" />}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500 font-bold">
                    {cat === "throughput" && t.scaleMetrics.training}
                    {cat === "latency" && t.scaleMetrics.interconnect}
                    {cat === "cost" && t.scaleMetrics.operating}
                  </span>
                </div>
                <h3 className="font-serif text-base font-semibold text-[#0A0A0A]">
                  {cat === "throughput" && (lang === "en" ? "Coverage" : "覆盖率")}
                  {cat === "latency" && (lang === "en" ? "Latency" : "延迟")}
                  {cat === "cost" && (lang === "en" ? "Review Load" : "复核负载")}
                </h3>
              </button>
            ))}
          </div>

          {/* Active Metric Area */}
          <div className="bg-white border border-[#0A0A0A]/10 rounded-sm p-6 md:p-8">
            <div className="mb-6">
              <h4 className="font-serif text-xl md:text-2xl font-semibold text-[#0A0A0A]">
                {metrics[activeMetric].title}
              </h4>
              <p className="text-xs text-[#0A0A0A]/60 mt-1 max-w-3xl leading-relaxed">
                {metrics[activeMetric].subtitle}
              </p>
            </div>

            <div className="space-y-5">
              {metrics[activeMetric].points.map((p, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1">
                    <span className={`text-xs md:text-sm font-medium flex items-center gap-2 ${p.isHighlight ? "text-[#0A0A0A] font-bold" : "text-[#0A0A0A]/75"}`}>
                      {p.isHighlight && <span className="w-1.5 h-1.5 rounded-sm bg-[#7C6AF7]" />}
                      {p.label}
                    </span>
                    <span className={`font-mono font-bold text-sm ${p.isHighlight ? "text-[#7C6AF7]" : "text-[#0A0A0A]/80"}`}>
                      {p.value}
                    </span>
                  </div>

                  <div className="h-3 w-full bg-[#0A0A0A]/5 rounded-sm overflow-hidden relative border border-[#0A0A0A]/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.percentage}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`h-full rounded-sm ${p.isHighlight ? "bg-[#7C6AF7]" : "bg-[#0A0A0A]/20"}`}
                    />
                  </div>
                  <p className="text-[11px] text-[#0A0A0A]/50 leading-normal">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-3 border-t border-[#0A0A0A]/10 flex justify-between text-[8px] font-mono text-gray-500 uppercase tracking-widest">
              <span>{t.scaleMetrics.efficiency0}</span>
              <span>{t.scaleMetrics.efficiency50}</span>
              <span>{t.scaleMetrics.efficiency100}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DARK TECHNICAL SECTION (Architecture / Topology Visualizer) */}
      <section id="architecture" className="py-24 bg-[#0D0D0D] text-[#E5E2DC] border-t border-b border-[#0A0A0A]/20 scroll-mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#7C6AF7] font-semibold block">{t.opticalBackplane.sectionNum}</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
                {t.opticalBackplane.title}
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {t.opticalBackplane.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5 border-l-2 border-[#7C6AF7]/30 hover:border-[#7C6AF7] pl-6 transition-all">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#7C6AF7] font-semibold">[ {lang === "en" ? "INNOVATION 01" : "技术创新 01"} ]</span>
                <h3 className="font-serif text-base md:text-lg font-medium text-white">{t.opticalBackplane.innov1Title}</h3>
                <p className="text-gray-400 text-xs md:text-sm">{t.opticalBackplane.innov1Desc}</p>
              </div>

              <div className="space-y-1.5 border-l-2 border-[#7C6AF7]/30 hover:border-[#7C6AF7] pl-6 transition-all">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#7C6AF7] font-semibold">[ {lang === "en" ? "INNOVATION 02" : "技术创新 02"} ]</span>
                <h3 className="font-serif text-base md:text-lg font-medium text-white">{t.opticalBackplane.innov2Title}</h3>
                <p className="text-gray-400 text-xs md:text-sm">{t.opticalBackplane.innov2Desc}</p>
              </div>
            </div>

            <div className="pt-2">
              <a href="#early-access" className="inline-flex items-center gap-2 text-xs font-semibold text-white border border-white/20 hover:border-white/50 hover:bg-white/5 rounded-sm px-5 py-3 transition-colors">
                {t.opticalBackplane.specDraftBtn} <ArrowRight className="w-3.5 h-3.5 text-[#7C6AF7]" />
              </a>
            </div>
          </div>

          {/* Right Column: Custom Animated SVG Network Lattice */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="w-full aspect-square max-w-md bg-[#111111] border border-white/10 rounded-sm p-8 relative flex items-center justify-center">
              
              <div className="absolute top-4 left-4 flex flex-col">
                <span className="font-mono text-[8px] uppercase tracking-wider text-gray-500">{t.opticalBackplane.latticeBus}</span>
                <span className="font-mono text-[9px] text-emerald-500 font-semibold uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-sm bg-emerald-500 animate-ping"></span>
                  {t.opticalBackplane.sysSyncOnline}
                </span>
              </div>

              <svg viewBox="0 0 320 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dot-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="0.5" fill="#E5E2DC" fillOpacity="0.1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dot-grid)" rx="8" />

                {/* Grid layout rings */}
                <circle cx="160" cy="160" r="110" fill="none" stroke="#E5E2DC" strokeOpacity="0.06" strokeWidth="1" />
                <circle cx="160" cy="160" r="70" fill="none" stroke="#E5E2DC" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="160" cy="160" r="35" fill="none" stroke="#E5E2DC" strokeOpacity="0.15" strokeWidth="1.2" />

                {/* Diagonal paths */}
                <line x1="160" y1="160" x2="60" y2="60" stroke="#E5E2DC" strokeOpacity="0.15" strokeWidth="0.8" />
                <line x1="160" y1="160" x2="260" y2="60" stroke="#E5E2DC" strokeOpacity="0.15" strokeWidth="0.8" />
                <line x1="160" y1="160" x2="60" y2="260" stroke="#E5E2DC" strokeOpacity="0.15" strokeWidth="0.8" />
                <line x1="160" y1="160" x2="260" y2="260" stroke="#E5E2DC" strokeOpacity="0.15" strokeWidth="0.8" />

                {/* Concentric rotating pathways */}
                <motion.circle 
                  cx="160" cy="160" r="70" 
                  fill="none" stroke="#7C6AF7" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="30 140"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                  style={{ transformOrigin: "160px 160px" }}
                />
                <motion.circle 
                  cx="160" cy="160" r="110" 
                  fill="none" stroke="#7C6AF7" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="50 250"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                  style={{ transformOrigin: "160px 160px" }}
                />

                {/* Peripheral nodes */}
                <circle cx="60" cy="60" r="3" fill="#E5E2DC" />
                <circle cx="260" cy="60" r="3" fill="#E5E2DC" />
                <circle cx="60" cy="260" r="3" fill="#E5E2DC" />
                <circle cx="260" cy="260" r="3" fill="#E5E2DC" />

                <motion.circle cx="60" cy="60" r="6" fill="none" stroke="#E5E2DC" strokeOpacity="0.4" animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ repeat: Infinity, duration: 3 }} />
                <motion.circle cx="260" cy="260" r="6" fill="none" stroke="#E5E2DC" strokeOpacity="0.4" animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ repeat: Infinity, duration: 3, delay: 1.5 }} />

                {/* Node labels */}
                <text x="60" y="50" fill="#E5E2DC" fillOpacity="0.4" fontFamily="monospace" fontSize="7" textAnchor="middle">FEED_A1</text>
                <text x="260" y="275" fill="#E5E2DC" fillOpacity="0.4" fontFamily="monospace" fontSize="7" textAnchor="middle">MODEL_R4</text>

                {/* Flowing packet signals */}
                <motion.circle
                  cx="160" cy="160" r="3" fill="#7C6AF7"
                  animate={{ cx: [160, 60, 160, 260, 160], cy: [160, 60, 160, 260, 160] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="160" cy="160" r="2.5" fill="#7C6AF7"
                  animate={{ cx: [160, 260, 160, 60, 160], cy: [160, 60, 160, 260, 160] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                />

                {/* Central silicon router node */}
                <circle cx="160" cy="160" r="10" fill="#7C6AF7" />
                <motion.circle cx="160" cy="160" r="18" fill="none" stroke="#7C6AF7" strokeWidth="1" animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }} transition={{ repeat: Infinity, duration: 2 }} />
                <text x="160" y="142" fill="#7C6AF7" fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle">DGWM_CORE</text>
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* 5. BENCHMARK SECTION */}
      <section id="benchmarks" className="py-20 border-b border-[#0A0A0A]/10 bg-[#F2EFE9] scroll-mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#7C6AF7] font-semibold block">{t.comparativeReport.sectionNum}</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#0A0A0A] leading-tight">
              {t.comparativeReport.title}
            </h2>
            <p className="text-[#0A0A0A]/70 text-sm md:text-base leading-relaxed">
              {t.comparativeReport.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Bar Chart Card */}
            <div className="lg:col-span-7 bg-[#EBE7E0]/60 border border-[#0A0A0A]/15 rounded-sm p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-2 mb-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[9px] text-[#7C6AF7] font-bold uppercase bg-[#7C6AF7]/10 px-2 py-0.5 rounded-sm">{t.comparativeReport.mmluPretraining}</span>
                  <span className="text-[9px] font-mono text-gray-500 uppercase font-semibold">{t.comparativeReport.clusterSize}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0A0A0A]">
                  {t.comparativeReport.efficiencyTitle}
                </h3>
                <p className="text-xs text-[#0A0A0A]/60 leading-normal">{t.comparativeReport.efficiencyDesc}</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500 font-medium">{t.comparativeReport.ethernet}</span>
                    <span className="font-bold text-[#0A0A0A]">34% {lang === "en" ? "efficiency" : "效率"}</span>
                  </div>
                  <div className="h-3 bg-[#0A0A0A]/5 rounded-sm overflow-hidden border border-[#0A0A0A]/5">
                    <div className="h-full bg-gray-400/80 w-[34%] rounded-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500 font-medium">{t.comparativeReport.infiniband}</span>
                    <span className="font-bold text-[#0A0A0A]">68% {lang === "en" ? "efficiency" : "效率"}</span>
                  </div>
                  <div className="h-3 bg-[#0A0A0A]/5 rounded-sm overflow-hidden border border-[#0A0A0A]/5">
                    <div className="h-full bg-gray-500/80 w-[68%] rounded-sm" />
                  </div>
                </div>

                <div className="p-4 bg-[#7C6AF7]/5 border border-[#7C6AF7]/20 rounded-sm space-y-2">
                  <div className="flex justify-between items-baseline text-xs font-mono">
                    <span className="text-[#0A0A0A] font-bold">{t.comparativeReport.aetheris}</span>
                    <span className="text-[#7C6AF7] font-bold">94% {lang === "en" ? "efficiency" : "效率"}</span>
                  </div>
                  <div className="h-3 bg-[#7C6AF7]/10 rounded-sm overflow-hidden border border-[#7C6AF7]/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "94%" }}
                      viewport={{ once: true }}
                      className="h-full bg-[#7C6AF7] rounded-sm" 
                    />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-[#7C6AF7] font-bold pt-0.5">
                    <span>{t.comparativeReport.verificationPassed}</span>
                    <span>{t.comparativeReport.deltaText}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-3 border-t border-[#0A0A0A]/10 text-[9px] font-mono text-gray-400 flex justify-between">
                <span>{t.comparativeReport.benchmarkDraft}</span>
                <span>{t.comparativeReport.realtimeEval}</span>
              </div>
            </div>

            {/* Right Diagnostic Text */}
            <div className="lg:col-span-5 flex flex-col justify-between border border-[#0A0A0A]/15 rounded-sm p-6 md:p-8 bg-white/40">
              <div className="space-y-4">
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold block">{t.comparativeReport.techReasoning}</span>
                <h4 className="font-serif text-lg font-bold">{t.comparativeReport.reasoningTitle}</h4>
                <p className="text-xs text-[#0A0A0A]/75 leading-relaxed">
                  {t.comparativeReport.reasoningP1}
                </p>
                <p className="text-xs text-[#0A0A0A]/75 leading-relaxed">
                  {t.comparativeReport.reasoningP2}
                </p>
                <div className="p-3 bg-white/60 border border-[#0A0A0A]/10 rounded-sm text-xs flex gap-2 items-start text-[#0A0A0A]/70">
                  <Info className="w-4 h-4 text-[#7C6AF7] shrink-0 mt-0.5" />
                  <span className="leading-normal text-[11px]">{t.comparativeReport.infoText}</span>
                </div>
              </div>
              <div className="pt-6 border-t border-[#0A0A0A]/5 mt-4">
                <a href="#early-access" className="font-sans text-xs font-bold text-[#7C6AF7] hover:underline flex items-center gap-1">
                  {t.comparativeReport.downloadBlueprint}
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TECHNICAL COMPARISON (Interactive Scaling Curve Chart) */}
      <section id="scaling-laws" className="py-20 border-b border-[#0A0A0A]/10 bg-[#F2EFE9] scroll-mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#7C6AF7] font-semibold block">{t.scalingLaws.sectionNum}</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#0A0A0A] leading-tight">
              {t.scalingLaws.title}
            </h2>
            <p className="text-[#0A0A0A]/70 text-sm md:text-base leading-relaxed">
              {t.scalingLaws.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-gray-500 uppercase block font-bold tracking-wider">{t.scalingLaws.sizeSelection}</span>
                <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
                  {nodeSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setActiveNodes(size)}
                      className={`py-2 px-2 border font-mono text-xs font-bold transition-all focus:outline-none cursor-pointer rounded-sm ${
                        activeNodes === size
                          ? "border-[#0A0A0A] bg-[#0A0A0A] text-[#F2EFE9]"
                          : "border-[#0A0A0A]/10 bg-white/30 text-[#0A0A0A]/75 hover:border-[#0A0A0A]/20"
                      }`}
                    >
                      {size.toLocaleString()} {t.scalingLaws.nodes}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 border border-[#0A0A0A]/15 rounded-sm p-5 space-y-4 shadow-sm">
                <div className="border-b border-[#0A0A0A]/10 pb-2.5">
                  <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest block font-bold">{t.scalingLaws.scalingComparison}</span>
                  <div className="font-serif text-lg font-bold text-[#0A0A0A]">{activeNodes.toLocaleString()} {t.scalingLaws.parallelNodes}</div>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-[#0A0A0A]/5 pb-1">
                    <span className="flex items-center gap-1.5 font-bold"><span className="w-1.5 h-1.5 rounded-sm bg-[#7C6AF7]" /> Prism-Edge</span>
                    <span className="text-[#7C6AF7] font-bold">{chartData[activeNodes].aetheris}% {t.scalingLaws.efficiency}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#0A0A0A]/5 pb-1">
                    <span className="flex items-center gap-1.5 text-gray-500 font-semibold"><span className="w-1.5 h-1.5 rounded-sm bg-gray-500" /> {lang === "en" ? "Rules-only" : "仅规则栈"}</span>
                    <span className="text-[#0A0A0A] font-semibold">{chartData[activeNodes].infiniband}% {t.scalingLaws.efficiency}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-gray-400"><span className="w-1.5 h-1.5 rounded-sm bg-gray-300" /> {lang === "en" ? "Raw output" : "原始输出"}</span>
                    <span className="text-[#0A0A0A]/60">{chartData[activeNodes].ethernet}% {t.scalingLaws.efficiency}</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#0A0A0A]/70 italic border-t border-[#0A0A0A]/10 pt-2.5 leading-relaxed">
                  {chartData[activeNodes].desc}
                </p>
              </div>
            </div>

            {/* Right Line Chart Canvas */}
            <div className="lg:col-span-7 bg-white border border-[#0A0A0A]/15 rounded-sm p-5 md:p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[8px] uppercase tracking-wider text-gray-400 font-bold">{t.scalingLaws.chartLabel}</span>
                <div className="flex gap-4 font-mono text-[8px] text-gray-500 font-semibold">
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#7C6AF7]" /> {t.scalingLaws.chartLegendAetheris}</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-gray-500" /> {t.scalingLaws.chartLegendInfiniband}</span>
                </div>
              </div>

              <div className="relative aspect-video w-full">
                <svg viewBox="0 0 450 250" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="430" y2="20" stroke="#0A0A0A" strokeOpacity="0.05" strokeWidth="1" />
                  <line x1="40" y1="75" x2="430" y2="75" stroke="#0A0A0A" strokeOpacity="0.05" strokeWidth="1" />
                  <line x1="40" y1="130" x2="430" y2="130" stroke="#0A0A0A" strokeOpacity="0.05" strokeWidth="1" />
                  <line x1="40" y1="185" x2="430" y2="185" stroke="#0A0A0A" strokeOpacity="0.05" strokeWidth="1" />
                  <line x1="40" y1="215" x2="430" y2="215" stroke="#0A0A0A" strokeOpacity="0.1" strokeWidth="1" />

                  {/* Verticals */}
                  <line x1="100" y1="20" x2="100" y2="215" stroke="#0A0A0A" strokeOpacity={activeNodes === 1024 ? "0.15" : "0.04"} strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="190" y1="20" x2="190" y2="215" stroke="#0A0A0A" strokeOpacity={activeNodes === 4096 ? "0.15" : "0.04"} strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="290" y1="20" x2="290" y2="215" stroke="#0A0A0A" strokeOpacity={activeNodes === 16384 ? "0.15" : "0.04"} strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="400" y1="20" x2="400" y2="215" stroke="#0A0A0A" strokeOpacity={activeNodes === 32768 ? "0.15" : "0.04"} strokeWidth="1" strokeDasharray="2 2" />

                  {/* Labels */}
                  <text x="32" y="24" fontFamily="monospace" fontSize="8" fill="gray" textAnchor="end">100%</text>
                  <text x="32" y="134" fontFamily="monospace" fontSize="8" fill="gray" textAnchor="end">50%</text>
                  <text x="32" y="218" fontFamily="monospace" fontSize="8" fill="gray" textAnchor="end">0%</text>

                  <text x="100" y="228" fontFamily="monospace" fontSize="8" fill="gray" textAnchor="middle">1k</text>
                  <text x="190" y="228" fontFamily="monospace" fontSize="8" fill="gray" textAnchor="middle">4k</text>
                  <text x="290" y="228" fontFamily="monospace" fontSize="8" fill="gray" textAnchor="middle">16k</text>
                  <text x="400" y="228" fontFamily="monospace" fontSize="8" fill="gray" textAnchor="middle">32k {lang === "en" ? "Signals" : "信号"}</text>

                  {/* Ethernet Curve */}
                  <path d="M 100 55 Q 145 80 190 100 T 290 150 T 400 185" fill="none" stroke="#D1CFC9" strokeWidth="1.5" strokeDasharray="3 2" />
                  
                  {/* InfiniBand Curve */}
                  <path d="M 100 30 Q 145 40 190 48 T 290 85 T 400 135" fill="none" stroke="#9ca3af" strokeWidth="2" />

                  {/* Prism-Edge Line */}
                  <motion.path
                    d="M 100 21 Q 145 22 190 23 T 290 30 T 400 39"
                    fill="none" stroke="#7C6AF7" strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                  />

                  {/* Dynamic interactive selector dots */}
                  {activeNodes === 1024 && (
                    <g>
                      <circle cx="100" cy="55" r="3" fill="#D1CFC9" />
                      <circle cx="100" cy="30" r="3" fill="#9ca3af" />
                      <circle cx="100" cy="21" r="5" fill="#7C6AF7" />
                    </g>
                  )}
                  {activeNodes === 4096 && (
                    <g>
                      <circle cx="190" cy="100" r="3" fill="#D1CFC9" />
                      <circle cx="190" cy="48" r="3" fill="#9ca3af" />
                      <circle cx="190" cy="23" r="5" fill="#7C6AF7" />
                    </g>
                  )}
                  {activeNodes === 16384 && (
                    <g>
                      <circle cx="290" cy="150" r="3" fill="#D1CFC9" />
                      <circle cx="290" cy="85" r="3" fill="#9ca3af" />
                      <circle cx="290" cy="30" r="5" fill="#7C6AF7" />
                    </g>
                  )}
                  {activeNodes === 32768 && (
                    <g>
                      <circle cx="400" cy="185" r="3" fill="#D1CFC9" />
                      <circle cx="400" cy="135" r="3" fill="#9ca3af" />
                      <circle cx="400" cy="39" r="5" fill="#7C6AF7" />
                    </g>
                  )}
                </svg>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. PRODUCT MATRIX */}
      <section id="products" className="py-20 border-b border-[#0A0A0A]/10 bg-[#F2EFE9] scroll-mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#7C6AF7] font-semibold block">{t.products.sectionNum}</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#0A0A0A] leading-tight">
              {t.products.title}
            </h2>
            <p className="text-[#0A0A0A]/70 text-sm md:text-base leading-relaxed">
              {t.products.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prod 1 */}
            <div className="border border-[#0A0A0A]/15 bg-white rounded-sm p-6 flex flex-col justify-between group hover:border-[#0A0A0A]/40 hover:shadow-sm transition-all">
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] uppercase text-gray-500 bg-[#0A0A0A]/5 px-2 py-0.5 rounded-sm font-bold">{t.products.prod1Tag}</span>
                  <span className="font-mono text-[#7C6AF7] font-bold text-xs">[01]</span>
                </div>
                <h3 className="font-serif text-xl font-bold group-hover:text-[#7C6AF7] transition-all text-[#0A0A0A]">{t.products.prod1Title}</h3>
                <p className="text-xs text-[#0A0A0A]/75 leading-relaxed">{t.products.prod1Desc}</p>
                <div className="border-t border-[#0A0A0A]/5 pt-3 text-[11px] font-mono space-y-1.5 text-gray-600">
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-sm bg-[#7C6AF7]" /> {t.products.prod1Bullet1}</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-sm bg-[#7C6AF7]" /> {t.products.prod1Bullet2}</div>
                </div>
              </div>
              <div className="pt-6">
                <a href="#early-access" className="w-full text-center py-2 border border-[#0A0A0A] text-xs font-bold hover:bg-[#0A0A0A] hover:text-[#F2EFE9] rounded-sm transition-all inline-block">{t.products.prod1Btn}</a>
              </div>
            </div>

            {/* Prod 2 */}
            <div className="border border-[#0A0A0A]/15 bg-white rounded-sm p-6 flex flex-col justify-between group hover:border-[#0A0A0A]/40 hover:shadow-sm transition-all">
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] uppercase text-[#7C6AF7] bg-[#7C6AF7]/10 px-2 py-0.5 rounded-sm font-bold">{t.products.prod2Tag}</span>
                  <span className="font-mono text-[#7C6AF7] font-bold text-xs">[02]</span>
                </div>
                <h3 className="font-serif text-xl font-bold group-hover:text-[#7C6AF7] transition-all text-[#0A0A0A]">{t.products.prod2Title}</h3>
                <p className="text-xs text-[#0A0A0A]/75 leading-relaxed">{t.products.prod2Desc}</p>
                <div className="border-t border-[#0A0A0A]/5 pt-3 text-[11px] font-mono space-y-1.5 text-gray-600">
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-sm bg-[#7C6AF7]" /> {t.products.prod2Bullet1}</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-sm bg-[#7C6AF7]" /> {t.products.prod2Bullet2}</div>
                </div>
              </div>
              <div className="pt-6">
                <a href={desktopDownloadHref} {...externalLinkProps(desktopDownloadHref)} className="w-full text-center py-2 bg-[#0A0A0A] text-[#F2EFE9] text-xs font-bold hover:bg-[#7C6AF7] rounded-sm transition-all inline-block">{t.products.prod2Btn}</a>
              </div>
            </div>

            {/* Prod 3 */}
            <div className="border border-[#0A0A0A]/15 bg-white rounded-sm p-6 flex flex-col justify-between group hover:border-[#0A0A0A]/40 hover:shadow-sm transition-all">
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] uppercase text-gray-500 bg-[#0A0A0A]/5 px-2 py-0.5 rounded-sm font-bold">{t.products.prod3Tag}</span>
                  <span className="font-mono text-[#7C6AF7] font-bold text-xs">[03]</span>
                </div>
                <h3 className="font-serif text-xl font-bold group-hover:text-[#7C6AF7] transition-all text-[#0A0A0A]">{t.products.prod3Title}</h3>
                <p className="text-xs text-[#0A0A0A]/75 leading-relaxed">{t.products.prod3Desc}</p>
                <div className="border-t border-[#0A0A0A]/5 pt-3 text-[11px] font-mono space-y-1.5 text-gray-600">
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-sm bg-[#7C6AF7]" /> {t.products.prod3Bullet1}</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-sm bg-[#7C6AF7]" /> {t.products.prod3Bullet2}</div>
                </div>
              </div>
              <div className="pt-6">
                <a href="#early-access" className="w-full text-center py-2 border border-[#0A0A0A] text-xs font-bold hover:bg-[#0A0A0A] hover:text-[#F2EFE9] rounded-sm transition-all inline-block">{t.products.prod3Btn}</a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. EARLY ACCESS */}
      <section id="early-access" className="py-24 md:py-32 bg-[#0D0D0D] text-[#F2EFE9] relative overflow-hidden scroll-mt-12 border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-sm pointer-events-none select-none z-0 rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-sm pointer-events-none select-none z-0 rotate-45" strokeDasharray="3 3" />

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-8">
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#7C6AF7] font-bold block">{t.reservation.sectionNum}</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              {t.reservation.title}
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              {t.reservation.subtitle}
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#111111] border border-[#7C6AF7]/30 rounded-sm p-6 text-center space-y-3 shadow-lg"
              >
                <div className="w-10 h-10 bg-[#7C6AF7]/10 rounded-sm flex items-center justify-center mx-auto text-[#7C6AF7]">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-white">{t.reservation.successTitle}</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {t.reservation.successDesc.replace("{id}", requestId || "00000")}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3 text-left">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder={t.reservation.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#111111] border border-white/10 rounded-sm px-4 py-2.5 text-xs focus:outline-none focus:border-[#7C6AF7] text-white transition-all placeholder:text-gray-600 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#F2EFE9] text-[#0A0A0A] hover:bg-white transition-colors px-5 py-2.5 rounded-sm text-xs font-bold shrink-0 cursor-pointer disabled:opacity-50 font-sans"
                  >
                    {isSubmitting ? t.reservation.btnQueue : t.reservation.btnSubmit}
                  </button>
                </div>
                {submitError && (
                  <p className="text-[10px] text-red-300 text-center font-medium">
                    {submitError}
                  </p>
                )}
                <p className="text-[8px] text-gray-500 font-mono text-center uppercase tracking-widest">
                  {t.reservation.disclaimer}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] text-gray-500 text-xs border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-[#F2EFE9] text-sm tracking-tight">Prism-Edge</span>
            <span className="text-[8px] font-mono border border-white/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wider text-gray-400 font-bold">
              {t.footer.physLayerConnected}
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-gray-400 font-mono text-[8px] uppercase tracking-widest font-bold">
            <a href="#scale" className="hover:text-[#7C6AF7] transition-colors">{t.footer.metrics}</a>
            <a href="#architecture" className="hover:text-[#7C6AF7] transition-colors">{t.footer.architect}</a>
            <a href="#benchmarks" className="hover:text-[#7C6AF7] transition-colors">{t.footer.benchmarks}</a>
            <a href="#products" className="hover:text-[#7C6AF7] transition-colors">{t.footer.alloc}</a>
          </div>

          <div className="text-[8px] font-mono text-gray-600 font-semibold tracking-wider">
            {t.footer.copyright}
          </div>
        </div>
      </footer>

    </div>
  );
}
