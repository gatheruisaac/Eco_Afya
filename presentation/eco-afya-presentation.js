import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Eco Afya";
pptx.subject = "Healthy and sustainable food choices";
pptx.title = "Eco Afya | Make every choice count";
pptx.company = "Eco Afya";
pptx.lang = "en-US";
pptx.theme = { headFontFace: "Georgia", bodyFontFace: "Trebuchet MS", lang: "en-US" };

const C = {
  ink: "071E17",
  panel: "0A2E23",
  panel2: "103D2E",
  lime: "CCFF00",
  mint: "C7E9D7",
  muted: "8DB7A3",
  white: "F6FBF5",
  orange: "F5A65B",
};

pptx.defineSlideMaster({
  title: "ECO",
  background: { color: C.ink },
  objects: [
    { rect: { x: 0, y: 7.25, w: 13.333, h: 0.25, fill: { color: C.lime }, line: { color: C.lime } } },
    { text: { text: "ECO AFYA", options: { x: 0.55, y: 7.02, w: 1.2, h: 0.18, fontFace: "Trebuchet MS", fontSize: 7, bold: true, color: C.lime, charSpacing: 1.5, margin: 0 } } },
  ],
  slideNumber: { x: 12.35, y: 7.01, color: C.muted, fontFace: "Trebuchet MS", fontSize: 8 },
});

const images = {
  cacao: "https://upload.wikimedia.org/wikipedia/commons/2/22/Ghana_cacao2.jpg",
  fruit: "https://upload.wikimedia.org/wikipedia/commons/0/06/TIN_TIN%28_Local_wild_fruit_in_Bamenda%2C_Cameroon%29.jpg",
  spice: "https://c.pxhere.com/photos/87/79/nutmeg_spice_zanzibar_farming_africa_color_colorful_canon-130131.jpg!d",
};

async function imageData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to load image: ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  return `data:${response.headers.get("content-type") || "image/jpeg"};base64,${buffer.toString("base64")}`;
}

function text(slide, value, x, y, w, h, options = {}) {
  slide.addText(value, { x, y, w, h, margin: 0, fontFace: "Trebuchet MS", color: C.white, fit: "shrink", valign: "mid", ...options });
}

function label(slide, value, x, y, w = 2.4) {
  text(slide, value.toUpperCase(), x, y, w, 0.2, { fontSize: 9, bold: true, color: C.lime, charSpacing: 1.8 });
}

function title(slide, heading, subtitle) {
  label(slide, "The Eco Afya approach", 0.7, 0.52, 3.4);
  text(slide, heading, 0.7, 0.86, 9.5, 0.72, { fontFace: "Georgia", fontSize: 28, bold: true });
  text(slide, subtitle, 0.72, 1.68, 8.2, 0.4, { fontSize: 12, color: C.mint });
}

function pill(slide, value, x, y, w, fill = C.panel2, color = C.mint) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.34, rectRadius: 0.08, fill: { color: fill }, line: { color: fill } });
  text(slide, value, x + 0.1, y + 0.02, w - 0.2, 0.25, { fontSize: 8.5, bold: true, color, align: "center" });
}

async function build() {
  const [cacao, fruit, spice] = await Promise.all(Object.values(images).map(imageData));

  {
    const slide = pptx.addSlide("ECO");
    slide.addImage({ data: cacao, x: 7.9, y: 0, w: 5.43, h: 7.25, transparency: 7 });
    slide.addShape(pptx.ShapeType.rect, { x: 7.9, y: 0, w: 5.43, h: 7.25, fill: { color: C.ink, transparency: 35 }, line: { color: C.ink, transparency: 100 } });
    text(slide, "🌱  ECO AFYA", 0.75, 0.62, 2.5, 0.3, { fontSize: 13, bold: true, color: C.lime, charSpacing: 1.2 });
    text(slide, "Make every\nchoice count.", 0.75, 1.62, 6.55, 1.55, { fontFace: "Georgia", fontSize: 39, bold: true, breakLine: true, valign: "top" });
    text(slide, "A clearer way to choose food that is good for your body and kinder to the planet.", 0.8, 3.55, 4.9, 0.72, { fontSize: 17, color: C.mint, breakLine: true, valign: "top" });
    pill(slide, "PRODUCT PRESENTATION", 0.8, 5.1, 1.9, C.lime, C.ink);
    text(slide, "Health insight  ×  environmental insight", 0.8, 5.72, 4.5, 0.28, { fontSize: 11, color: C.muted });
    text(slide, "02 SEPTEMBER 2026", 0.8, 6.55, 2.3, 0.2, { fontSize: 8, bold: true, color: C.muted, charSpacing: 1.5 });
  }

  {
    const slide = pptx.addSlide("ECO");
    title(slide, "The everyday food decision is overloaded.", "Labels are everywhere. Clarity is not.");
    const items = [
      ["01", "Nutrition is hard to scan", "People want to understand what they are eating without decoding a wall of labels."],
      ["02", "Impact stays invisible", "The environmental cost of a product rarely appears beside the choice itself."],
      ["03", "Good intentions fade", "Without a simple way to save and reflect, healthy habits are difficult to sustain."],
    ];
    items.forEach(([num, heading, body], index) => {
      const x = 0.72 + index * 4.15;
      slide.addShape(pptx.ShapeType.line, { x, y: 2.45, w: 3.3, h: 0, line: { color: C.lime, width: 2 } });
      text(slide, num, x, 2.65, 0.6, 0.35, { fontFace: "Georgia", fontSize: 20, bold: true, color: C.lime });
      text(slide, heading, x, 3.2, 3.35, 0.55, { fontFace: "Georgia", fontSize: 17, bold: true, valign: "top" });
      text(slide, body, x, 4.05, 3.25, 0.95, { fontSize: 12, color: C.mint, breakLine: true, valign: "top" });
    });
    slide.addShape(pptx.ShapeType.roundRect, { x: 0.72, y: 5.75, w: 11.85, h: 0.72, rectRadius: 0.08, fill: { color: C.panel }, line: { color: C.panel2, width: 1 } });
    text(slide, "Eco Afya turns scattered information into one calm, actionable decision.", 1.05, 5.95, 11.2, 0.25, { fontFace: "Georgia", fontSize: 16, italic: true, color: C.lime, align: "center" });
  }

  {
    const slide = pptx.addSlide("ECO");
    title(slide, "One place to understand the choice.", "Eco Afya connects food discovery, personal context, and better habits.");
    slide.addImage({ data: fruit, x: 8.85, y: 0.55, w: 3.82, h: 5.95, transparency: 2 });
    slide.addShape(pptx.ShapeType.rect, { x: 8.85, y: 0.55, w: 3.82, h: 5.95, fill: { color: C.ink, transparency: 52 }, line: { color: C.ink, transparency: 100 } });
    label(slide, "Our promise", 0.75, 2.45);
    text(slide, "See the food.\nRead the signal.\nChoose with confidence.", 0.75, 2.8, 6.8, 1.6, { fontFace: "Georgia", fontSize: 27, bold: true, breakLine: true, valign: "top" });
    text(slide, "Built for everyday people, local food stories, and decisions that add up over time.", 0.78, 4.85, 5.4, 0.52, { fontSize: 13, color: C.mint, breakLine: true, valign: "top" });
    pill(slide, "NUTRITION", 0.78, 5.8, 1.15);
    pill(slide, "PLANET", 2.05, 5.8, 0.95);
    pill(slide, "WELLNESS", 3.12, 5.8, 1.15);
  }

  {
    const slide = pptx.addSlide("ECO");
    title(slide, "A three-step journey from curiosity to habit.", "Every feature has one job: make the next good choice easier.");
    const steps = [
      ["01", "DISCOVER", "Browse a focused catalogue or search the wider food database.", "🔎"],
      ["02", "UNDERSTAND", "Compare Nutri-Score, Eco-Score, ingredients, and product details.", "🥗"],
      ["03", "REMEMBER", "Save favourites and keep a personal food log to build awareness over time.", "❤️"],
    ];
    steps.forEach(([num, heading, body, icon], index) => {
      const x = 0.8 + index * 4.12;
      slide.addShape(pptx.ShapeType.roundRect, { x, y: 2.55, w: 3.55, h: 2.85, rectRadius: 0.08, fill: { color: index === 1 ? C.lime : C.panel }, line: { color: index === 1 ? C.lime : C.panel2, width: 1.2 } });
      text(slide, icon, x + 0.3, 2.88, 0.45, 0.4, { fontSize: 22 });
      text(slide, num, x + 2.62, 2.93, 0.55, 0.22, { fontSize: 9, bold: true, color: index === 1 ? C.ink : C.lime, align: "right" });
      text(slide, heading, x + 0.3, 3.65, 2.7, 0.28, { fontSize: 11, bold: true, color: index === 1 ? C.ink : C.lime, charSpacing: 1.3 });
      text(slide, body, x + 0.3, 4.08, 2.8, 0.72, { fontFace: "Georgia", fontSize: 15, bold: true, color: index === 1 ? C.ink : C.white, breakLine: true, valign: "top" });
    });
    text(slide, "The result: less guesswork, more agency.", 0.8, 6.2, 5.9, 0.35, { fontFace: "Georgia", fontSize: 18, italic: true, color: C.lime });
  }

  {
    const slide = pptx.addSlide("ECO");
    title(slide, "The product card is the decision surface.", "A compact view of the signals that matter most.");
    slide.addShape(pptx.ShapeType.roundRect, { x: 0.75, y: 2.3, w: 4.3, h: 3.55, rectRadius: 0.08, fill: { color: C.panel }, line: { color: C.panel2, width: 1 } });
    text(slide, "🥜", 1.05, 2.68, 0.65, 0.6, { fontSize: 30 });
    text(slide, "Peanut Butter", 1.9, 2.75, 2.2, 0.28, { fontFace: "Georgia", fontSize: 18, bold: true });
    text(slide, "Bega  ·  food product", 1.9, 3.1, 2.2, 0.2, { fontSize: 9, color: C.muted });
    [["Nutrition", "B", C.lime], ["Planet", "D", C.orange]].forEach(([name, score, color], index) => {
      const x = 1.05 + index * 1.92;
      slide.addShape(pptx.ShapeType.roundRect, { x, y: 3.75, w: 1.68, h: 0.75, rectRadius: 0.06, fill: { color: C.ink }, line: { color: C.panel2, width: 1 } });
      text(slide, name, x + 0.12, 3.91, 0.95, 0.2, { fontSize: 9, color: C.mint });
      text(slide, score, x + 1.2, 3.86, 0.28, 0.28, { fontSize: 16, bold: true, color });
    });
    text(slide, "View details  →", 1.05, 4.95, 1.5, 0.25, { fontSize: 10, bold: true, color: C.lime });
    text(slide, "A product page can go deeper when the user wants ingredients, barcode information, and a full breakdown.", 1.05, 5.35, 3.3, 0.35, { fontSize: 10, color: C.muted, breakLine: true, valign: "top" });
    [["01", "Nutri-Score", "Fast nutritional orientation"], ["02", "Eco-Score", "Environmental context"], ["03", "Ingredients", "Transparent product detail"]].forEach(([num, heading, body], index) => {
      const y = 2.55 + index * 1.18;
      text(slide, num, 6.15, y, 0.45, 0.3, { fontSize: 10, bold: true, color: C.lime });
      text(slide, heading, 6.9, y, 2.45, 0.28, { fontFace: "Georgia", fontSize: 17, bold: true });
      text(slide, body, 6.9, y + 0.36, 3.3, 0.23, { fontSize: 10.5, color: C.mint });
      slide.addShape(pptx.ShapeType.line, { x: 6.15, y: y + 0.78, w: 5.25, h: 0, line: { color: C.panel2, width: 1 } });
    });
  }

  {
    const slide = pptx.addSlide("ECO");
    title(slide, "The personal layer turns information into momentum.", "The app remembers what matters to each user.");
    slide.addImage({ data: spice, x: 7.62, y: 0.55, w: 5.05, h: 5.95, transparency: 8 });
    slide.addShape(pptx.ShapeType.rect, { x: 7.62, y: 0.55, w: 5.05, h: 5.95, fill: { color: C.ink, transparency: 42 }, line: { color: C.ink, transparency: 100 } });
    [["♥", "Favourites", "Keep promising products close and compare them later."], ["✎", "Food logs", "Record a choice, add a note, and reflect on patterns."], ["⌁", "Protected account", "Personal records stay attached to the authenticated user."]].forEach(([icon, heading, body], index) => {
      const y = 2.25 + index * 1.28;
      text(slide, icon, 0.78, y, 0.38, 0.34, { fontSize: 21, color: C.lime });
      text(slide, heading, 1.42, y, 3.05, 0.28, { fontFace: "Georgia", fontSize: 18, bold: true });
      text(slide, body, 1.42, y + 0.4, 4.8, 0.38, { fontSize: 11, color: C.mint, breakLine: true, valign: "top" });
    });
  }

  {
    const slide = pptx.addSlide("ECO");
    title(slide, "A lightweight full-stack foundation.", "A practical architecture for a product that can grow with its users.");
    [["React + Vite", "Responsive interface", 0.85, 2.6, C.lime, C.ink], ["Flask API", "Auth + food logs", 4.75, 2.6, C.panel2, C.white], ["PostgreSQL", "Users + records", 8.65, 2.6, C.panel2, C.white], ["Open Food Facts", "Product intelligence", 4.75, 5.0, C.orange, C.ink]].forEach(([heading, body, x, y, fill, color]) => {
      slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 2.95, h: 1.08, rectRadius: 0.08, fill: { color: fill }, line: { color: fill } });
      text(slide, heading, x + 0.2, y + 0.25, 2.55, 0.25, { fontFace: "Georgia", fontSize: 16, bold: true, color, align: "center" });
      text(slide, body, x + 0.2, y + 0.62, 2.55, 0.2, { fontSize: 9, color, align: "center" });
    });
    [[3.8, 3.12, 0.9, 0], [7.7, 3.12, 0.9, 0], [6.22, 4.05, 0, 0.75], [6.22, 4.05, -1.45, 0.75]].forEach(([x, y, w, h]) => slide.addShape(pptx.ShapeType.line, { x, y, w, h, line: { color: C.muted, width: 1.5, endArrowType: "triangle" } }));
    text(slide, "Designed to keep the user experience calm while the data and ownership rules stay explicit underneath.", 0.85, 6.5, 8.6, 0.3, { fontFace: "Georgia", fontSize: 14, italic: true, color: C.mint });
  }

  {
    const slide = pptx.addSlide("ECO");
    label(slide, "The invitation", 0.75, 0.62, 2.2);
    text(slide, "Better choices\nstart with better context.", 0.75, 1.35, 7.0, 1.25, { fontFace: "Georgia", fontSize: 34, bold: true, breakLine: true, valign: "top" });
    text(slide, "Eco Afya makes nutrition and sustainability part of the same everyday conversation.", 0.8, 3.2, 5.6, 0.55, { fontSize: 15, color: C.mint, breakLine: true, valign: "top" });
    pill(slide, "LIVE PRODUCT DEMO", 0.8, 4.45, 1.62, C.lime, C.ink);
    text(slide, "eco-afya.vercel.app", 0.8, 5.08, 3.2, 0.3, { fontSize: 14, bold: true, color: C.lime });
    slide.addShape(pptx.ShapeType.roundRect, { x: 8.1, y: 1.05, w: 4.0, h: 4.75, rectRadius: 0.08, fill: { color: C.panel }, line: { color: C.panel2, width: 1 } });
    text(slide, "IMAGE SOURCES", 8.48, 1.48, 2.2, 0.2, { fontSize: 9, bold: true, color: C.lime, charSpacing: 1.5 });
    text(slide, "Ghana cacao2.jpg\nWikimedia Commons\n\nLocal wild fruit in Bamenda, Cameroon\nWikimedia Commons\n\nNutmeg, spice, Zanzibar farming\nPxhere · photo 130131", 8.48, 1.95, 3.15, 2.65, { fontSize: 10, color: C.mint, breakLine: true, valign: "top" });
    text(slide, "Thank you", 8.48, 5.12, 2.0, 0.35, { fontFace: "Georgia", fontSize: 22, bold: true });
  }

  await pptx.writeFile({ fileName: "presentation/eco-afya-presentation.pptx" });
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});