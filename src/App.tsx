/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { 
  ArrowRight, 
  Network, 
  Cpu, 
  Layers, 
  Check, 
  Menu, 
  X,
  Info,
  Globe,
  MousePointer2
} from "lucide-react";
import { translations, MetricCategory, TranslationModel } from "./translations";

type PrismEdgeLogoProps = {
  variant?: "light" | "dark";
  compact?: boolean;
  showSubtitle?: boolean;
};

type RequestIntent = "api" | "sdk" | "team" | "methodology";

function PrismEdgeLogo({ variant = "light", compact = false, showSubtitle = false }: PrismEdgeLogoProps) {
  const isDark = variant === "dark";
  const ink = isDark ? "#F2EFE9" : "#0A0A0A";
  const wordClass = isDark ? "text-[#F2EFE9]" : "text-[#0A0A0A]";
  const markSize = compact ? "w-7 h-7" : "w-8 h-8 md:w-9 md:h-9";
  const textSize = compact ? "text-base" : "text-xl md:text-2xl";

  return (
    <span className={`inline-flex items-center ${compact ? "gap-2" : "gap-2.5"}`}>
      <svg className={`${markSize} shrink-0 overflow-visible`} viewBox="0 0 112 112" aria-hidden="true">
        <path d="M18 86 L56 20 L94 86 Z" fill="none" stroke={ink} strokeWidth="7" strokeLinejoin="round" />
        <path d="M56 20 L56 86" stroke={ink} strokeWidth="4" strokeLinecap="round" />
        <path d="M56 50 L98 38" stroke="#7C6AF7" strokeWidth="6" strokeLinecap="round" />
        <path d="M56 50 L101 62" stroke="#7C6AF7" strokeWidth="3" strokeLinecap="round" opacity="0.82" />
        <path d="M56 50 L94 79" stroke="#7C6AF7" strokeWidth="3" strokeLinecap="round" opacity="0.52" />
        <circle cx="56" cy="50" r="6" fill="#7C6AF7" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`relative inline-flex items-end pb-1.5 ${textSize} tracking-tight`}>
          <span className={`font-serif font-bold ${wordClass}`}>Prism</span>
          <span className="font-sans font-extrabold text-[#7C6AF7] -ml-0.5 inline-block -skew-x-6 origin-bottom-left">-Edge</span>
          <span className="absolute left-0 bottom-0 h-[2px] w-[43%]" style={{ backgroundColor: ink }} />
          <span className="absolute left-[43%] bottom-0 h-[2px] w-[57%] bg-[#7C6AF7]" />
          <span className="absolute -right-1 bottom-[-2px] h-2 w-2 rotate-45 border-r-2 border-t-2 border-[#7C6AF7]" />
        </span>
        {showSubtitle && (
          <span className="mt-1 font-mono text-[8px] font-bold tracking-[0.22em] uppercase text-[#0A0A0A]/55">
            Diagnostic Market Terminal
          </span>
        )}
      </span>
    </span>
  );
}

type QuantBenchmarkPoint = {
  date: string;
  model: number;
  highFlyer: number;
  aqr: number;
};

type QuantSeriesKey = "model" | "highFlyer" | "aqr";

const quantBenchmarkPoints: QuantBenchmarkPoint[] = [
  { date: "2026-01-09", model: 1.68, highFlyer: 0.00, aqr: 0.00 },
  { date: "2026-01-19", model: 3.07, highFlyer: 0.25, aqr: -2.60 },
  { date: "2026-01-27", model: 5.67, highFlyer: 3.09, aqr: -1.87 },
  { date: "2026-02-04", model: 3.80, highFlyer: 1.07, aqr: -1.38 },
  { date: "2026-02-12", model: 6.33, highFlyer: 1.44, aqr: -2.85 },
  { date: "2026-03-02", model: 11.86, highFlyer: 8.22, aqr: -2.36 },
  { date: "2026-03-10", model: 11.99, highFlyer: 5.44, aqr: -2.93 },
  { date: "2026-03-18", model: 11.88, highFlyer: 4.91, aqr: -2.60 },
  { date: "2026-03-26", model: 12.85, highFlyer: 0.40, aqr: -2.20 },
  { date: "2026-04-03", model: 12.39, highFlyer: -1.03, aqr: -1.22 },
  { date: "2026-04-14", model: 17.32, highFlyer: 5.93, aqr: -4.80 },
  { date: "2026-04-22", model: 20.60, highFlyer: 11.21, aqr: -5.70 },
  { date: "2026-04-30", model: 21.53, highFlyer: 13.79, aqr: -5.53 },
  { date: "2026-05-13", model: 32.16, highFlyer: 19.55, aqr: -6.10 },
  { date: "2026-05-21", model: 25.43, highFlyer: 18.46, aqr: -5.29 },
  { date: "2026-05-29", model: 24.65, highFlyer: 14.30, aqr: -4.96 },
  { date: "2026-06-08", model: 26.85, highFlyer: 14.58, aqr: -4.88 },
  { date: "2026-06-16", model: 36.57, highFlyer: 12.93, aqr: -5.13 },
  { date: "2026-06-25", model: 44.17, highFlyer: 21.43, aqr: -7.00 },
  { date: "2026-07-03", model: 39.69, highFlyer: 21.84, aqr: -8.06 },
  { date: "2026-07-13", model: 38.97, highFlyer: 16.03, aqr: -6.27 },
  { date: "2026-07-14", model: 38.14, highFlyer: 16.03, aqr: -6.35 },
];

const quantBenchmarkEndpoint = quantBenchmarkPoints[quantBenchmarkPoints.length - 1];
const reportedModelMaxDrawdown = -6.57;
const quantBenchmarkLead = quantBenchmarkEndpoint.model - quantBenchmarkEndpoint.highFlyer;
const benchmarkModelColor = "#51478F";
const benchmarkAccentColor = "#463E7A";
const benchmarkHighFlyerColor = "#8A8074";
const benchmarkAqrColor = "#4D6B92";
const benchmarkDrawdownColor = "#B44D5C";
const editorialEase = [0.22, 1, 0.36, 1] as const;

const formatSignedPercent = (value: number) =>
  `${value < 0 ? "−" : ""}${Math.abs(value).toFixed(2)}%`;

const formatBenchmarkCopy = (value: string) => value
  .replaceAll("{model}", quantBenchmarkEndpoint.model.toFixed(2))
  .replaceAll("{highFlyer}", quantBenchmarkEndpoint.highFlyer.toFixed(2))
  .replaceAll("{aqr}", Math.abs(quantBenchmarkEndpoint.aqr).toFixed(2))
  .replaceAll("{lead}", quantBenchmarkLead.toFixed(2))
  .replaceAll("{drawdown}", Math.abs(reportedModelMaxDrawdown).toFixed(2));

type QuantChartGeometry = {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  min: number;
  max: number;
};

const quantYTicks = [-10, 0, 10, 20, 30, 40, 50];
const quantXTicks = [
  { index: 0, label: "JAN" },
  { index: 5, label: "MAR" },
  { index: 13, label: "MAY" },
  { index: 21, label: "JUL" },
];

const quantX = (chart: QuantChartGeometry, index: number) => {
  const plotWidth = chart.width - chart.left - chart.right;
  return chart.left + (index / (quantBenchmarkPoints.length - 1)) * plotWidth;
};

const quantY = (chart: QuantChartGeometry, value: number) => {
  const plotHeight = chart.height - chart.top - chart.bottom;
  return chart.top + ((chart.max - value) / (chart.max - chart.min)) * plotHeight;
};

const quantPath = (chart: QuantChartGeometry, series: QuantSeriesKey) =>
  quantBenchmarkPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${quantX(chart, index).toFixed(2)} ${quantY(chart, point[series]).toFixed(2)}`)
    .join(" ");

function LiveBenchmarkSection({ copy }: { copy: TranslationModel["liveBenchmark"] }) {
  const [activeSeries, setActiveSeries] = useState<QuantSeriesKey | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);
  const [chartWidth, setChartWidth] = useState(1040);
  const chartFrameRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const frame = chartFrameRef.current;
    if (!frame) return;
    const updateChartWidth = () => {
      setChartWidth(Math.max(280, Math.round(frame.getBoundingClientRect().width)));
    };
    updateChartWidth();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(updateChartWidth);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const chartTier: "mobile" | "tablet" | "desktop" =
    chartWidth < 560 ? "mobile" : chartWidth < 840 ? "tablet" : "desktop";
  const chartHeight = Math.round(Math.min(390, Math.max(280, 280 + (chartWidth - 320) * 0.22)));
  const quantChart: QuantChartGeometry = {
    width: chartWidth,
    height: chartHeight,
    left: chartTier === "mobile" ? 38 : 50,
    right: chartTier === "desktop" ? 188 : 16,
    top: 28,
    bottom: chartTier === "mobile" ? 38 : 44,
    min: -10,
    max: 50,
  };
  const chartXTicks = chartTier === "mobile"
    ? quantXTicks.filter((tick) => tick.index === 0 || tick.index === 13 || tick.index === 21)
    : quantXTicks;
  const xOf = (index: number) => quantX(quantChart, index);
  const yOf = (value: number) => quantY(quantChart, value);
  const lastPoint = quantBenchmarkEndpoint;
  const leadValue = formatBenchmarkCopy(copy.leadValue);
  const metrics: Array<{ label: string; value: string; hint: string; color: string; seriesKey?: QuantSeriesKey }> = [
    { label: copy.modelLabel, value: formatSignedPercent(lastPoint.model), hint: copy.modelHint, color: benchmarkModelColor, seriesKey: "model" },
    { label: copy.highFlyerLabel, value: formatSignedPercent(lastPoint.highFlyer), hint: copy.highFlyerHint, color: benchmarkHighFlyerColor, seriesKey: "highFlyer" },
    { label: copy.aqrLabel, value: formatSignedPercent(lastPoint.aqr), hint: copy.aqrHint, color: benchmarkAqrColor, seriesKey: "aqr" },
    { label: copy.maxDrawdownLabel, value: formatSignedPercent(reportedModelMaxDrawdown), hint: copy.maxDrawdownHint, color: benchmarkDrawdownColor },
  ];
  const series = [
    { key: "model" as const, label: copy.modelLabel, color: benchmarkModelColor, width: 2.4, dash: undefined },
    { key: "highFlyer" as const, label: copy.highFlyerLabel, color: benchmarkHighFlyerColor, width: 1.65, dash: "7 5" },
    { key: "aqr" as const, label: copy.aqrLabel, color: benchmarkAqrColor, width: 1.55, dash: "2 5" },
  ];
  const displayIndex = hoveredIndex ?? lockedIndex;
  const displayedPoint = displayIndex === null ? null : quantBenchmarkPoints[displayIndex];
  const lastPointX = xOf(quantBenchmarkPoints.length - 1);
  const leadBracketX = lastPointX - 20;
  const leadMidY = (yOf(lastPoint.model) + yOf(lastPoint.highFlyer)) / 2;
  const displayXPercent = displayIndex === null ? 0 : (xOf(displayIndex) / quantChart.width) * 100;
  const tooltipShift = displayXPercent > 72 ? "-100%" : displayXPercent < 24 ? "0%" : "-50%";
  const endpointLabelLeft = `${((lastPointX + 24) / quantChart.width) * 100}%`;
  const endpointLabelPositions = series
    .map((item) => ({ key: item.key, y: yOf(lastPoint[item.key]) }))
    .sort((a, b) => a.y - b.y);
  const endpointLabelGap = 38;
  endpointLabelPositions.forEach((position, index) => {
    if (index === 0) return;
    position.y = Math.max(position.y, endpointLabelPositions[index - 1].y + endpointLabelGap);
  });
  const endpointOverflow = endpointLabelPositions[endpointLabelPositions.length - 1].y - (quantChart.height - 24);
  if (endpointOverflow > 0) {
    endpointLabelPositions.forEach((position) => { position.y -= endpointOverflow; });
  }
  const endpointLabelY = Object.fromEntries(
    endpointLabelPositions.map((position) => [position.key, position.y]),
  ) as Record<QuantSeriesKey, number>;

  const toggleSeries = (key: QuantSeriesKey) => {
    setActiveSeries((current) => current === key ? null : key);
  };

  const chartIndexFromPointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * quantChart.width;
    const plotWidth = quantChart.width - quantChart.left - quantChart.right;
    const boundedX = Math.min(Math.max(pointerX, quantChart.left), quantChart.width - quantChart.right);
    return Math.round(((boundedX - quantChart.left) / plotWidth) * (quantBenchmarkPoints.length - 1));
  };

  const handleChartPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.pointerType !== "touch") {
      setHoveredIndex(chartIndexFromPointer(event));
    }
  };

  const handleChartPointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.pointerType === "touch") {
      touchStartRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      };
      return;
    }
    const nextIndex = chartIndexFromPointer(event);
    setLockedIndex((current) => current === nextIndex ? null : nextIndex);
    setHoveredIndex(null);
  };

  const handleChartPointerUp = (event: React.PointerEvent<SVGSVGElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || start.pointerId !== event.pointerId) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) return;
    const nextIndex = chartIndexFromPointer(event);
    setLockedIndex((current) => current === null ? nextIndex : null);
    setHoveredIndex(null);
  };

  const handleChartKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === "Escape") {
      setHoveredIndex(null);
      setLockedIndex(null);
      return;
    }
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const currentIndex = displayIndex ?? quantBenchmarkPoints.length - 1;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = Math.min(
      quantBenchmarkPoints.length - 1,
      Math.max(0, currentIndex + direction),
    );
    setHoveredIndex(null);
    setLockedIndex(nextIndex);
  };

  return (
    <section
      id="live-benchmark"
      aria-labelledby="live-benchmark-title"
      className="relative overflow-hidden border-y border-[#0A0A0A]/10 bg-[#F2EFE9] py-16 scroll-mt-16 xl:py-20"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <header className="mb-8 grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1.75fr)_minmax(360px,0.95fr)] lg:gap-14">
          <motion.div
            className="min-w-0 space-y-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.72, ease: editorialEase }}
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6758C9]" />
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5648A8]">{copy.eyebrow}</span>
            </div>
            <h2 id="live-benchmark-title" className="max-w-none text-balance font-serif text-4xl font-medium leading-[1.12] tracking-[-0.015em] text-[#0A0A0A] md:text-5xl lg:text-[3.15rem]">
              <span className="flex flex-wrap items-baseline gap-x-[0.16em]">
                <span className="whitespace-nowrap">{copy.titleLead}</span>
                <span className="whitespace-nowrap">{copy.titleTail}</span>
              </span>
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[#0A0A0A]/66 md:text-base">
              {copy.subtitle}
            </p>
          </motion.div>

          <motion.aside
            className="relative min-w-0 py-1 pl-6 lg:mt-1 lg:pl-7"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.72, delay: prefersReducedMotion ? 0 : 0.1, ease: editorialEase }}
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-0.5 bg-[#6758C9]"
              initial={prefersReducedMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.18, ease: editorialEase }}
              style={{ transformOrigin: "top" }}
            />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#0A0A0A]/65">{copy.conclusionLabel}</span>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-sans text-[1.55rem] font-semibold tracking-[-0.025em] text-[#171715] md:text-[1.7rem]">
                {copy.leadPrefix}
              </span>
              <motion.span
                className="font-mono text-[1.95rem] font-semibold tracking-[-0.05em] tabular-nums text-[#5648A8] md:text-[2.15rem]"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.58, delay: prefersReducedMotion ? 0 : 0.28, ease: editorialEase }}
              >
                {leadValue}
              </motion.span>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#0A0A0A]/68">{formatBenchmarkCopy(copy.conclusion)}</p>
            <div className="mt-4 font-mono text-[10px] font-bold tracking-[0.06em] text-[#5648A8]">
              {copy.scopeLabel} · {copy.scopeValue}
            </div>
          </motion.aside>
        </header>

        <div className="mb-5 grid grid-cols-2 border-y border-[#0A0A0A]/12 lg:grid-cols-[1.45fr_1fr_1fr_1fr]">
          {metrics.map((metric, index) => {
            const isActive = metric.seriesKey ? activeSeries === metric.seriesKey : false;
            const content = (
              <>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: metric.color }} />
                  <span className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.11em] text-[#0A0A0A]/65">{metric.label}</span>
                </div>
                <div
                  className={`mt-3 font-mono font-semibold tracking-[-0.04em] tabular-nums ${
                    index === 0 ? "text-3xl md:text-[2.35rem]" : "text-2xl md:text-3xl"
                  }`}
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </div>
                <span className="sr-only">{metric.hint}</span>
              </>
            );
            const cellClasses = `relative min-w-0 px-4 py-4 text-left transition-colors md:px-5 ${
              index % 2 === 1 ? "border-l border-[#0A0A0A]/10" : ""
            } ${index >= 2 ? "border-t border-[#0A0A0A]/10 lg:border-t-0" : ""} ${
              index > 0 ? "lg:border-l lg:border-[#0A0A0A]/10" : ""
            }`;

            if (!metric.seriesKey) {
              return (
                <motion.article
                  key={metric.label}
                  className={cellClasses}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.54, delay: prefersReducedMotion ? 0 : 0.16 + index * 0.06, ease: editorialEase }}
                >
                  {content}
                </motion.article>
              );
            }

            return (
              <motion.button
                type="button"
                key={metric.label}
                onClick={() => toggleSeries(metric.seriesKey as QuantSeriesKey)}
                aria-pressed={isActive}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.54, delay: prefersReducedMotion ? 0 : 0.16 + index * 0.06, ease: editorialEase }}
                className={`${cellClasses} cursor-pointer hover:bg-white/45 ${
                  isActive ? "bg-white/65" : ""
                }`}
                style={isActive ? { boxShadow: `inset 0 -2px 0 ${metric.color}` } : undefined}
              >
                {content}
              </motion.button>
            );
          })}
        </div>

        <motion.figure
          className="overflow-hidden border-y border-[#0A0A0A]/12 bg-[#F8F6F2]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.72, delay: prefersReducedMotion ? 0 : 0.2, ease: editorialEase }}
        >
          <div className="flex flex-col gap-4 border-b border-[#0A0A0A]/10 px-5 py-4 md:px-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#0A0A0A]">{copy.chartTitle}</h3>
              <p className="mt-1 inline-flex items-center gap-2 text-[11px] leading-relaxed text-[#0A0A0A]/65">
                <MousePointer2 className="h-3.5 w-3.5 shrink-0 text-[#5648A8]" aria-hidden="true" />
                {copy.interactionHint}
              </p>
            </div>

            {activeSeries && (
              <button
                type="button"
                onClick={() => setActiveSeries(null)}
                className="min-h-11 self-start border border-[#0A0A0A]/12 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#0A0A0A]/65 transition-colors hover:border-[#6758C9]/40 hover:text-[#5648A8] sm:self-auto"
              >
                {copy.showAllLabel}
              </button>
            )}
          </div>

          <div className="px-3 pt-3 sm:px-5 md:px-7 md:pt-5">
            <div ref={chartFrameRef} className="relative">
              <svg
                viewBox={`0 0 ${quantChart.width} ${quantChart.height}`}
                className="block w-full cursor-crosshair rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6758C9] focus-visible:ring-offset-4"
                role="group"
                tabIndex={0}
                aria-labelledby="quant-chart-title"
                aria-describedby="quant-chart-description quant-chart-keyboard-help"
                onPointerMove={handleChartPointerMove}
                onPointerLeave={() => setHoveredIndex(null)}
                onPointerDown={handleChartPointerDown}
                onPointerUp={handleChartPointerUp}
                onPointerCancel={() => { touchStartRef.current = null; }}
                onKeyDown={handleChartKeyDown}
                style={{ touchAction: "pan-y", height: quantChart.height }}
              >
              <title id="quant-chart-title">{copy.chartTitle}</title>
              <desc id="quant-chart-description">{copy.subtitle}</desc>
              {quantYTicks.map((tick) => (
                <g key={tick}>
                  <line
                    x1={quantChart.left}
                    x2={quantChart.width - quantChart.right}
                    y1={yOf(tick)}
                    y2={yOf(tick)}
                    stroke={tick === 0 ? "#77726B" : "#D8D4CE"}
                    strokeOpacity={tick === 0 ? 0.48 : 0.46}
                    strokeWidth={tick === 0 ? 1 : 0.8}
                    vectorEffect="non-scaling-stroke"
                  />
                  <text x={quantChart.left - 10} y={yOf(tick) + 4} textAnchor="end" fill="#6D6963" fontFamily="monospace" fontSize="10">
                    {tick}%
                  </text>
                </g>
              ))}
              {chartXTicks.map((tick) => (
                <g key={tick.label}>
                  <line
                    x1={xOf(tick.index)}
                    x2={xOf(tick.index)}
                    y1={quantChart.top}
                    y2={quantChart.height - quantChart.bottom}
                    stroke="#D8D4CE"
                    strokeOpacity="0.3"
                    strokeDasharray="3 5"
                    vectorEffect="non-scaling-stroke"
                  />
                  <text
                    x={xOf(tick.index)}
                    y={quantChart.height - 14}
                    textAnchor={tick.index === 0 ? "start" : tick.index === quantBenchmarkPoints.length - 1 ? "end" : "middle"}
                    fill="#6D6963"
                    fontFamily="monospace"
                    fontSize="10"
                  >
                    {tick.label}
                  </text>
                </g>
              ))}
              {series.map((item, index) => (
                <motion.path
                  key={item.key}
                  d={quantPath(quantChart, item.key)}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={activeSeries === item.key ? item.width + 0.7 : item.width}
                  strokeOpacity={
                    activeSeries
                      ? activeSeries === item.key ? 1 : 0.2
                      : item.key === "model" ? 0.94 : 0.64
                  }
                  strokeDasharray={item.dash}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  initial={
                    prefersReducedMotion
                      ? false
                      : item.key === "model"
                        ? { pathLength: 0, opacity: 0 }
                        : { opacity: 0 }
                  }
                  whileInView={
                    item.key === "model"
                      ? { pathLength: 1, opacity: 1 }
                      : { opacity: 1 }
                  }
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: item.key === "model" ? 1.15 : 0.55,
                    delay: prefersReducedMotion ? 0 : item.key === "model" ? 0.35 : 0.72 + index * 0.1,
                    ease: editorialEase,
                  }}
                  style={{ transition: "stroke-opacity 180ms ease, stroke-width 180ms ease" }}
                />
              ))}
              {series.map((item, index) => {
                return (
                  <motion.circle
                    key={`${item.key}-endpoint`}
                    cx={xOf(quantBenchmarkPoints.length - 1)}
                    cy={yOf(lastPoint[item.key])}
                    r="3.4"
                    fill="#F8F6F2"
                    stroke={item.color}
                    strokeWidth={activeSeries === item.key ? 2.3 : 1.6}
                    opacity={
                      activeSeries
                        ? activeSeries === item.key ? 1 : 0.2
                        : item.key === "model" ? 0.94 : 0.64
                    }
                    vectorEffect="non-scaling-stroke"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.72 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.38, delay: prefersReducedMotion ? 0 : 1.12 + index * 0.08, ease: editorialEase }}
                    style={{ transition: "opacity 180ms ease" }}
                  />
                );
              })}
              {chartTier === "desktop" && series.map((item) => (
                <motion.line
                  key={`${item.key}-endpoint-guide`}
                  x1={lastPointX + 4}
                  x2={lastPointX + 24}
                  y1={yOf(lastPoint[item.key])}
                  y2={endpointLabelY[item.key]}
                  stroke={item.color}
                  strokeWidth="1"
                  strokeOpacity={activeSeries && activeSeries !== item.key ? 0.16 : 0.48}
                  vectorEffect="non-scaling-stroke"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 1.18, ease: editorialEase }}
                />
              ))}
              {chartTier !== "mobile" && (
                <motion.g
                  aria-hidden="true"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.42,
                    delay: prefersReducedMotion ? 0 : 1.24,
                    ease: editorialEase,
                  }}
                >
                <g
                  opacity={activeSeries === null ? 1 : 0}
                  style={{ transition: "opacity 180ms ease" }}
                >
                <rect
                  x={leadBracketX - 82}
                  y={leadMidY - 10}
                  width="70"
                  height="20"
                  rx="10"
                  fill="#F3F0EA"
                  stroke="#D4CFC7"
                  strokeWidth="0.8"
                />
                <text
                  x={leadBracketX - 47}
                  y={leadMidY + 3}
                  textAnchor="middle"
                  fill={benchmarkAccentColor}
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="8.5"
                  fontWeight="700"
                >
                  {leadValue}
                </text>
                </g>
                </motion.g>
              )}
              {displayedPoint && displayIndex !== null && (
                <g pointerEvents="none">
                  <line
                    x1={xOf(displayIndex)}
                    x2={xOf(displayIndex)}
                    y1={quantChart.top}
                    y2={quantChart.height - quantChart.bottom}
                    stroke="#0A0A0A"
                    strokeOpacity="0.28"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                    vectorEffect="non-scaling-stroke"
                  />
                  {series.map((item) => (
                    <circle
                      key={`${item.key}-hover`}
                      cx={xOf(displayIndex)}
                      cy={yOf(displayedPoint[item.key])}
                      r={activeSeries === item.key ? 5 : 4}
                      fill="#F8F6F2"
                      stroke={item.color}
                      strokeWidth="2.5"
                      opacity={activeSeries && activeSeries !== item.key ? 0.2 : 1}
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </g>
              )}
              </svg>

              {chartTier === "desktop" && series.map((item, index) => {
                const value = lastPoint[item.key];
                const formattedValue = `${value < 0 ? "−" : ""}${Math.abs(value).toFixed(2)}%`;
                const isMuted = activeSeries !== null && activeSeries !== item.key;
                return (
                  <motion.div
                    key={`${item.key}-direct-label`}
                    className="absolute -translate-y-1/2"
                    style={{
                      left: endpointLabelLeft,
                      top: `${(endpointLabelY[item.key] / quantChart.height) * 100}%`,
                    }}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.42,
                      delay: prefersReducedMotion ? 0 : 1.2 + index * 0.08,
                      ease: editorialEase,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSeries(item.key)}
                      aria-pressed={activeSeries === item.key}
                      className={`flex items-center gap-2 whitespace-nowrap py-1 pl-0 pr-1.5 text-left transition-opacity ${
                        isMuted ? "opacity-25" : "opacity-100"
                      }`}
                    >
                      <span
                        className="block h-px w-4 shrink-0"
                        style={{
                          backgroundColor: item.dash ? "transparent" : item.color,
                          backgroundImage: item.dash
                            ? `repeating-linear-gradient(to right, ${item.color} 0 4px, transparent 4px 7px)`
                            : undefined,
                        }}
                      />
                      <span>
                        <span className="block text-[10px] font-semibold text-[#0A0A0A]/68">{item.label}</span>
                        <strong className="block font-mono text-[11px] tabular-nums" style={{ color: item.color }}>{formattedValue}</strong>
                      </span>
                    </button>
                  </motion.div>
                );
              })}

              <AnimatePresence>
                {displayedPoint && (
                  <motion.div
                    key="benchmark-tooltip"
                    className="pointer-events-none absolute top-4 z-10 min-w-[174px]"
                    style={{ left: `${displayXPercent}%`, transform: `translateX(${tooltipShift})` }}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.16 }}
                  >
                    <motion.div
                      role={lockedIndex !== null && hoveredIndex === null ? "status" : undefined}
                      aria-live={lockedIndex !== null && hoveredIndex === null ? "polite" : undefined}
                      aria-atomic={lockedIndex !== null && hoveredIndex === null ? "true" : undefined}
                      className="border border-[#0A0A0A]/15 bg-[#F8F6F2]/97 p-3 shadow-[0_14px_36px_rgba(10,10,10,0.12)] backdrop-blur-sm"
                      initial={prefersReducedMotion ? false : { y: 7, scale: 0.985 }}
                      animate={{ y: 0, scale: 1 }}
                      exit={{ y: 4, scale: 0.99 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.18,
                        ease: editorialEase,
                      }}
                    >
                      <div className="border-b border-[#0A0A0A]/10 pb-2 font-mono text-[10px] font-bold tracking-wide text-[#0A0A0A]/65">
                        {displayedPoint.date}
                      </div>
                      <div className="mt-2 space-y-1.5">
                        {series.map((item) => (
                          <div key={`${item.key}-tooltip`} className="flex items-center justify-between gap-5">
                            <span className="inline-flex items-center gap-1.5 text-[10px] text-[#0A0A0A]/68">
                              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                              {item.label}
                            </span>
                            <span className="font-mono text-[11px] font-bold tabular-nums" style={{ color: item.color }}>
                              {displayedPoint[item.key].toFixed(2)}%
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between gap-5 border-t border-[#0A0A0A]/10 pt-2">
                          <span className="text-[10px] font-semibold text-[#0A0A0A]/65">{copy.dailyLeadLabel}</span>
                          <span className="font-mono text-[11px] font-bold tabular-nums text-[#5648A8]">
                            {displayedPoint.model - displayedPoint.highFlyer >= 0 ? "+" : ""}
                            {(displayedPoint.model - displayedPoint.highFlyer).toFixed(2)}pp
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {chartTier !== "desktop" && (
              <div className="grid grid-cols-3 border-t border-[#0A0A0A]/10">
              {series.map((item, index) => {
                const value = lastPoint[item.key];
                return (
                  <button
                    type="button"
                    key={`${item.key}-mobile-label`}
                    onClick={() => toggleSeries(item.key)}
                    aria-pressed={activeSeries === item.key}
                    className={`min-w-0 px-2 py-3 text-left ${index > 0 ? "border-l border-[#0A0A0A]/10" : ""}`}
                  >
                    <span className="block truncate text-[10px] font-semibold text-[#0A0A0A]/65">{item.label}</span>
                    <strong className="mt-1 block font-mono text-[11px] tabular-nums" style={{ color: item.color }}>
                      {value < 0 ? "−" : ""}{Math.abs(value).toFixed(2)}%
                    </strong>
                  </button>
                );
              })}
              </div>
            )}
          </div>

          <figcaption className="grid gap-4 border-t border-[#0A0A0A]/10 px-5 py-4 md:px-7 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-start">
            <a
              href="https://sgsyen.com/research?view=panorama"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 text-xs font-bold text-[#5648A8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6758C9]"
            >
              {copy.sourceLink}
            </a>
            <p className="max-w-3xl text-[11px] leading-relaxed text-[#0A0A0A]/65 lg:mx-auto lg:text-center">
              {copy.evidenceLine}
            </p>
            <details className="group max-w-4xl lg:text-right">
              <summary className="cursor-pointer list-none font-mono text-[11px] font-bold text-[#0A0A0A]/68 transition-colors hover:text-[#0A0A0A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6758C9] focus-visible:ring-offset-4">
                <span className="inline-flex items-center gap-2">
                  {copy.methodLabel}
                  <span aria-hidden="true" className="text-[#5648A8] transition-transform group-open:rotate-45">＋</span>
                </span>
              </summary>
              <p className="mt-3 text-left text-[11px] leading-relaxed text-[#0A0A0A]/68">{copy.disclosure}</p>
            </details>
          </figcaption>

          <div className="sr-only">
            <p id="quant-chart-keyboard-help">{copy.keyboardHint}</p>
            <table>
              <caption>{copy.chartTitle}</caption>
              <thead>
                <tr>
                  <th>{copy.dateLabel}</th>
                  <th>{copy.modelLabel}</th>
                  <th>{copy.highFlyerLabel}</th>
                  <th>{copy.aqrLabel}</th>
                </tr>
              </thead>
              <tbody>
                {quantBenchmarkPoints.map((point) => (
                  <tr key={point.date}>
                    <td>{point.date}</td>
                    <td>{point.model}%</td>
                    <td>{point.highFlyer}%</td>
                    <td>{point.aqr}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}

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
  const [requestIntent, setRequestIntent] = useState<RequestIntent>("api");

  const t = translations[lang];
  const metrics = t.metrics;
  const chartData = t.chartData;
  const nodeSizes = [1024, 4096, 16384, 32768];
  const apiConsoleUrl = import.meta.env.VITE_API_CONSOLE_URL?.trim();
  const apiConsoleHref = apiConsoleUrl || "#early-access";
  const desktopDownloadHref = import.meta.env.VITE_DESKTOP_DOWNLOAD_URL?.trim() || "https://downloads.prismedge.tech/Prism-Edge-Setup-0.1.2-win-x64.exe";
  const requestOptions: Array<{ value: RequestIntent; label: string }> = [
    { value: "api", label: t.reservation.intentApi },
    { value: "sdk", label: t.reservation.intentSdk },
    { value: "team", label: t.reservation.intentTeam },
    { value: "methodology", label: t.reservation.intentMethodology },
  ];
  const navConsoleLabel = apiConsoleUrl
    ? t.nav.consoleApi
    : lang === "en" ? "API / SDK access" : "API / SDK 接入";
  const externalLinkProps = (href: string) =>
    href.startsWith("#") ? {} : { target: "_blank", rel: "noreferrer" };
  const stabilityBand = (value: number) => {
    if (value >= 90) return lang === "en" ? "STRONG" : "强";
    if (value >= 60) return lang === "en" ? "MIXED" : "中";
    return lang === "en" ? "WEAK" : "弱";
  };
  const chooseRequestIntent = (intent: RequestIntent) => {
    setRequestIntent(intent);
    setIsSubmitted(false);
    setSubmitError("");
  };

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  useEffect(() => {
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", closeMenuOnEscape);
    return () => window.removeEventListener("keydown", closeMenuOnEscape);
  }, []);

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
          intent: requestIntent,
          source: `homepage:${requestIntent}`,
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed left-4 top-4 z-[100] rounded-sm bg-[#0A0A0A] px-4 py-2 text-sm font-semibold text-white"
      >
        {lang === "en" ? "Skip to main content" : "跳到主要内容"}
      </a>
      
      {/* 1. TOP NAV */}
      <nav className="sticky top-0 z-50 bg-[#F2EFE9]/90 backdrop-blur-md border-b border-[#0A0A0A]/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8 lg:gap-12">
            <a href="#" className="flex items-center group focus:outline-none" aria-label="Prism-Edge home">
              <PrismEdgeLogo />
            </a>

            <div className="hidden xl:flex items-center gap-8 text-sm font-medium text-[#0A0A0A]/80">
              <a href="#scale" className="hover:text-[#7C6AF7] transition-colors relative focus:outline-none">{t.nav.scale}</a>
              <a href="#architecture" className="hover:text-[#7C6AF7] transition-colors relative focus:outline-none">{t.nav.architecture}</a>
              <a href="#live-benchmark" className="group inline-flex items-center gap-2 text-[#0A0A0A] hover:text-[#7C6AF7] transition-colors relative focus:outline-none">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C6AF7] opacity-55" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7C6AF7]" />
                </span>
                {t.nav.benchmarks}
              </a>
              <a href="#scaling-laws" className="hover:text-[#7C6AF7] transition-colors relative focus:outline-none">{t.nav.scalingLaws}</a>
              <a href="#products" className="hover:text-[#7C6AF7] transition-colors relative focus:outline-none">{t.nav.products}</a>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-3">
            {/* Desktop Globe Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="p-1.5 rounded-sm hover:bg-[#0A0A0A]/5 border border-[#0A0A0A]/10 text-[#0A0A0A] flex items-center gap-1.5 transition-all text-xs font-mono font-bold focus:outline-none cursor-pointer"
              title={lang === "en" ? "切换至中文" : "Switch to English"}
              aria-label={lang === "en" ? "切换至中文" : "Switch to English"}
              id="lang-toggle-desktop"
            >
              <Globe className="w-4 h-4 text-[#7C6AF7]" />
              <span>{lang === "en" ? "EN" : "ZH"}</span>
            </button>

            <a
              href={apiConsoleHref}
              {...externalLinkProps(apiConsoleHref)}
              onClick={() => {
                if (!apiConsoleUrl) chooseRequestIntent("api");
              }}
              className="text-sm font-medium border border-[#0A0A0A] rounded-sm px-4 py-1.5 hover:bg-[#0A0A0A] hover:text-white transition-all focus:outline-none"
            >
              {navConsoleLabel}
            </a>
            <a href="#early-access" onClick={() => chooseRequestIntent("team")} className="text-sm font-medium bg-[#0A0A0A] text-[#F2EFE9] rounded-sm px-4 py-1.5 hover:bg-[#7C6AF7] hover:text-white transition-all focus:outline-none">
              {t.nav.requestAccess}
            </a>
          </div>

          <div className="flex items-center gap-3 xl:hidden">
            {/* Mobile Globe Switcher outside menu */}
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="p-1.5 rounded-sm hover:bg-[#0A0A0A]/5 border border-[#0A0A0A]/10 text-[#0A0A0A] flex items-center gap-1 transition-all text-[11px] font-mono font-bold focus:outline-none"
              title={lang === "en" ? "切换至中文" : "Switch to English"}
              aria-label={lang === "en" ? "切换至中文" : "Switch to English"}
              id="lang-toggle-mobile"
            >
              <Globe className="w-4 h-4 text-[#7C6AF7]" />
              <span>{lang === "en" ? "EN" : "ZH"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#0A0A0A] p-1.5 rounded-sm hover:bg-[#0A0A0A]/5 focus:outline-none"
              aria-label={isMobileMenuOpen ? (lang === "en" ? "Close menu" : "关闭菜单") : (lang === "en" ? "Open menu" : "打开菜单")}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden border-b border-[#0A0A0A]/10 bg-[#F2EFE9] overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4 text-sm font-medium">
                <a href="#scale" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0A0A0A]/70 hover:text-[#7C6AF7] py-1 border-b border-[#0A0A0A]/5">{t.nav.scale}</a>
                <a href="#architecture" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0A0A0A]/70 hover:text-[#7C6AF7] py-1 border-b border-[#0A0A0A]/5">{t.nav.architecture}</a>
                <a href="#live-benchmark" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center gap-2 text-[#0A0A0A] hover:text-[#7C6AF7] py-1 border-b border-[#0A0A0A]/5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7C6AF7]" aria-hidden="true" />
                  {t.nav.benchmarks}
                </a>
                <a href="#scaling-laws" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0A0A0A]/70 hover:text-[#7C6AF7] py-1 border-b border-[#0A0A0A]/5">{t.nav.scalingLaws}</a>
                <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0A0A0A]/70 hover:text-[#7C6AF7] py-1 border-b border-[#0A0A0A]/5">{t.nav.products}</a>
                <div className="flex flex-col gap-2 pt-4">
                  <a
                    href={apiConsoleHref}
                    {...externalLinkProps(apiConsoleHref)}
                    onClick={() => {
                      if (!apiConsoleUrl) chooseRequestIntent("api");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2 border border-[#0A0A0A] rounded-sm font-medium hover:bg-[#0A0A0A] hover:text-white transition-all text-sm"
                  >
                    {navConsoleLabel}
                  </a>
                  <a href="#early-access" onClick={() => { chooseRequestIntent("team"); setIsMobileMenuOpen(false); }} className="w-full text-center py-2 bg-[#0A0A0A] text-[#F2EFE9] rounded-sm font-medium hover:bg-[#7C6AF7] transition-all text-sm">{t.nav.requestAccess}</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="main-content">
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

        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
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
              <a href={desktopDownloadHref} {...externalLinkProps(desktopDownloadHref)} className="bg-[#0A0A0A] hover:bg-[#7C6AF7] text-white font-medium px-6 py-3 rounded-sm transition-all flex items-center justify-center gap-2 text-sm">
                {t.hero.btnRequest} <span className="text-base">→</span>
              </a>
              <a href="#verification-example" className="border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white text-[#0A0A0A] font-medium px-6 py-3 rounded-sm transition-all text-center text-sm">
                {t.hero.btnExplore}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-[10px] font-mono font-semibold text-[#0A0A0A]/55">
              {[t.hero.proofDesktop, t.hero.proofApi, t.hero.proofBenchmark].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-[#7C6AF7]" strokeWidth={2.5} />
                  {item}
                </span>
              ))}
            </div>
            <a
              href="#live-benchmark"
              className="group inline-flex max-w-full items-center gap-2.5 border border-[#7C6AF7]/30 bg-white/60 px-3.5 py-2 text-left shadow-[0_10px_30px_rgba(124,106,247,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#7C6AF7]/55 hover:bg-white hover:shadow-[0_14px_36px_rgba(124,106,247,0.14)]"
            >
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C6AF7] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C6AF7]" />
              </span>
              <span className="min-w-0 font-mono text-[10px] font-bold tracking-wide text-[#0A0A0A]/75 group-hover:text-[#7C6AF7]">
                {formatBenchmarkCopy(t.liveBenchmark.heroEntry)}
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#7C6AF7] transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#early-access"
              onClick={() => chooseRequestIntent("api")}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0A0A0A]/60 underline decoration-[#7C6AF7]/40 underline-offset-4 transition-colors hover:text-[#7C6AF7]"
            >
              {lang === "en" ? "On macOS or mobile? Request API / SDK access" : "使用 macOS 或移动设备？申请 API / SDK 接入"}
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          {/* Side Product Verification Trace */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative p-5 border border-[#0A0A0A]/15 rounded-sm bg-white/65 backdrop-blur-sm max-w-sm w-full shadow-[0_18px_60px_rgba(10,10,10,0.06)]">
              <div className="absolute -top-3 left-4 px-2 bg-[#F2EFE9] border border-[#0A0A0A]/15 rounded-sm">
                <span className="font-mono text-[9px] tracking-wider uppercase text-gray-500 font-semibold">{t.hero.telemetry}</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-[#0A0A0A]/10 pb-3 pt-2">
                <div>
                  <div className="font-serif text-base font-bold text-[#0A0A0A]">{t.hero.traceTitle}</div>
                  <div className="mt-1 font-mono text-[8px] uppercase tracking-widest text-[#0A0A0A]/40">TRACE PE-0042</div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-sm border border-emerald-600/20 bg-emerald-500/5 px-2 py-1 text-[9px] font-mono font-bold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-sm bg-emerald-500 animate-pulse" />
                  {t.hero.stateStable}
                </span>
              </div>

              <div className="space-y-2.5 pt-3">
                <div className="border border-[#0A0A0A]/10 bg-[#F2EFE9]/70 p-3 rounded-sm">
                  <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#0A0A0A]/40">{t.hero.rawOutputLabel}</div>
                  <div className="mt-1.5 text-xs font-semibold text-[#0A0A0A]/80">{t.hero.rawOutput}</div>
                </div>

                <div className="relative border-l-2 border-[#E4A617] bg-[#E4A617]/[0.06] p-3">
                  <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#9A6C00]">{t.hero.findingLabel}</div>
                  <div className="mt-1.5 text-xs leading-relaxed text-[#0A0A0A]/70">{t.hero.finding}</div>
                </div>

                <div className="border border-[#7C6AF7]/25 bg-[#7C6AF7]/[0.07] p-3 rounded-sm">
                  <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#7C6AF7]">{t.hero.routedDecisionLabel}</div>
                  <div className="mt-1.5 flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-[#0A0A0A]">{t.hero.routedDecision}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 text-[#7C6AF7]" />
                  </div>
                </div>
              </div>

              <div className="mt-3 border-t border-[#0A0A0A]/10 pt-2 font-mono text-[8px] uppercase tracking-wider text-[#0A0A0A]/40">
                {t.hero.traceDisclaimer}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION: RAW AI -> DGWM -> ROUTED OUTCOME */}
      <section id="verification-example" className="py-10 border-b border-[#0A0A0A]/10 bg-[#F2EFE9] scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#7C6AF7] font-bold">{t.computeDensity.eyebrow}</div>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl font-semibold leading-tight tracking-tight">{t.computeDensity.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#0A0A0A]/60">{t.computeDensity.subtitle}</p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 border border-[#0A0A0A]/10 bg-white/45 rounded-sm overflow-hidden">
            {[
              { label: t.computeDensity.rawLabel, title: t.computeDensity.rawTitle, desc: t.computeDensity.rawDesc, accent: false },
              { label: t.computeDensity.verifyLabel, title: t.computeDensity.verifyTitle, desc: t.computeDensity.verifyDesc, accent: true },
              { label: t.computeDensity.routeLabel, title: t.computeDensity.routeTitle, desc: t.computeDensity.routeDesc, accent: false }
            ].map((item, index) => (
              <div key={item.label} className={`relative p-4 md:p-5 ${index > 0 ? "border-t md:border-l md:border-t-0 border-[#0A0A0A]/10" : ""} ${item.accent ? "bg-[#7C6AF7]/[0.055]" : ""}`}>
                <div className={`font-mono text-[8px] font-bold uppercase tracking-widest ${item.accent ? "text-[#7C6AF7]" : "text-[#0A0A0A]/40"}`}>{item.label}</div>
                <div className="mt-2 text-sm font-bold">{item.title}</div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[#0A0A0A]/55">{item.desc}</p>
                {index < 2 && <ArrowRight className="hidden md:block absolute -right-2.5 top-1/2 z-10 w-5 h-5 -translate-y-1/2 rounded-full bg-[#F2EFE9] p-1 text-[#7C6AF7]" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIMARY PROOF: LIVE SAME-PERIOD BENCHMARK */}
      <LiveBenchmarkSection copy={t.liveBenchmark} />

      {/* 3. SCALE METRICS (Horizontal bar comparison) */}
      <section id="scale" className="py-20 border-b border-[#0A0A0A]/10 bg-[#F2EFE9] scroll-mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-8 space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#7C6AF7] font-semibold block">{t.scaleMetrics.sectionNum}</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
              {t.scaleMetrics.title}
            </h2>
            <p className="text-[#0A0A0A]/70 text-sm md:text-base">
              {t.scaleMetrics.subtitle}
            </p>
          </div>

          <div className="mb-8 flex max-w-4xl items-start gap-3 rounded-sm border border-[#7C6AF7]/20 bg-[#7C6AF7]/[0.045] px-4 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#7C6AF7]" />
            <div>
              <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#7C6AF7]">{t.scaleMetrics.methodologyLabel}</div>
              <p className="mt-1 text-[11px] leading-relaxed text-[#0A0A0A]/60">{t.scaleMetrics.methodologyNote}</p>
            </div>
          </div>

          {/* Selector Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
            {(Object.keys(metrics) as MetricCategory[]).map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveMetric(cat)}
                aria-pressed={activeMetric === cat}
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
              <a href="#early-access" onClick={() => chooseRequestIntent("methodology")} className="inline-flex items-center gap-2 text-xs font-semibold text-white border border-white/20 hover:border-white/50 hover:bg-white/5 rounded-sm px-5 py-3 transition-colors">
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
                    <span className="font-bold text-[#0A0A0A]">{lang === "en" ? "LOW BAND" : "低覆盖"}</span>
                  </div>
                  <div className="h-3 bg-[#0A0A0A]/5 rounded-sm overflow-hidden border border-[#0A0A0A]/5">
                    <div className="h-full bg-gray-400/80 w-[34%] rounded-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500 font-medium">{t.comparativeReport.infiniband}</span>
                    <span className="font-bold text-[#0A0A0A]">{lang === "en" ? "MID BAND" : "中覆盖"}</span>
                  </div>
                  <div className="h-3 bg-[#0A0A0A]/5 rounded-sm overflow-hidden border border-[#0A0A0A]/5">
                    <div className="h-full bg-gray-500/80 w-[68%] rounded-sm" />
                  </div>
                </div>

                <div className="p-4 bg-[#7C6AF7]/5 border border-[#7C6AF7]/20 rounded-sm space-y-2">
                  <div className="flex justify-between items-baseline text-xs font-mono">
                    <span className="text-[#0A0A0A] font-bold">{t.comparativeReport.aetheris}</span>
                    <span className="text-[#7C6AF7] font-bold">{lang === "en" ? "TARGET BAND" : "目标覆盖"}</span>
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
              <p className="mt-3 text-[11px] leading-relaxed text-[#0A0A0A]/60">{t.comparativeReport.methodologyNote}</p>
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
                <a href="#early-access" onClick={() => chooseRequestIntent("methodology")} className="font-sans text-xs font-bold text-[#7C6AF7] hover:underline flex items-center gap-1">
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
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
                  {nodeSizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setActiveNodes(size)}
                      aria-pressed={activeNodes === size}
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
                    <span className="text-[#7C6AF7] font-bold">{stabilityBand(chartData[activeNodes].aetheris)} {t.scalingLaws.efficiency}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#0A0A0A]/5 pb-1">
                    <span className="flex items-center gap-1.5 text-gray-500 font-semibold"><span className="w-1.5 h-1.5 rounded-sm bg-gray-500" /> {lang === "en" ? "Rules-only" : "仅规则栈"}</span>
                    <span className="text-[#0A0A0A] font-semibold">{stabilityBand(chartData[activeNodes].infiniband)} {t.scalingLaws.efficiency}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-gray-400"><span className="w-1.5 h-1.5 rounded-sm bg-gray-300" /> {lang === "en" ? "Raw output" : "原始输出"}</span>
                    <span className="text-[#0A0A0A]/60">{stabilityBand(chartData[activeNodes].ethernet)} {t.scalingLaws.efficiency}</span>
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
                  <text x="32" y="24" fontFamily="monospace" fontSize="8" fill="gray" textAnchor="end">{lang === "en" ? "HIGH" : "强"}</text>
                  <text x="32" y="134" fontFamily="monospace" fontSize="8" fill="gray" textAnchor="end">{lang === "en" ? "MID" : "中"}</text>
                  <text x="32" y="218" fontFamily="monospace" fontSize="8" fill="gray" textAnchor="end">{lang === "en" ? "LOW" : "弱"}</text>

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

          <div className="mt-6 flex items-start gap-2 border-t border-[#0A0A0A]/10 pt-4 text-[10px] leading-relaxed text-[#0A0A0A]/45">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7C6AF7]" />
            <span>{t.scalingLaws.methodologyNote}</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                <a href="#early-access" onClick={() => chooseRequestIntent("api")} className="w-full text-center py-2 border border-[#0A0A0A] text-xs font-bold hover:bg-[#0A0A0A] hover:text-[#F2EFE9] rounded-sm transition-all inline-block">{t.products.prod1Btn}</a>
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
                <a href="#early-access" onClick={() => chooseRequestIntent("sdk")} className="w-full text-center py-2 border border-[#0A0A0A] text-xs font-bold hover:bg-[#0A0A0A] hover:text-[#F2EFE9] rounded-sm transition-all inline-block">{t.products.prod3Btn}</a>
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
                role="status"
                aria-live="polite"
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
                <fieldset className="space-y-2">
                  <legend className="font-mono text-[9px] font-bold uppercase tracking-widest text-gray-400">
                    {t.reservation.intentLabel}
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    {requestOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setRequestIntent(option.value)}
                        aria-pressed={requestIntent === option.value}
                        className={`rounded-sm border px-3 py-2 text-center text-[10px] font-semibold transition-colors ${
                          requestIntent === option.value
                            ? "border-[#7C6AF7] bg-[#7C6AF7]/15 text-white"
                            : "border-white/10 bg-[#111111] text-gray-400 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="flex flex-col sm:flex-row gap-2">
                  <label htmlFor="early-access-email" className="sr-only">
                    {t.reservation.placeholder}
                  </label>
                  <input
                    id="early-access-email"
                    type="email"
                    required
                    placeholder={t.reservation.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    aria-describedby={submitError ? "early-access-error early-access-disclaimer" : "early-access-disclaimer"}
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
                  <p id="early-access-error" role="alert" className="text-[10px] text-red-300 text-center font-medium">
                    {submitError}
                  </p>
                )}
                <p id="early-access-disclaimer" className="text-[8px] text-gray-500 font-mono text-center uppercase tracking-widest">
                  {t.reservation.disclaimer}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] text-gray-500 text-xs border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <PrismEdgeLogo variant="dark" compact />
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
