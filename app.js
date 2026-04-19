const STORAGE_KEY = "songwriter-guide-v1";

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
    id: "feel",
    title: "3. Hur vill du att låten ska kännas?",
    help: "Utgå från dig själv, inte från vad du tror att andra vill höra.",
    placeholder: "Skriv med dina ord...",
  },
  {
    id: "trigger",
    title: "4. Vad får dig att känna den känslan?",
    help: "Till exempel något som hänt, en person, en tanke eller något som stör dig.",
    placeholder: "Skriv vad som triggar känslan...",
  },
];

const writingSteps = [
  {
    id: "intro",
    title: "Intro (valfritt)",
    subtitle: "Sätt tonen med 1-3 rader.",
    tip: "Tips: Måla en snabb bild av plats, tid eller känsla. Håll det enkelt.",
  },
  {
    id: "verse1",
    title: "Vers 1",
    subtitle: "Berätta vad som händer och varför.",
    tip: "Tips: Börja konkret. Vad ser du? Vad händer? Vad tänker du just då?",
  },
  {
    id: "chorus",
    title: "Refräng",
    subtitle: "Kärnan i låten. Här fastnar känslan.",
    tip: "Tips: Upprepa nyckelord, håll språket tydligt och sjungbart.",
  },
  {
    id: "verse2",
    title: "Vers 2",
    subtitle: "Utveckla storyn eller känslan.",
    tip: "Tips: Visa en förändring: blev något bättre, värre eller tydligare?",
  },
  {
    id: "outro",
    title: "Outro/Avslut (valfritt)",
    subtitle: "Avsluta med en sista tanke eller rad.",
    tip: "Tips: Knyt ihop låten med en enkel slutsats eller ett starkt sista ord.",
  },
];

const state = {
  questionIndex: 0,
  answers: {
    vibe: "",
    genre: "",
    feel: "",
    trigger: "",
  },
  writingIndex: 0,
  lyrics: {
    intro: "",
    verse1: "",
    chorus: "",
    verse2: "",
    outro: "",
  },
  currentScreen: "quiz",
  soundOn: true,
};

const el = {
  quizPanel: document.getElementById("quiz-panel"),
  summaryPanel: document.getElementById("summary-panel"),
  writingPanel: document.getElementById("writing-panel"),
  finalPanel: document.getElementById("final-panel"),
  questionView: document.getElementById("question-view"),
  stepLabel: document.getElementById("step-label"),
  progressFill: document.getElementById("progress-fill"),
  summaryContent: document.getElementById("summary-content"),
  editAnswers: document.getElementById("edit-answers"),
  startWriting: document.getElementById("start-writing"),
  writingStepTitle: document.getElementById("writing-step-title"),
  writingStepSubtitle: document.getElementById("writing-step-subtitle"),
  writingTip: document.getElementById("writing-tip"),
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

function setScreen(screen) {
  state.currentScreen = screen;
  el.quizPanel.classList.toggle("hidden", screen !== "quiz");
  el.summaryPanel.classList.toggle("hidden", screen !== "summary");
  el.writingPanel.classList.toggle("hidden", screen !== "writing");
  el.finalPanel.classList.toggle("hidden", screen !== "final");
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
      <input id="answer-input" type="text" placeholder="${q.placeholder}" value="${escapeHtml(
    value
  )}" />
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

function renderSummary() {
  el.summaryContent.innerHTML = questions
    .map(
      (q) => `
      <div class="summary-item">
        <strong>${q.title}</strong>
        <span>${escapeHtml(state.answers[q.id] || "-")}</span>
      </div>
    `
    )
    .join("");
}

function renderWritingStep() {
  const step = writingSteps[state.writingIndex];
  el.writingStepTitle.textContent = step.title;
  el.writingStepSubtitle.textContent = step.subtitle;
  el.writingTip.textContent = step.tip;
  el.writingTextarea.value = state.lyrics[step.id] || "";
  el.prevWriting.textContent = state.writingIndex === 0 ? "Till quiz" : "Tillbaka";
  el.nextWriting.textContent =
    state.writingIndex === writingSteps.length - 1 ? "Förhandsvisa låten" : "Nästa";
  el.randomResult.textContent = "";
}

function randomStarter() {
  const vibe = state.answers.vibe || "känslan";
  const trigger = state.answers.trigger || "det du bär på";
  const feel = state.answers.feel || "det du känner";
  const genre = state.answers.genre || "din stil";
  const step = writingSteps[state.writingIndex].id;

  const bank = {
    intro: [
      `Ikväll låter allt som ${vibe}, och jag är mitt i det.`,
      `Det började i tystnad, men nu känns ${feel.toLowerCase()}.`,
      `I min ${genre}-värld är sanningen enkel: ${trigger}.`,
    ],
    verse1: [
      `Jag minns exakt när allt vände, det var då ${trigger}.`,
      `Steg för steg försökte jag andas, men ${vibe} tog över.`,
      `Ingen såg vad som hände inom mig när ${trigger}.`,
    ],
    chorus: [
      `Det här är jag, det här är ${feel.toLowerCase()}, jag gömmer inget mer.`,
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

function buildSongText() {
  const blocks = [
    `Titel: Min låt (${state.answers.genre || "fri genre"})`,
    ``,
    `Vibe: ${state.answers.vibe || "-"}`,
    `Känsla: ${state.answers.feel || "-"}`,
    `Trigger: ${state.answers.trigger || "-"}`,
    ``,
    `INTRO`,
    state.lyrics.intro || "(tom)",
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
  switch (state.currentScreen) {
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
      state.currentScreen = "quiz";
      renderQuestion();
      setScreen("quiz");
  }

  el.soundToggle.textContent = `Ljud: ${state.soundOn ? "På" : "Av"}`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

el.editAnswers.addEventListener("click", () => {
  playClickTone(430);
  state.questionIndex = 0;
  renderQuestion();
  setScreen("quiz");
});

el.startWriting.addEventListener("click", () => {
  playClickTone(610);
  state.writingIndex = 0;
  renderWritingStep();
  setScreen("writing");
});

el.writingTextarea.addEventListener("input", (event) => {
  const currentStep = writingSteps[state.writingIndex];
  state.lyrics[currentStep.id] = event.target.value;
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
  state.lyrics[currentStep.id] = el.writingTextarea.value.trim();

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

el.resetAll.addEventListener("click", () => {
  if (!confirm("Är du säker på att du vill nollställa allt?")) return;

  localStorage.removeItem(STORAGE_KEY);
  Object.assign(state, {
    questionIndex: 0,
    answers: { vibe: "", genre: "", feel: "", trigger: "" },
    writingIndex: 0,
    lyrics: { intro: "", verse1: "", chorus: "", verse2: "", outro: "" },
    currentScreen: "quiz",
    soundOn: true,
  });

  renderQuestion();
  setScreen("quiz");
  el.soundToggle.textContent = "Ljud: På";
  playClickTone(380, 0.12);
});

el.soundToggle.addEventListener("click", () => {
  state.soundOn = !state.soundOn;
  el.soundToggle.textContent = `Ljud: ${state.soundOn ? "På" : "Av"}`;
  saveState();
  playClickTone(540, 0.08);
});

loadState();
hydrateFromState();
