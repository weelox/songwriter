const STORAGE_KEY = "songwriter-guide-v2";

const questions = [
  {
    id: "vibe",
    title: "1. Vilken vibe vill du ha?",
    help: "Till exempel: arg, lugn, glad, stressad, tom eller förvirrad.",
    placeholder: "Skriv din vibe...",
  },
  {
    id: "genre",
    title: "2. Vilken genre vill du att låten ska ha?",
    help: "Till exempel: rap, rock, pop, K-pop eller något annat.",
    placeholder: "Skriv genre...",
  },
  {
    id: "topic",
    title: "3. Vad vill du skriva om?",
    help: "Exempelvis: något som hänt, en person, något du tänker mycket på eller något som stör dig.",
    placeholder: "Skriv vad du vill skriva om...",
  },
];

const writingSteps = [
  {
    id: "focus",
    title: "Välj en konkret sak",
    subtitle: "",
    tip: "Välj en konkret sak: ett minne, en händelse, en mening någon sagt eller en känsla du haft nyligen.",
  },
  {
    id: "verse1",
    title: "Vers 1",
    subtitle: "Berätta vad som händer och varför.",
    tip: "Börja konkret: var är du, vad händer, vad känner du i stunden?",
  },
  {
    id: "chorus",
    title: "Refräng",
    subtitle: "Kärnan i låten.",
    tip: "Håll refrängen enkel och tydlig. Upprepa gärna nyckelord.",
  },
  {
    id: "verse2",
    title: "Vers 2",
    subtitle: "Utveckla berättelsen.",
    tip: "Visa förändring: vad blev tydligare, bättre eller svårare?",
  },
  {
    id: "outro",
    title: "Outro/Avslut (valfritt)",
    subtitle: "Runda av låten.",
    tip: "Avsluta med en sista rad som knyter ihop allt.",
  },
];

const learnRecommendations = [
  {
    title: "Hur skriver man en låttext?",
    url: "https://www.youtube.com/watch?v=aLkFddDAu4E",
    tags: ["text", "topic", "all"],
    kind: "video",
    thumb: "https://i.ytimg.com/vi/aLkFddDAu4E/hqdefault.jpg",
  },
  {
    title: "8 tips för att skriva en låttext",
    url: "https://www.youtube.com/watch?v=w5taIsBBde0",
    tags: ["text", "topic", "all"],
    kind: "video",
    thumb: "https://i.ytimg.com/vi/w5taIsBBde0/hqdefault.jpg",
  },
  {
    title: "How To Write A Rap",
    url: "https://www.youtube.com/watch?v=cLUK8ob-GMQ",
    tags: ["rap", "hiphop"],
    kind: "video",
    thumb: "https://i.ytimg.com/vi/cLUK8ob-GMQ/hqdefault.jpg",
  },
  {
    title: "How To Write Lyrics For A Song",
    url: "https://www.youtube.com/watch?v=9G4zOiWr7Kw",
    tags: ["pop", "text", "all"],
    kind: "video",
    thumb: "https://i.ytimg.com/vi/9G4zOiWr7Kw/hqdefault.jpg",
  },
  {
    title: "Skapa grunden till ditt hiphop-beat",
    url: "https://www.youtube.com/watch?v=Zqrwri8rnsQ",
    tags: ["rap", "hiphop", "beat"],
    kind: "video",
    thumb: "https://i.ytimg.com/vi/Zqrwri8rnsQ/hqdefault.jpg",
  },
  {
    title: "Logic Pro beginner tutorial",
    url: "https://www.youtube.com/watch?v=xKWdaSf9y5U&t=77s",
    tags: ["pop", "rock", "produktion"],
    kind: "video",
    thumb: "https://i.ytimg.com/vi/xKWdaSf9y5U/hqdefault.jpg",
  },
  {
    title: "Text & Berättelse (PDF)",
    url: "https://learn.trainstation.se/resources/teasers/category-3/pdf/38/bc35165ce66ee77b8373663dbfaec36d-1586496966024.pdf",
    tags: ["text", "topic", "all", "pdf"],
    kind: "pdf",
    thumb: "assets/pdf-covers/text-berattelse.svg",
  },
  {
    title: "Ackord och harmonier (PDF)",
    url: "https://learn.trainstation.se/resources/teasers/category-3/pdf/35/2a3cde8b26745accbae8a70c81810421-1586496500340.pdf",
    tags: ["musik", "all", "pdf"],
    kind: "pdf",
    thumb: "assets/pdf-covers/ackord-harmonier.svg",
  },
  {
    title: "Hur skriver man en låt? Crash course",
    url: "https://www.youtube.com/watch?v=c8bdDYAvyBc",
    tags: ["all", "text", "topic"],
    kind: "video",
    thumb: "https://i.ytimg.com/vi/c8bdDYAvyBc/hqdefault.jpg",
  },
  {
    title: "10 Lyric Writing Tips for Beginners",
    url: "https://www.youtube.com/watch?v=owNbrxOGyeU",
    tags: ["all", "text", "topic"],
    kind: "video",
    thumb: "https://i.ytimg.com/vi/owNbrxOGyeU/hqdefault.jpg",
  },
  {
    title: "Spela in röst/sång (PDF)",
    url: "https://learn.trainstation.se/resources/teasers/category-3/pdf/40/9d3c09283454035ba1d3276f65ea722c-1586497749705.pdf",
    tags: ["all", "pdf", "produktion"],
    kind: "pdf",
    thumb: "assets/pdf-covers/spela-in-rost.svg",
  },
];

const state = {
  questionIndex: 0,
  answers: {
    vibe: "",
    genre: "",
    topic: "",
    focus: "",
  },
  writingIndex: 0,
  lyrics: {
    verse1: "",
    chorus: "",
    verse2: "",
    outro: "",
  },
  aiDraft: "",
  aiDraftParsed: null,
  currentScreen: "start",
  soundOn: true,
  mode: "light",
};

const el = {
  restartTop: document.getElementById("restart-top"),
  startPanel: document.getElementById("start-panel"),
  startQuiz: document.getElementById("start-quiz"),
  quizPanel: document.getElementById("quiz-panel"),
  summaryPanel: document.getElementById("summary-panel"),
  writingPanel: document.getElementById("writing-panel"),
  finalPanel: document.getElementById("final-panel"),
  questionView: document.getElementById("question-view"),
  stepLabel: document.getElementById("step-label"),
  progressFill: document.getElementById("progress-fill"),
  summaryContent: document.getElementById("summary-content"),
  recommendationList: document.getElementById("recommendation-list"),
  generateAiDraft: document.getElementById("generate-ai-draft"),
  useAiDraft: document.getElementById("use-ai-draft"),
  aiDraftOutput: document.getElementById("ai-draft-output"),
  editAnswers: document.getElementById("edit-answers"),
  startWriting: document.getElementById("start-writing"),
  writingStepTitle: document.getElementById("writing-step-title"),
  writingStepSubtitle: document.getElementById("writing-step-subtitle"),
  writingTip: document.getElementById("writing-tip"),
  writingFieldLabel: document.getElementById("writing-field-label"),
  writingTextarea: document.getElementById("writing-textarea"),
  prevWriting: document.getElementById("prev-writing"),
  nextWriting: document.getElementById("next-writing"),
  randomLine: document.getElementById("random-line"),
  randomResult: document.getElementById("random-result"),
  lyricsPreview: document.getElementById("lyrics-preview"),
  backToWriting: document.getElementById("back-to-writing"),
  saveJson: document.getElementById("save-json"),
  loadJsonBtn: document.getElementById("load-json-btn"),
  loadJsonInput: document.getElementById("load-json-input"),
  saveTxt: document.getElementById("save-txt"),
  savePdf: document.getElementById("save-pdf"),
  resetAll: document.getElementById("reset-all"),
  soundToggle: document.getElementById("sound-toggle"),
  modeToggle: document.getElementById("mode-toggle"),
};

const panels = {
  start: el.startPanel,
  quiz: el.quizPanel,
  summary: el.summaryPanel,
  writing: el.writingPanel,
  final: el.finalPanel,
};

const audioCtx = window.AudioContext ? new AudioContext() : null;

function playClickTone(freq = 520, duration = 0.07) {
  if (!state.soundOn || !audioCtx) return;
  if (audioCtx.state === "suspended") audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.value = 0.0001;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;
  gain.gain.exponentialRampToValueAtTime(0.07, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.start(now);
  osc.stop(now + duration);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    Object.assign(state, parsed);
    state.answers = { ...state.answers, ...parsed.answers };
    state.lyrics = { ...state.lyrics, ...parsed.lyrics };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function resetStateToDefault() {
  Object.assign(state, {
    questionIndex: 0,
    answers: { vibe: "", genre: "", topic: "", focus: "" },
    writingIndex: 0,
    lyrics: { verse1: "", chorus: "", verse2: "", outro: "" },
    aiDraft: "",
    aiDraftParsed: null,
    currentScreen: "start",
    soundOn: true,
    mode: "light",
  });
}

function applyMode(mode) {
  const normalized = mode === "dark" ? "dark" : "light";
  state.mode = normalized;
  document.body.setAttribute("data-mode", normalized);
  if (el.modeToggle) {
    el.modeToggle.textContent = normalized === "dark" ? "Ljust läge" : "Mörkt läge";
  }
}

function setScreen(screen) {
  state.currentScreen = screen;
  Object.entries(panels).forEach(([key, panel]) => {
    const isActive = key === screen;
    panel.classList.toggle("hidden", !isActive);
    panel.classList.toggle("panel-show", isActive);
  });
  saveState();
}

function renderQuestion() {
  const q = questions[state.questionIndex];
  const value = state.answers[q.id] || "";

  el.stepLabel.textContent = `Fråga ${state.questionIndex + 1} av ${questions.length}`;
  el.progressFill.style.width = `${((state.questionIndex + 1) / questions.length) * 100}%`;

  el.questionView.innerHTML = `
    <article class="question-card">
      <h2>${q.title}</h2>
      <p class="question-help">${q.help}</p>
      <input id="answer-input" type="text" placeholder="${q.placeholder}" value="${escapeHtml(value)}" />
      <div class="button-row spread">
        <button id="prev-question" class="btn btn-ghost" ${
          state.questionIndex === 0 ? "disabled" : ""
        }>Tillbaka</button>
        <button id="next-question" class="btn btn-primary">Nästa</button>
      </div>
    </article>
  `;

  const answerInput = document.getElementById("answer-input");
  const prevQuestion = document.getElementById("prev-question");
  const nextQuestion = document.getElementById("next-question");

  answerInput.focus();

  answerInput.addEventListener("input", (event) => {
    state.answers[q.id] = event.target.value;
    saveState();
  });

  answerInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") nextQuestion.click();
  });

  prevQuestion.addEventListener("click", () => {
    playClickTone(420);
    if (state.questionIndex > 0) {
      state.questionIndex -= 1;
      renderQuestion();
      saveState();
    }
  });

  nextQuestion.addEventListener("click", () => {
    const text = answerInput.value.trim();
    if (!text) {
      answerInput.focus();
      answerInput.style.borderColor = "#a52d2d";
      return;
    }

    answerInput.style.borderColor = "";
    state.answers[q.id] = text;
    playClickTone(620);

    if (state.questionIndex < questions.length - 1) {
      state.questionIndex += 1;
      renderQuestion();
    } else {
      renderSummary();
      setScreen("summary");
    }
    saveState();
  });
}

function pickRecommendations() {
  const genre = (state.answers.genre || "").toLowerCase();
  const topic = (state.answers.topic || "").toLowerCase();

  const tags = new Set(["all"]);
  if (genre.includes("rap") || genre.includes("hiphop")) tags.add("rap");
  if (genre.includes("pop")) tags.add("pop");
  if (genre.includes("rock")) tags.add("rock");
  if (topic.includes("text") || topic.includes("berätt") || topic.includes("ord")) tags.add("text");
  if (topic.includes("beat") || topic.includes("trumma")) tags.add("beat");
  tags.add("topic");

  const selected = learnRecommendations.filter((item) => item.tags.some((tag) => tags.has(tag)));
  const fallback = learnRecommendations.filter(
    (item) => !selected.some((chosen) => chosen.url === item.url)
  );
  return [...selected, ...fallback].slice(0, 9);
}

function renderSummary() {
  const summaryItems = [
    { index: "1.", label: "Vibe", value: state.answers.vibe },
    { index: "2.", label: "Genre", value: state.answers.genre },
    { index: "3.", label: "About", value: state.answers.topic },
  ];

  el.summaryContent.innerHTML = summaryItems
    .map(
      (item) => `
      <div class="summary-item">
        <div class="summary-meta">${item.index} ${item.label}</div>
        <span>${escapeHtml(item.value || "-")}</span>
      </div>
    `
    )
    .join("");

  const recs = pickRecommendations();
  el.recommendationList.innerHTML = recs
    .map((r) => {
      const isVideo = r.kind === "video";
      const media = r.thumb
        ? `<img src="${r.thumb}" alt="${escapeHtml(r.title)}" loading="lazy" />`
        : `<div class="media-fallback">${isVideo ? "Video" : "Dokument"}</div>`;
      return `
        <li class="media-card-item">
          <a class="media-card" href="${r.url}" target="_blank" rel="noopener">
            <div class="media-thumb">${media}</div>
            <div class="media-copy">
              <span class="media-kicker">${isVideo ? "Video" : "PDF"}</span>
              <strong>${escapeHtml(r.title)}</strong>
            </div>
          </a>
        </li>
      `;
    })
    .join("");
}

function renderWritingStep() {
  const step = writingSteps[state.writingIndex];
  const isFocusStep = step.id === "focus";
  const vibe = state.answers.vibe || "en vibe";
  const genre = state.answers.genre || "en genre";
  const topic = state.answers.topic || "ett tema";

  el.writingStepTitle.textContent = step.title;
  el.writingStepSubtitle.textContent = isFocusStep
    ? `Eftersom du valt vibe "${vibe}", genren "${genre}" och temat "${topic}" börjar vi med att välja en konkret sak.`
    : step.subtitle;
  el.writingTip.textContent = step.tip;

  if (isFocusStep) {
    el.writingFieldLabel.textContent = "Din konkreta startpunkt";
    el.writingTextarea.placeholder = "Skriv en konkret sak du vill utgå från...";
    el.writingTextarea.value = state.answers.focus || "";
    el.randomLine.classList.add("hidden");
    el.randomResult.classList.add("hidden");
    el.nextWriting.textContent = "Börja med vers 1";
  } else {
    el.writingFieldLabel.textContent = "Din text";
    el.writingTextarea.placeholder = "Skriv här...";
    el.writingTextarea.value = state.lyrics[step.id] || "";
    el.randomLine.classList.remove("hidden");
    el.randomResult.classList.remove("hidden");
    el.nextWriting.textContent = state.writingIndex === writingSteps.length - 1 ? "Förhandsvisa låten" : "Nästa";
  }

  el.prevWriting.textContent = state.writingIndex === 0 ? "Till quiz" : "Tillbaka";
  el.randomResult.textContent = "";
}

function randomStarter() {
  const vibe = state.answers.vibe || "känslan";
  const focus = state.answers.focus || "det du bär på";
  const topic = state.answers.topic || "det du känner";
  const genre = state.answers.genre || "din stil";
  const step = writingSteps[state.writingIndex].id;

  const bank = {
    verse1: [
      `Jag minns exakt när allt vände, det var då ${focus}.`,
      `Steg för steg försökte jag andas, men ${vibe} tog över.`,
      `I min ${genre}-värld började allt med ${topic.toLowerCase()}.`,
    ],
    chorus: [
      `Det här är jag, det här är ${topic.toLowerCase()}, jag gömmer inget mer.`,
      `${vibe} i bröstet, men jag står kvar ändå.`,
      `Om du hör mig nu, hör hela mig.`,
    ],
    verse2: [
      `Nu vågar jag säga det högt, jag är trött på att bära allt själv.`,
      `Jag trodde jag var ensam, men jag är fortfarande här.`,
      `Kanske är styrka att känna allt och ändå gå vidare.`,
    ],
    outro: [
      `Och när natten släpper taget, skriver jag mig fri.`,
      `Det här var min röst, och nu hörs den tydligt.`,
      `Jag lämnar låten här, men känslan lever kvar.`,
    ],
  };

  const list = bank[step] || [];
  const line = list[Math.floor(Math.random() * list.length)] || "Börja med en enkel, ärlig rad.";
  el.randomResult.textContent = line;
  playClickTone(760, 0.09);
}

function generateAiDraftFromAnswers() {
  const vibe = state.answers.vibe || "stark";
  const genre = state.answers.genre || "fri";
  const topic = state.answers.topic || "livet";
  const focus = state.answers.focus || `ett minne kopplat till ${topic}`;

  const verse1 = [
    `Det började med ${focus}, allt blev så tydligt då,`,
    `Jag gick runt med ${vibe} i bröstet men försökte ändå stå,`,
    `I min ${genre}-värld blev varje tanke som ett spår.`
  ].join("\n");

  const chorus = [
    `Det här är min röst, det här är ${topic},`,
    `Jag håller inget inne, jag skriver det jag bär på.`,
    `Om natten blir för tung så sjunger jag ändå.`
  ].join("\n");

  const verse2 = [
    `Nu ser jag allt från en ny vinkel, jag vågar ta plats,`,
    `Varje rad jag skriver gör det lättare att andas,`,
    `Jag låter sanningen höras, även när den skaver.`
  ].join("\n");

  const outro = `Jag skriver klart, tar ett djupt andetag, och går vidare.`;

  return {
    focus,
    verse1,
    chorus,
    verse2,
    outro,
    text: [
      `AI-utkast (${genre})`,
      `Vibe: ${vibe}`,
      `Tema: ${topic}`,
      ``,
      `VERS 1`,
      verse1,
      ``,
      `REFRÄNG`,
      chorus,
      ``,
      `VERS 2`,
      verse2,
      ``,
      `OUTRO`,
      outro,
    ].join("\n"),
  };
}

function buildSongText() {
  const blocks = [
    `Titel: Min låt (${state.answers.genre || "fri genre"})`,
    ``,
    `Vibe: ${state.answers.vibe || "-"}`,
    `Tema: ${state.answers.topic || "-"}`,
    `Konkret utgångspunkt: ${state.answers.focus || "-"}`,
    ``,
    `VERS 1`,
    state.lyrics.verse1 || "(tom)",
    ``,
    `REFRÄNG`,
    state.lyrics.chorus || "(tom)",
    ``,
    `VERS 2`,
    state.lyrics.verse2 || "(tom)",
    ``,
    `OUTRO`,
    state.lyrics.outro || "(tom)",
  ];

  return blocks.join("\n");
}

function renderFinal() {
  el.lyricsPreview.textContent = buildSongText();
}

function downloadFile(filename, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportJson() {
  const data = {
    exportedAt: new Date().toISOString(),
    app: "songwriter-guide",
    state,
  };
  downloadFile(
    `songwriter-project-${new Date().toISOString().slice(0, 10)}.json`,
    JSON.stringify(data, null, 2),
    "application/json;charset=utf-8"
  );
}

function importJsonFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!parsed?.state) throw new Error("Saknar state-fält");

      Object.assign(state, parsed.state);
      state.answers = { ...state.answers, ...parsed.state.answers };
      state.lyrics = { ...state.lyrics, ...parsed.state.lyrics };

      hydrateFromState();
      saveState();
      playClickTone(690, 0.1);
      alert("Projektfil inläst.");
    } catch {
      alert("Kunde inte läsa filen. Kontrollera att det är en giltig projektfil.");
    }
  };
  reader.readAsText(file);
}

function hydrateFromState() {
  applyMode(state.mode || "light");

  switch (state.currentScreen) {
    case "quiz":
      renderQuestion();
      setScreen("quiz");
      break;
    case "summary":
      renderSummary();
      setScreen("summary");
      break;
    case "writing":
      renderWritingStep();
      setScreen("writing");
      break;
    case "final":
      renderFinal();
      setScreen("final");
      break;
    default:
      state.currentScreen = "start";
      setScreen("start");
  }

  el.soundToggle.textContent = `Ljud: ${state.soundOn ? "På" : "Av"}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function hardReset() {
  if (!confirm("Är du säker på att du vill börja om från början?")) return;

  localStorage.removeItem(STORAGE_KEY);
  resetStateToDefault();
  el.aiDraftOutput.classList.add("hidden");
  el.useAiDraft.classList.add("hidden");
  el.aiDraftOutput.textContent = "";
  setScreen("start");
  playClickTone(380, 0.12);
}

el.restartTop.addEventListener("click", hardReset);
el.startQuiz.addEventListener("click", () => {
  playClickTone(610);
  state.questionIndex = 0;
  renderQuestion();
  setScreen("quiz");
});

el.editAnswers.addEventListener("click", () => {
  playClickTone(430);
  state.questionIndex = 0;
  renderQuestion();
  setScreen("quiz");
});

el.generateAiDraft.addEventListener("click", () => {
  const draft = generateAiDraftFromAnswers();
  state.aiDraft = draft.text;
  state.aiDraftParsed = draft;
  el.aiDraftOutput.textContent = draft.text;
  el.aiDraftOutput.classList.remove("hidden");
  el.useAiDraft.classList.remove("hidden");
  saveState();
  playClickTone(760, 0.1);
});

el.useAiDraft.addEventListener("click", () => {
  if (!state.aiDraftParsed) return;
  state.answers.focus = state.aiDraftParsed.focus;
  state.lyrics.verse1 = state.aiDraftParsed.verse1;
  state.lyrics.chorus = state.aiDraftParsed.chorus;
  state.lyrics.verse2 = state.aiDraftParsed.verse2;
  state.lyrics.outro = state.aiDraftParsed.outro;
  state.writingIndex = 0;
  renderWritingStep();
  setScreen("writing");
  playClickTone(710, 0.1);
});

el.startWriting.addEventListener("click", () => {
  playClickTone(610);
  state.writingIndex = 0;
  renderWritingStep();
  setScreen("writing");
});

el.writingTextarea.addEventListener("input", (event) => {
  const currentStep = writingSteps[state.writingIndex];
  if (currentStep.id === "focus") {
    state.answers.focus = event.target.value;
  } else {
    state.lyrics[currentStep.id] = event.target.value;
  }
  saveState();
});

el.prevWriting.addEventListener("click", () => {
  playClickTone(420);
  if (state.writingIndex === 0) {
    renderSummary();
    setScreen("summary");
    return;
  }
  state.writingIndex -= 1;
  renderWritingStep();
  saveState();
});

el.nextWriting.addEventListener("click", () => {
  const currentStep = writingSteps[state.writingIndex];
  if (currentStep.id === "focus") {
    const text = el.writingTextarea.value.trim();
    if (!text) {
      el.writingTextarea.focus();
      el.writingTextarea.style.borderColor = "#a52d2d";
      return;
    }
    el.writingTextarea.style.borderColor = "";
    state.answers.focus = text;
  } else {
    state.lyrics[currentStep.id] = el.writingTextarea.value.trim();
  }

  if (state.writingIndex === writingSteps.length - 1) {
    renderFinal();
    setScreen("final");
    playClickTone(780, 0.11);
    saveState();
    return;
  }

  state.writingIndex += 1;
  renderWritingStep();
  playClickTone(620);
  saveState();
});

el.randomLine.addEventListener("click", randomStarter);

el.backToWriting.addEventListener("click", () => {
  playClickTone(410);
  state.writingIndex = writingSteps.length - 1;
  renderWritingStep();
  setScreen("writing");
});

el.saveJson.addEventListener("click", () => {
  exportJson();
  playClickTone(740, 0.09);
});

el.loadJsonBtn.addEventListener("click", () => {
  el.loadJsonInput.click();
});

el.loadJsonInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) importJsonFile(file);
  event.target.value = "";
});

el.saveTxt.addEventListener("click", () => {
  downloadFile(`låttext-${new Date().toISOString().slice(0, 10)}.txt`, buildSongText());
  playClickTone(730, 0.09);
});

el.savePdf.addEventListener("click", () => {
  window.print();
  playClickTone(660, 0.08);
});

el.resetAll.addEventListener("click", hardReset);

el.soundToggle.addEventListener("click", () => {
  state.soundOn = !state.soundOn;
  el.soundToggle.textContent = `Ljud: ${state.soundOn ? "På" : "Av"}`;
  saveState();
  playClickTone(540, 0.08);
});

el.modeToggle.addEventListener("click", () => {
  const nextMode = state.mode === "dark" ? "light" : "dark";
  applyMode(nextMode);
  saveState();
  playClickTone(nextMode === "dark" ? 640 : 540, 0.08);
});

loadState();
hydrateFromState();
