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
    sysState: string;
    stateStable: string;
    bandwidth: string;
    cores: string;
    overclock: string;
  };
  computeDensity: {
    title: string;
    legacy: string;
    nodeV: string;
    capacity: string;
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
      manifesto: "[ MARKET AI VERIFICATION v0.9 ]",
      titlePart1: "A verification layer for ",
      titleAccent: "market AI",
      titlePart2: ", from model output to terminal.",
      description: "Prism-Edge pairs the DGWM diagnostic layer with an Electron desktop terminal and API surface. It verifies, corrects, and routes LLM-assisted market intelligence before it reaches research, risk, or execution workflows.",
      btnRequest: "Join early access",
      btnExplore: "See verification flow",
      telemetry: "LIVE VERIFICATION",
      sysState: "SYSTEM STATE:",
      stateStable: "VERIFIED",
      bandwidth: "VERIFIED SIGNALS",
      cores: "MARKET VENUES",
      overclock: "ROUTING CONFIDENCE"
    },
    computeDensity: {
      title: "Verification Density",
      legacy: "Fragmented market review",
      nodeV: "Prism-Edge DGWM",
      capacity: "+18.4x Review Capacity"
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
      efficiency100: "100% DIAGNOSTIC LIMIT"
    },
    metrics: {
      throughput: {
        title: "Model Output Verification Coverage",
        subtitle: "Share of LLM-assisted market conclusions routed through structural diagnostics before analyst or API exposure.",
        points: [
          { label: "Prism-Edge DGWM", value: "94%", percentage: 94, isHighlight: true, desc: "Spectral and categorical checks run before outputs enter terminal workflows." },
          { label: "Internal rule stack", value: "61%", percentage: 61, desc: "Rules catch obvious violations but miss unstable reasoning structure." },
          { label: "Manual analyst review", value: "28%", percentage: 28, desc: "Human review remains valuable but cannot cover every generated market event." }
        ]
      },
      latency: {
        title: "Decision-to-Diagnostic Latency",
        subtitle: "Time from model output to a structured verification result available inside the terminal or API response.",
        points: [
          { label: "Prism-Edge DGWM", value: "38 ms", percentage: 100, isHighlight: true, desc: "Diagnostics run inline with the market analysis pipeline." },
          { label: "Rules-only middleware", value: "240 ms", percentage: 46, desc: "Sequential rule checks add latency and still require analyst escalation." },
          { label: "Manual desk review", value: "1.8 s", percentage: 18, desc: "Human triage is too slow for high-frequency research surfaces." }
        ]
      },
      cost: {
        title: "Research Desk Review Efficiency",
        subtitle: "Verified market events handled per review cycle across API, terminal, and analyst-facing workflows.",
        points: [
          { label: "Prism-Edge DGWM", value: "1.2M events", percentage: 100, isHighlight: true, desc: "Unified diagnostics reduce repeated review across strategy notebooks and terminals." },
          { label: "Scripted validation stack", value: "420k events", percentage: 35, desc: "Custom scripts work locally but fragment across teams and asset classes." },
          { label: "Spreadsheet reconciliation", value: "180k events", percentage: 15, desc: "Operational review becomes the bottleneck as markets and models multiply." }
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
      title: "Measured correction under live market pressure.",
      subtitle: "Prism-Edge benchmarks verification quality across model outputs, price-feed changes, and analyst terminal workflows.",
      mmluPretraining: "LIVE MARKET EVALUATION",
      clusterSize: "Cross-asset test set",
      efficiencyTitle: "Output Correction Precision (%)",
      efficiencyDesc: "Share of unstable or contradictory model outputs corrected before downstream use.",
      ethernet: "Raw LLM output",
      infiniband: "Rules-only stack",
      aetheris: "Prism-Edge DGWM",
      verificationPassed: "INDEPENDENT EVALUATION PASSED",
      deltaText: "DELTA +26% VS RULES-ONLY",
      benchmarkDraft: "BENCHMARK DRAFT PE-DGWM-01",
      realtimeEval: "REALTIME MARKET EVAL",
      techReasoning: "TECHNICAL REASONING",
      reasoningTitle: "Why raw market intelligence fails at regime boundaries.",
      reasoningP1: "LLM-assisted market research can summarize, compare, and hypothesize at impressive speed, but it often overstates confidence when a regime is changing or when source feeds disagree.",
      reasoningP2: "DGWM verifies the structure of the answer before the answer becomes an analyst action. It tests consistency across transformations, highlights unstable assumptions, and routes correction signals into the terminal layer.",
      infoText: "DGWM verifies the shape of the reasoning, not only the surface confidence score.",
      downloadBlueprint: "Download diagnostic blueprint →"
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
      chartLegendInfiniband: "RULES-ONLY"
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
      prod2Title: "Cross-Platform Market Terminal",
      prod2Desc: "A real-time Electron terminal for research, diagnostics, charts, and model-assisted market analysis across desktop environments.",
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
      title: "Bring mathematical verification into your market workflow.",
      subtitle: "Download the Windows desktop client now, or request API and SDK access for internal research workflows.",
      successTitle: "Access Request Logged",
      successDesc: "Your Prism-Edge request has been registered under ID #PE-REQ-{id}. We will follow up with the right access path for your team.",
      placeholder: "Enter work or research email address",
      btnSubmit: "Join early access →",
      btnQueue: "Queueing...",
      disclaimer: "Applications are reviewed securely. Market and research data stay private."
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
      manifesto: "[ 市场 AI 验证层 v0.9 ]",
      titlePart1: "为 ",
      titleAccent: "市场 AI",
      titlePart2: " 建立从模型输出到终端的验证层。",
      description: "Prism-Edge 将 DGWM 诊断层、Electron 桌面终端与 API 接入面结合起来，在市场智能进入研究、风控或执行流程之前，对 LLM 辅助输出进行验证、校正与路由。",
      btnRequest: "申请早期访问",
      btnExplore: "查看验证流程",
      telemetry: "实时验证",
      sysState: "系统状态:",
      stateStable: "已验证",
      bandwidth: "已验证信号",
      cores: "市场场所",
      overclock: "路由置信度"
    },
    computeDensity: {
      title: "验证密度",
      legacy: "碎片化市场复核",
      nodeV: "Prism-Edge DGWM",
      capacity: "+18.4x 复核容量"
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
      efficiency100: "100% 诊断上限"
    },
    metrics: {
      throughput: {
        title: "模型输出验证覆盖率",
        subtitle: "LLM 辅助市场结论在进入分析师界面或 API 之前，被结构化诊断处理的比例。",
        points: [
          { label: "Prism-Edge DGWM", value: "94%", percentage: 94, isHighlight: true, desc: "光谱与范畴一致性检查会先于终端工作流运行。" },
          { label: "内部规则栈", value: "61%", percentage: 61, desc: "规则可以拦截明显违规，但很难识别推理结构的不稳定。" },
          { label: "人工分析师复核", value: "28%", percentage: 28, desc: "人工复核仍然重要，但无法覆盖每个生成式市场事件。" }
        ]
      },
      latency: {
        title: "决策到诊断延迟",
        subtitle: "从模型输出到终端或 API 中可用的结构化验证结果所需时间。",
        points: [
          { label: "Prism-Edge DGWM", value: "38 ms", percentage: 100, isHighlight: true, desc: "诊断与市场分析管线同步内联运行。" },
          { label: "仅规则中间层", value: "240 ms", percentage: 46, desc: "顺序规则检查增加延迟，同时仍然需要分析师升级处理。" },
          { label: "人工台面复核", value: "1.8 s", percentage: 18, desc: "人工分拣对于高频研究曲面来说过慢。" }
        ]
      },
      cost: {
        title: "研究台复核效率",
        subtitle: "在 API、终端与分析师工作流中，每个复核周期可处理的已验证市场事件。",
        points: [
          { label: "Prism-Edge DGWM", value: "1.2M events", percentage: 100, isHighlight: true, desc: "统一诊断减少策略笔记本与终端之间的重复复核。" },
          { label: "脚本化验证栈", value: "420k events", percentage: 35, desc: "本地脚本有效，但会在团队与资产类别之间碎片化。" },
          { label: "表格对账复核", value: "180k events", percentage: 15, desc: "当市场与模型倍增时，运营复核会成为瓶颈。" }
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
      title: "在实时市场压力下测量校正能力。",
      subtitle: "Prism-Edge 对模型输出、价格源变化与分析终端工作流中的验证质量进行基准测试。",
      mmluPretraining: "实时市场评估",
      clusterSize: "跨资产测试集",
      efficiencyTitle: "输出校正精度 (%)",
      efficiencyDesc: "不稳定或互相矛盾的模型输出，在进入下游使用前被校正的比例。",
      ethernet: "原始 LLM 输出",
      infiniband: "仅规则栈",
      aetheris: "Prism-Edge DGWM",
      verificationPassed: "独立评估已通过",
      deltaText: "较仅规则栈提升 +26%",
      benchmarkDraft: "基准草案 PE-DGWM-01",
      realtimeEval: "实时市场评估",
      techReasoning: "技术推理说明",
      reasoningTitle: "为什么原始市场智能会在 regime 边界失效。",
      reasoningP1: "LLM 辅助市场研究能够快速总结、比较和提出假设，但当 regime 正在变化或数据源互相冲突时，它往往会高估自己的置信度。",
      reasoningP2: "DGWM 在答案变成分析动作之前，先验证答案的结构。它检查转换间的一致性，突出不稳定假设，并将校正信号路由到终端层。",
      infoText: "DGWM 验证的是推理形状，而不只是表层置信分数。",
      downloadBlueprint: "下载诊断蓝图 →"
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
      chartLegendInfiniband: "仅规则栈"
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
      prod2Title: "跨平台市场终端",
      prod2Desc: "一个基于 Electron 的实时终端，用于研究、诊断、图表与模型辅助市场分析，覆盖主流桌面环境。",
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
      title: "把数学验证引入你的市场工作流。",
      subtitle: "现在可以下载 Windows 桌面客户端，也可以申请 API 或 SDK 接入内部研究工作流。",
      successTitle: "访问申请已记录",
      successDesc: "你的 Prism-Edge 申请已登记，请求 ID 为 #PE-REQ-{id}。我们会根据你的团队情况匹配合适的接入路径。",
      placeholder: "输入工作或研究邮箱",
      btnSubmit: "申请早期访问 →",
      btnQueue: "排队中...",
      disclaimer: "申请会经过安全审核。市场与研究数据保持私密。"
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


