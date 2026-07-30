/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MetricPoint {
  label: string;
  value: string;
  percentage: number;
  isHighlight?: boolean;
  desc: string;
}

export type MetricCategory = "throughput" | "latency" | "cost";

export interface TranslationModel {
  nav: {
    scale: string;
    architecture: string;
    benchmarks: string;
    scalingLaws: string;
    products: string;
    consoleApi: string;
    requestAccess: string;
    version: string;
  };
  hero: {
    manifesto: string;
    titlePart1: string;
    titleAccent: string;
    titlePart2: string;
    description: string;
    btnRequest: string;
    btnExplore: string;
    telemetry: string;
    traceTitle: string;
    sysState: string;
    stateStable: string;
    bandwidth: string;
    cores: string;
    overclock: string;
    rawOutputLabel: string;
    rawOutput: string;
    findingLabel: string;
    finding: string;
    routedDecisionLabel: string;
    routedDecision: string;
    traceDisclaimer: string;
    proofDesktop: string;
    proofApi: string;
    proofBenchmark: string;
  };
  computeDensity: {
    eyebrow: string;
    title: string;
    subtitle: string;
    rawLabel: string;
    rawTitle: string;
    rawDesc: string;
    verifyLabel: string;
    verifyTitle: string;
    verifyDesc: string;
    routeLabel: string;
    routeTitle: string;
    routeDesc: string;
  };
  scaleMetrics: {
    sectionNum: string;
    title: string;
    subtitle: string;
    training: string;
    interconnect: string;
    operating: string;
    efficiency0: string;
    efficiency50: string;
    efficiency100: string;
    methodologyLabel: string;
    methodologyNote: string;
  };
  metrics: Record<MetricCategory, { title: string; subtitle: string; points: MetricPoint[] }>;
  opticalBackplane: {
    sectionNum: string;
    title: string;
    description: string;
    innov1Title: string;
    innov1Desc: string;
    innov2Title: string;
    innov2Desc: string;
    specDraftBtn: string;
    latticeBus: string;
    sysSyncOnline: string;
  };
  comparativeReport: {
    sectionNum: string;
    title: string;
    subtitle: string;
    mmluPretraining: string;
    clusterSize: string;
    efficiencyTitle: string;
    efficiencyDesc: string;
    ethernet: string;
    infiniband: string;
    aetheris: string;
    verificationPassed: string;
    deltaText: string;
    benchmarkDraft: string;
    realtimeEval: string;
    techReasoning: string;
    reasoningTitle: string;
    reasoningP1: string;
    reasoningP2: string;
    infoText: string;
    downloadBlueprint: string;
    methodologyNote: string;
  };
  liveBenchmark: {
    eyebrow: string;
    titleLead: string;
    titleTail: string;
    subtitle: string;
    scopeLabel: string;
    scopeValue: string;
    chartTitle: string;
    modelLabel: string;
    highFlyerLabel: string;
    aqrLabel: string;
    maxDrawdownLabel: string;
    modelHint: string;
    highFlyerHint: string;
    aqrHint: string;
    maxDrawdownHint: string;
    conclusionLabel: string;
    conclusion: string;
    heroEntry: string;
    leadPrefix: string;
    leadValue: string;
    interactionHint: string;
    keyboardHint: string;
    dailyLeadLabel: string;
    dateLabel: string;
    showAllLabel: string;
    methodLabel: string;
    evidenceLine: string;
    sourceLink: string;
    disclosure: string;
  };
  scalingLaws: {
    sectionNum: string;
    title: string;
    subtitle: string;
    sizeSelection: string;
    nodes: string;
    scalingComparison: string;
    parallelNodes: string;
    efficiency: string;
    chartLabel: string;
    chartLegendAetheris: string;
    chartLegendInfiniband: string;
    methodologyNote: string;
  };
  chartData: Record<number, { ethernet: number; infiniband: number; aetheris: number; desc: string }>;
  products: {
    sectionNum: string;
    title: string;
    subtitle: string;
    prod1Tag: string;
    prod1Title: string;
    prod1Desc: string;
    prod1Bullet1: string;
    prod1Bullet2: string;
    prod1Btn: string;
    prod2Tag: string;
    prod2Title: string;
    prod2Desc: string;
    prod2Bullet1: string;
    prod2Bullet2: string;
    prod2Btn: string;
    prod3Tag: string;
    prod3Title: string;
    prod3Desc: string;
    prod3Bullet1: string;
    prod3Bullet2: string;
    prod3Btn: string;
  };
  reservation: {
    sectionNum: string;
    title: string;
    subtitle: string;
    intentLabel: string;
    intentApi: string;
    intentSdk: string;
    intentTeam: string;
    intentMethodology: string;
    successTitle: string;
    successDesc: string;
    placeholder: string;
    btnSubmit: string;
    btnQueue: string;
    disclaimer: string;
  };
  footer: {
    physLayerConnected: string;
    metrics: string;
    architect: string;
    benchmarks: string;
    alloc: string;
    copyright: string;
  };
}

export const translations: Record<"en" | "zh", TranslationModel> = {
  en: {
    nav: {
      scale: "Verification scale",
      architecture: "Architecture",
      benchmarks: "Benchmarks",
      scalingLaws: "Market surface",
      products: "Products",
      consoleApi: "API console",
      requestAccess: "Join early access →",
      version: "DGWM v0.9"
    },
    hero: {
      manifesto: "[ DGWM v0.9 · WINDOWS CLIENT AVAILABLE ]",
      titlePart1: "A verification layer for ",
      titleAccent: "market AI",
      titlePart2: ", from model output to terminal.",
      description: "Prism-Edge pairs the DGWM diagnostic layer with an Electron desktop terminal and API surface. It checks LLM-assisted market outputs for source conflict, unstable assumptions, and structural inconsistency before they enter research, risk, or execution workflows.",
      btnRequest: "Download Windows client",
      btnExplore: "See a verified example",
      telemetry: "PRODUCT TRACE / ILLUSTRATIVE",
      traceTitle: "One output, checked before action.",
      sysState: "SYSTEM STATE:",
      stateStable: "VERIFIED",
      bandwidth: "VERIFIED SIGNALS",
      cores: "MARKET VENUES",
      overclock: "ROUTING CONFIDENCE",
      rawOutputLabel: "RAW MODEL OUTPUT",
      rawOutput: "Breakout confirmed · confidence 91%",
      findingLabel: "DGWM FINDING",
      finding: "Volume confirmation missing · feed regime mismatch",
      routedDecisionLabel: "ROUTED DECISION",
      routedDecision: "HOLD · analyst review",
      traceDisclaimer: "Illustrative workflow · not a live trading signal",
      proofDesktop: "Windows x64 client · v0.1.2",
      proofApi: "API / SDK early access",
      proofBenchmark: "Benchmark draft · PE-DGWM-01"
    },
    computeDensity: {
      eyebrow: "[ HOW PRISM-EDGE DIFFERS ]",
      title: "Prism-Edge does not add another prediction. It verifies whether the prediction survives contact with the market.",
      subtitle: "The output remains useful only when its assumptions, data regime, and transformation path remain consistent.",
      rawLabel: "01 / RAW AI",
      rawTitle: "Confident answer",
      rawDesc: "Summarizes signals quickly, but cannot prove its own reasoning remains stable.",
      verifyLabel: "02 / DGWM",
      verifyTitle: "Structural checks",
      verifyDesc: "Tests drift, contradiction, feed mismatch, and transformation consistency.",
      routeLabel: "03 / ROUTE",
      routeTitle: "Auditable outcome",
      routeDesc: "Pass, correct, hold, or escalate—with the diagnostic evidence attached."
    },
    scaleMetrics: {
      sectionNum: "[ 01 / VERIFICATION SCALE ]",
      title: "Verify the reasoning before market AI reaches action.",
      subtitle: "Quant teams already have models, feeds, and dashboards. Prism-Edge adds a diagnostic layer above those outputs, catching drift and contradiction before they become research or execution decisions.",
      training: "MODEL OUTPUTS",
      interconnect: "FEED LATENCY",
      operating: "REVIEW LOAD",
      efficiency0: "0% COVERAGE",
      efficiency50: "50%",
      efficiency100: "100% DIAGNOSTIC LIMIT",
      methodologyLabel: "ENGINEERING MODEL · PE-DGWM-01",
      methodologyNote: "Relative bar widths show the intended workflow hierarchy. Measured results and a reproduction harness are being prepared for external review."
    },
    metrics: {
      throughput: {
        title: "Model Output Verification Coverage",
        subtitle: "Share of LLM-assisted market conclusions routed through structural diagnostics before analyst or API exposure.",
        points: [
          { label: "Prism-Edge DGWM", value: "FULL PATH", percentage: 94, isHighlight: true, desc: "Spectral and categorical checks run before outputs enter terminal workflows." },
          { label: "Internal rule stack", value: "PARTIAL", percentage: 61, desc: "Rules catch obvious violations but miss unstable reasoning structure." },
          { label: "Manual analyst review", value: "SAMPLED", percentage: 28, desc: "Human review remains valuable but cannot cover every generated market event." }
        ]
      },
      latency: {
        title: "Decision-to-Diagnostic Latency",
        subtitle: "Time from model output to a structured verification result available inside the terminal or API response.",
        points: [
          { label: "Prism-Edge DGWM", value: "INLINE", percentage: 100, isHighlight: true, desc: "Diagnostics run inside the market analysis pipeline." },
          { label: "Rules-only middleware", value: "SEQUENTIAL", percentage: 46, desc: "Sequential rule checks add latency and still require analyst escalation." },
          { label: "Manual desk review", value: "MANUAL", percentage: 18, desc: "Human triage is reserved for the outputs that require judgment." }
        ]
      },
      cost: {
        title: "Research Desk Review Efficiency",
        subtitle: "Verified market events handled per review cycle across API, terminal, and analyst-facing workflows.",
        points: [
          { label: "Prism-Edge DGWM", value: "UNIFIED", percentage: 100, isHighlight: true, desc: "Unified diagnostics reduce repeated review across strategy notebooks and terminals." },
          { label: "Scripted validation stack", value: "FRAGMENTED", percentage: 35, desc: "Custom scripts work locally but fragment across teams and asset classes." },
          { label: "Spreadsheet reconciliation", value: "MANUAL", percentage: 15, desc: "Operational review becomes the bottleneck as markets and models multiply." }
        ]
      }
    },
    opticalBackplane: {
      sectionNum: "[ 02 / DGWM ARCHITECTURE ]",
      title: "A diagnostic layer between models, feeds, and market action.",
      description: "DGWM sits above existing LLMs, market feeds, and strategy notebooks. It applies spectral diagnostics and category-level consistency checks so unstable reasoning can be corrected before it reaches the desk.",
      innov1Title: "Spectral Consistency Mapping",
      innov1Desc: "Signals are projected into diagnostic coordinates where drift, regime mismatch, and unstable confidence become measurable.",
      innov2Title: "Category-Level Correction Layer",
      innov2Desc: "Model outputs are validated against transformation rules before they are exposed to analysts, APIs, or terminal workflows.",
      specDraftBtn: "Review technical report",
      latticeBus: "DGWM DIAGNOSTIC BUS",
      sysSyncOnline: "● VERIFICATION_ONLINE"
    },
    comparativeReport: {
      sectionNum: "[ 03 / BENCHMARK REPORT ]",
      title: "A transparent model of diagnostic behavior.",
      subtitle: "A conceptual comparison of raw model outputs, a rules-only stack, and the DGWM diagnostic layer while PE-DGWM-01 remains under review.",
      mmluPretraining: "CONCEPTUAL COMPARISON",
      clusterSize: "Method draft",
      efficiencyTitle: "Relative diagnostic coverage",
      efficiencyDesc: "Illustrative coverage bands—not measured production performance.",
      ethernet: "Raw LLM output",
      infiniband: "Rules-only stack",
      aetheris: "Prism-Edge DGWM",
      verificationPassed: "INTERNAL EVALUATION · DRAFT",
      deltaText: "TARGET: MORE COVERAGE THAN RULES-ONLY",
      benchmarkDraft: "PE-DGWM-01 · METHODOLOGY IN REVIEW",
      realtimeEval: "CONCEPT MODEL",
      techReasoning: "TECHNICAL REASONING",
      reasoningTitle: "Why raw market intelligence fails at regime boundaries.",
      reasoningP1: "LLM-assisted market research can summarize, compare, and hypothesize at impressive speed, but it often overstates confidence when a regime is changing or when source feeds disagree.",
      reasoningP2: "DGWM verifies the structure of the answer before the answer becomes an analyst action. It tests consistency across transformations, highlights unstable assumptions, and routes correction signals into the terminal layer.",
      infoText: "DGWM verifies the shape of the reasoning, not only the surface confidence score.",
      downloadBlueprint: "Request methodology package →",
      methodologyNote: "The bars communicate the intended diagnostic hierarchy. Measured results, dataset scope, baselines, and reproduction details will be published with PE-DGWM-01."
    },
    liveBenchmark: {
      eyebrow: "[ LIVE / MARKET VALIDATION ]",
      titleLead: "One market window.",
      titleTail: "Three return paths.",
      subtitle: "The current model, a public High-Flyer NAV proxy, and the AQR QMNIX public-fund proxy are aligned on the same timeline so return can be read together with the path that produced it.",
      scopeLabel: "COMMON WINDOW",
      scopeValue: "CSI 300 · 2026-01-09 → 2026-07-14",
      chartTitle: "Cumulative return path",
      modelLabel: "Current model",
      highFlyerLabel: "High-Flyer proxy",
      aqrLabel: "AQR QMNIX",
      maxDrawdownLabel: "Model max drawdown",
      modelHint: "Internal same-period validation output",
      highFlyerHint: "Public NAV proxy · P089354",
      aqrHint: "Public adjusted-NAV proxy",
      maxDrawdownHint: "Reported risk metric · not inferred from chart samples",
      conclusionLabel: "VALIDATION READ",
      conclusion: "At the common endpoint, the current model records {model}% cumulative return—{lead} points above the public High-Flyer NAV proxy—with a −{drawdown}% maximum drawdown.",
      heroEntry: "LIVE benchmark · {model}% · +{lead} pts vs High-Flyer",
      leadPrefix: "LEAD",
      leadValue: "+{lead} PTS",
      interactionHint: "Select a metric or endpoint to focus a path. Hover for same-date values; on touch, tap to pin and tap again to clear.",
      keyboardHint: "Use the Left and Right Arrow keys to inspect dates. Press Escape to clear the selected date.",
      dailyLeadLabel: "vs High-Flyer",
      dateLabel: "Date",
      showAllLabel: "Show all paths",
      methodLabel: "Method & data",
      evidenceLine: "Evidence level · current model is an internal validation output, not independently audited · High-Flyer public product P089354 · AQR QMNIX adjusted NAV · maximum drawdown reported separately",
      sourceLink: "Open the complete GSYEN benchmark →",
      disclosure: "Snapshot generated 2026-07-19. The chart shows sampled observation dates; the maximum-drawdown figure is a separately reported internal risk metric and is not reconstructed from those samples. Current-model figures are internal validation outputs. High-Flyer uses the public NAV path of product P089354; its latest 2026-07-10 disclosure is carried forward to the common endpoint. AQR uses QMNIX adjusted NAV. These proxies are not disclosed private-strategy books, are not independently audited by Prism-Edge, and are shown for research comparison only. Not investment advice; past performance does not guarantee future results."
    },
    scalingLaws: {
      sectionNum: "[ 04 / MARKET SURFACE ]",
      title: "Verification complexity grows with every market surface.",
      subtitle: "As assets, venues, factors, and time horizons multiply, ad hoc review breaks down. DGWM keeps verification coverage stable across expanding market surfaces.",
      sizeSelection: "Market surface size",
      nodes: "Signals",
      scalingComparison: "VERIFICATION STABILITY AT",
      parallelNodes: "Parallel signals",
      efficiency: "stability",
      chartLabel: "VERIFICATION STABILITY CURVE",
      chartLegendAetheris: "PRISM-EDGE",
      chartLegendInfiniband: "RULES-ONLY",
      methodologyNote: "Conceptual engineering model for PE-DGWM-01. Curves illustrate the design target—not measured accuracy, returns, or live production performance."
    },
    chartData: {
      1024: { ethernet: 81, infiniband: 94, aetheris: 99, desc: "At low signal counts, rule filters can remain acceptable, though DGWM already reduces confidence jitter." },
      4096: { ethernet: 64, infiniband: 87, aetheris: 98, desc: "As sources multiply, rules-only workflows begin missing contradiction across market context." },
      16384: { ethernet: 42, infiniband: 71, aetheris: 95, desc: "Cross-asset reasoning exposes the cost of fragmented review. DGWM maintains stable verification coverage." },
      32768: { ethernet: 18, infiniband: 48, aetheris: 91, desc: "At broad market surface, raw outputs degrade sharply while DGWM keeps correction structure intact." }
    },
    products: {
      sectionNum: "[ 05 / PRODUCT ACCESS ]",
      title: "Choose the access path that matches your workflow.",
      subtitle: "Use the same verification layer through an API, an Electron desktop terminal, or SDK hooks inside internal workflows.",
      prod1Tag: "DGWM API",
      prod1Title: "Diagnostic Verification API",
      prod1Desc: "Send market summaries, factor commentary, and model outputs through DGWM before they reach production workflows.",
      prod1Bullet1: "Structured correction responses",
      prod1Bullet2: "Feed-aware verification hooks",
      prod1Btn: "Request API access →",
      prod2Tag: "DESKTOP TERMINAL",
      prod2Title: "Windows Market Terminal",
      prod2Desc: "An Electron desktop terminal for research, diagnostics, charts, and model-assisted market analysis. Windows x64 is available now.",
      prod2Bullet1: "Windows x64 installer available now",
      prod2Bullet2: "Live panels for signals, risk, and diagnostics",
      prod2Btn: "Download Windows client →",
      prod3Tag: "SDK / INTEGRATION",
      prod3Title: "Research Workflow SDK",
      prod3Desc: "Embed Prism-Edge verification into notebooks, internal dashboards, and proprietary strategy research systems.",
      prod3Bullet1: "Typed client libraries and audit trails",
      prod3Bullet2: "Deployable inside existing desk workflows",
      prod3Btn: "Request SDK package →"
    },
    reservation: {
      sectionNum: "[ EARLY ACCESS ]",
      title: "Request API or SDK access.",
      subtitle: "The Windows client is available now. Use this form for API, SDK, methodology, or team deployment access.",
      intentLabel: "What do you need?",
      intentApi: "API",
      intentSdk: "SDK",
      intentTeam: "Team deployment",
      intentMethodology: "Methodology",
      successTitle: "Access Request Logged",
      successDesc: "The intake endpoint accepted your request under ID #PE-REQ-{id}. Keep this reference for follow-up.",
      placeholder: "Enter work or research email address",
      btnSubmit: "Join early access →",
      btnQueue: "Queueing...",
      disclaimer: "Work or research email only. No market data is submitted through this form."
    },
    footer: {
      physLayerConnected: "DIAGNOSTIC LAYER ONLINE",
      metrics: "METRICS",
      architect: "ARCHITECTURE",
      benchmarks: "BENCHMARKS",
      alloc: "ACCESS",
      copyright: "© 2026 Prism-Edge. All rights reserved."
    }
  },
  zh: {
    nav: {
      scale: "验证规模",
      architecture: "系统架构",
      benchmarks: "基准对比",
      scalingLaws: "市场曲面",
      products: "产品接入",
      consoleApi: "API 控制台",
      requestAccess: "申请早期访问 →",
      version: "DGWM v0.9"
    },
    hero: {
      manifesto: "[ DGWM v0.9 · WINDOWS 客户端已开放 ]",
      titlePart1: "为 ",
      titleAccent: "市场 AI",
      titlePart2: " 建立从模型输出到终端的验证层。",
      description: "Prism-Edge 将 DGWM 诊断层与 Electron 桌面终端和 API 接入面连接起来，在 LLM 辅助市场输出进入研究、风控或执行流程之前，检查来源冲突、不稳定假设与结构性不一致。",
      btnRequest: "下载 Windows 客户端",
      btnExplore: "查看一次完整验证",
      telemetry: "产品验证轨迹 / 示例",
      traceTitle: "一条输出，先验证再行动。",
      sysState: "系统状态:",
      stateStable: "已验证",
      bandwidth: "已验证信号",
      cores: "市场场所",
      overclock: "路由置信度",
      rawOutputLabel: "原始模型输出",
      rawOutput: "突破已确认 · 置信度 91%",
      findingLabel: "DGWM 诊断",
      finding: "缺少成交量确认 · 数据状态不匹配",
      routedDecisionLabel: "路由后的决策",
      routedDecision: "保持观察 · 转分析师复核",
      traceDisclaimer: "示例工作流 · 非实时交易信号",
      proofDesktop: "Windows x64 客户端 · v0.1.2",
      proofApi: "API / SDK 早期接入",
      proofBenchmark: "基准草案 · PE-DGWM-01"
    },
    computeDensity: {
      eyebrow: "[ PRISM-EDGE 有何不同 ]",
      title: "Prism-Edge 不再叠加一个预测，而是验证这个预测能否经得住市场变化。",
      subtitle: "只有当假设、数据状态与转换路径仍然一致，模型输出才有资格进入研究或执行流程。",
      rawLabel: "01 / 原始 AI",
      rawTitle: "给出自信答案",
      rawDesc: "可以快速总结信号，但无法证明自己的推理在变化中仍然稳定。",
      verifyLabel: "02 / DGWM",
      verifyTitle: "检查推理结构",
      verifyDesc: "检测漂移、矛盾、数据源错配与转换一致性。",
      routeLabel: "03 / 路由",
      routeTitle: "留下可审计结果",
      routeDesc: "通过、校正、保持或升级复核，并附带诊断证据。"
    },
    scaleMetrics: {
      sectionNum: "[ 01 / 验证规模 ]",
      title: "在市场 AI 变成行动之前，先验证推理结构。",
      subtitle: "量化团队已经拥有模型、数据源与看板。Prism-Edge 在这些输出之上加入诊断层，在漂移和矛盾变成研究或执行决策之前先把它们识别出来。",
      training: "模型输出",
      interconnect: "数据延迟",
      operating: "复核负载",
      efficiency0: "0% 覆盖",
      efficiency50: "50%",
      efficiency100: "100% 诊断上限",
      methodologyLabel: "工程模型 · PE-DGWM-01",
      methodologyNote: "相对柱形宽度用于表达工作流层级；实测结果与复现实验工具正在准备外部审阅。"
    },
    metrics: {
      throughput: {
        title: "模型输出验证覆盖率",
        subtitle: "LLM 辅助市场结论在进入分析师界面或 API 之前，被结构化诊断处理的比例。",
        points: [
          { label: "Prism-Edge DGWM", value: "全路径", percentage: 94, isHighlight: true, desc: "光谱与范畴一致性检查会先于终端工作流运行。" },
          { label: "内部规则栈", value: "局部覆盖", percentage: 61, desc: "规则可以拦截明显违规，但很难识别推理结构的不稳定。" },
          { label: "人工分析师复核", value: "抽样复核", percentage: 28, desc: "人工复核仍然重要，但无法覆盖每个生成式市场事件。" }
        ]
      },
      latency: {
        title: "决策到诊断延迟",
        subtitle: "从模型输出到终端或 API 中可用的结构化验证结果所需时间。",
        points: [
          { label: "Prism-Edge DGWM", value: "内联", percentage: 100, isHighlight: true, desc: "诊断在市场分析管线内部运行。" },
          { label: "仅规则中间层", value: "顺序执行", percentage: 46, desc: "顺序规则检查增加延迟，同时仍然需要分析师升级处理。" },
          { label: "人工台面复核", value: "人工", percentage: 18, desc: "人的判断被保留给真正需要决策的输出。" }
        ]
      },
      cost: {
        title: "研究台复核效率",
        subtitle: "在 API、终端与分析师工作流中，每个复核周期可处理的已验证市场事件。",
        points: [
          { label: "Prism-Edge DGWM", value: "统一", percentage: 100, isHighlight: true, desc: "统一诊断减少策略笔记本与终端之间的重复复核。" },
          { label: "脚本化验证栈", value: "碎片化", percentage: 35, desc: "本地脚本有效，但会在团队与资产类别之间碎片化。" },
          { label: "表格对账复核", value: "人工", percentage: 15, desc: "当市场与模型倍增时，运营复核会成为瓶颈。" }
        ]
      }
    },
    opticalBackplane: {
      sectionNum: "[ 02 / DGWM 架构 ]",
      title: "位于模型、数据源与市场动作之间的诊断层。",
      description: "DGWM 位于现有 LLM、市场数据源与策略笔记本之上。它通过光谱诊断与范畴级一致性检查，在不稳定推理进入研究台之前完成校正。",
      innov1Title: "光谱一致性映射",
      innov1Desc: "信号被投射到诊断坐标中，使漂移、 regime 错配与不稳定置信度变得可度量。",
      innov2Title: "范畴级校正层",
      innov2Desc: "模型输出会在暴露给分析师、API 或终端工作流之前，先按照转换规则进行验证。",
      specDraftBtn: "查看技术报告",
      latticeBus: "DGWM 诊断总线",
      sysSyncOnline: "● 验证层在线"
    },
    comparativeReport: {
      sectionNum: "[ 03 / 基准报告 ]",
      title: "一套透明的诊断行为模型。",
      subtitle: "在 PE-DGWM-01 仍处于审阅阶段时，用概念模型对比原始输出、仅规则栈与 DGWM 诊断层。",
      mmluPretraining: "概念对比",
      clusterSize: "方法草案",
      efficiencyTitle: "相对诊断覆盖",
      efficiencyDesc: "用于说明覆盖层级，不代表生产环境实测表现。",
      ethernet: "原始 LLM 输出",
      infiniband: "仅规则栈",
      aetheris: "Prism-Edge DGWM",
      verificationPassed: "内部评估 · 草案",
      deltaText: "设计目标：覆盖高于仅规则栈",
      benchmarkDraft: "PE-DGWM-01 · 方法审阅中",
      realtimeEval: "概念模型",
      techReasoning: "技术推理说明",
      reasoningTitle: "为什么原始市场智能会在 regime 边界失效。",
      reasoningP1: "LLM 辅助市场研究能够快速总结、比较和提出假设，但当 regime 正在变化或数据源互相冲突时，它往往会高估自己的置信度。",
      reasoningP2: "DGWM 在答案变成分析动作之前，先验证答案的结构。它检查转换间的一致性，突出不稳定假设，并将校正信号路由到终端层。",
      infoText: "DGWM 验证的是推理形状，而不只是表层置信分数。",
      downloadBlueprint: "申请方法说明包 →",
      methodologyNote: "柱形仅表达预期的诊断层级。实测结果、数据集范围、基线与复现细节将在 PE-DGWM-01 中公开。"
    },
    liveBenchmark: {
      eyebrow: "[ LIVE / 实盘验证 ]",
      titleLead: "同一段市场，",
      titleTail: "三条收益路径。",
      subtitle: "把当前模型、幻方公开净值代理与 AQR QMNIX 公开基金代理放在同一时间轴上，让收益数字与产生它的路径一起接受检验。",
      scopeLabel: "同周期窗口",
      scopeValue: "沪深300 · 2026-01-09 → 2026-07-14",
      chartTitle: "累计收益路径",
      modelLabel: "当前模型",
      highFlyerLabel: "幻方净值代理",
      aqrLabel: "AQR QMNIX",
      maxDrawdownLabel: "模型最大回撤",
      modelHint: "内部同周期验证输出",
      highFlyerHint: "公开产品 P089354 净值代理",
      aqrHint: "公开基金复权净值代理",
      maxDrawdownHint: "独立风险指标 · 不由图中采样点反推",
      conclusionLabel: "验证结论",
      conclusion: "在共同截止日，当前模型累计收益 {model}%，较幻方公开净值代理高 {lead} 个百分点；模型最大回撤为 −{drawdown}%。",
      heroEntry: "LIVE 实盘验证 · {model}% · 领先幻方 +{lead}pp",
      leadPrefix: "领先",
      leadValue: "+{lead}pp",
      interactionHint: "点击指标或曲线末端可聚焦路径；悬停读取同日数据，触屏轻触锁定、再次轻触清除。",
      keyboardHint: "使用左右方向键切换日期，按 Escape 清除已选择的日期。",
      dailyLeadLabel: "较幻方",
      dateLabel: "日期",
      showAllLabel: "显示全部路径",
      methodLabel: "方法与数据",
      evidenceLine: "证据口径 · 当前模型为内部验证输出、未经独立审计 · 幻方公开产品 P089354 · AQR QMNIX 复权净值 · 最大回撤为独立报告指标",
      sourceLink: "查看 GSYEN 完整基准 →",
      disclosure: "数据快照生成于 2026-07-19。图表展示抽样观察节点；最大回撤为单独报告的内部风险指标，不由图中采样点反推。当前模型数据为内部验证输出；幻方采用公开产品 P089354 的净值路径，其最新披露日为 2026-07-10，并向后持有至共同截止日；AQR 采用 QMNIX 复权净值。代理路径不等同于相关机构私募策略真实账本，亦未经 Prism-Edge 独立审计，仅用于研究比较。非投资建议；历史表现不代表未来结果。"
    },
    scalingLaws: {
      sectionNum: "[ 04 / 市场曲面 ]",
      title: "每扩展一层市场曲面，验证复杂度都会上升。",
      subtitle: "当资产、交易场所、因子与时间尺度同时增长，临时复核会迅速失效。DGWM 让验证覆盖在扩张的市场曲面上保持稳定。",
      sizeSelection: "选择市场曲面规模",
      nodes: "信号",
      scalingComparison: "验证稳定性对比",
      parallelNodes: "并行信号",
      efficiency: "稳定性",
      chartLabel: "验证稳定性曲线",
      chartLegendAetheris: "PRISM-EDGE",
      chartLegendInfiniband: "仅规则栈",
      methodologyNote: "PE-DGWM-01 概念工程模型。曲线表示设计目标，不代表实测准确率、收益或实时生产表现。"
    },
    chartData: {
      1024: { ethernet: 81, infiniband: 94, aetheris: 99, desc: "在较低信号数量下，规则过滤仍能保持可接受表现，但 DGWM 已经减少了置信度抖动。" },
      4096: { ethernet: 64, infiniband: 87, aetheris: 98, desc: "当来源增多时，仅规则工作流开始漏掉跨市场语境中的矛盾。" },
      16384: { ethernet: 42, infiniband: 71, aetheris: 95, desc: "跨资产推理暴露了碎片化复核的成本。DGWM 保持稳定的验证覆盖。" },
      32768: { ethernet: 18, infiniband: 48, aetheris: 91, desc: "在更广的市场曲面上，原始输出迅速退化，而 DGWM 仍能保持校正结构。" }
    },
    products: {
      sectionNum: "[ 05 / 产品接入 ]",
      title: "选择适合你工作流的接入路径。",
      subtitle: "同一套验证层可以通过 API、Electron 桌面终端，或嵌入内部工作流的 SDK 使用。",
      prod1Tag: "DGWM API",
      prod1Title: "诊断验证 API",
      prod1Desc: "在市场摘要、因子评论与模型输出进入生产工作流之前，将它们路由进 DGWM。",
      prod1Bullet1: "结构化校正响应",
      prod1Bullet2: "感知数据源的验证钩子",
      prod1Btn: "申请 API 接入 →",
      prod2Tag: "桌面终端",
      prod2Title: "Windows 市场终端",
      prod2Desc: "一个基于 Electron 的桌面终端，用于研究、诊断、图表与模型辅助市场分析；Windows x64 现已开放。",
      prod2Bullet1: "Windows x64 安装包已开放下载",
      prod2Bullet2: "信号、风险与诊断的实时面板",
      prod2Btn: "下载 Windows 客户端 →",
      prod3Tag: "SDK / 集成",
      prod3Title: "研究工作流 SDK",
      prod3Desc: "将 Prism-Edge 验证能力嵌入笔记本、内部看板与自有策略研究系统。",
      prod3Bullet1: "类型化客户端与审计轨迹",
      prod3Bullet2: "可部署进现有研究台工作流",
      prod3Btn: "申请 SDK 包 →"
    },
    reservation: {
      sectionNum: "[ 早期访问 ]",
      title: "申请 API 或 SDK 接入。",
      subtitle: "Windows 客户端现已开放下载；此表单用于申请 API、SDK、方法说明或团队部署接入。",
      intentLabel: "你需要哪一种接入？",
      intentApi: "API",
      intentSdk: "SDK",
      intentTeam: "团队部署",
      intentMethodology: "方法说明",
      successTitle: "访问申请已记录",
      successDesc: "接入端点已接收你的申请，请求 ID 为 #PE-REQ-{id}。请保留此编号用于后续跟进。",
      placeholder: "输入工作或研究邮箱",
      btnSubmit: "申请早期访问 →",
      btnQueue: "排队中...",
      disclaimer: "仅需工作或研究邮箱；此表单不会提交市场数据。"
    },
    footer: {
      physLayerConnected: "诊断层在线",
      metrics: "指标",
      architect: "架构",
      benchmarks: "基准",
      alloc: "接入",
      copyright: "© 2026 Prism-Edge. 保留所有权利。"
    }
  }
};


