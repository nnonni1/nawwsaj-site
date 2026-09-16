export const homeContent = {
  nav: [
    { label: "الخدمات", href: "#services" },
    { label: "طريقة العمل", href: "#process" },
    { label: "داخل المعمل", href: "#lab" },
    { label: "المشاريع", href: "#projects" },
  ],
  services: [
    {
      number: "01",
      eyebrow: "MVP & PROTOTYPE DEVELOPMENT",
      title: "MVP وتطوير النماذج الأولية",
      description: "نحوّل الفكرة التقنية إلى نطاق واضح ثم نبني MVP أو نموذجًا أوليًا سريعًا يمكن عرضه واختباره مع المستخدمين.",
      items: ["تحسين مفهوم المنتج", "البنية التقنية", "Rapid prototyping", "نماذج Web / App", "تكامل الأجهزة والبرمجيات", "الاختبار والتطوير"],
      cta: "ناقش فكرتك",
    },
    {
      number: "02",
      eyebrow: "AI & AUTOMATION",
      title: "الذكاء الاصطناعي والأتمتة",
      description: "نصمم حلول AI Automation عملية تربط الأدوات والبيانات وتختصر العمليات المتكررة بما يناسب بيئة العمل الفعلية.",
      items: ["AI-powered workflows", "أدوات AI داخلية", "Agents", "أتمتة العمليات", "API integrations", "لوحات ذكية"],
      cta: "ابنِ الحل",
    },
    {
      number: "03",
      eyebrow: "IOT & EMBEDDED SYSTEMS",
      title: "IoT والأنظمة المضمنة",
      description: "نطوّر نماذج IoT وأنظمة مضمنة تربط الحساسات والأجهزة بالبرمجيات، ثم نختبر الاتصال والمعالجة في سيناريو حقيقي.",
      items: ["ESP32 / Raspberry Pi", "Sensors", "IoT prototypes", "Hardware + software", "Local / edge systems", "Device communication"],
      cta: "ابدأ النموذج",
    },
  ],
  process: [
    { number: "01", en: "UNDERSTAND", ar: "نفهم", text: "نفهم المشكلة والهدف." },
    { number: "02", en: "DESIGN", ar: "نصمم", text: "نحدد الحل والتقنيات المناسبة." },
    { number: "03", en: "BUILD", ar: "نبني", text: "نبني النموذج الأولي." },
    { number: "04", en: "TEST", ar: "نختبر", text: "نختبره في سيناريو حقيقي." },
    { number: "05", en: "ITERATE", ar: "نطوّر", text: "نطوره بناءً على النتائج." },
  ],
  labCapabilities: ["AI", "Embedded Systems", "Automation", "IoT", "Edge Systems", "Interactive Interfaces", "Rapid Prototyping", "3D Prototyping — مستقبلًا"],
} as const;
