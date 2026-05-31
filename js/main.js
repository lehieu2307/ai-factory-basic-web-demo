const app = document.getElementById("app");
const year = document.getElementById("year");
const navLinks = document.getElementById("nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const toastRegion = document.getElementById("toast-region");

year.textContent = new Date().getFullYear();

const cleanupFns = [];
const routes = {
  "/home": renderHome,
  "/dashboard": renderDashboard,
  "/calculator": renderCalculator,
  "/workflow": renderWorkflow,
  "/contact": renderContact
};

const models = {
  "GPT-4": { input: 0.03, output: 0.06 },
  "Claude 3.5 Sonnet": { input: 0.003, output: 0.015 },
  "Gemini 1.5 Pro": { input: 0.0035, output: 0.0105 }
};

function cleanupRoute() {
  while (cleanupFns.length) cleanupFns.pop()();
}

function addCleanup(fn) {
  cleanupFns.push(fn);
}

function normalizeHash() {
  if (!location.hash || location.hash === "#") {
    location.replace("#/home");
    return "/home";
  }
  const path = location.hash.slice(1);
  return routes[path] ? path : "/home";
}

function setActive(path) {
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === path);
  });
}

function mount(html, afterRender) {
  cleanupRoute();
  app.innerHTML = html;
  app.focus({ preventScroll: true });
  if (afterRender) afterRender();
}

function router() {
  const path = normalizeHash();
  setActive(path);
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  routes[path]();
}

function showToast(type, msg) {
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "error" : ""}`;
  toast.textContent = msg;
  toastRegion.appendChild(toast);
  setTimeout(() => toast.remove(), 3400);
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    showToast("success", "Copied to clipboard.");
  } catch {
    showToast("error", "Copy failed.");
  }
}

function money(num) {
  return `$${num.toFixed(4)}`;
}

function renderHome() {
  mount(`
    <section class="hero">
      <div>
        <p class="eyebrow"><span class="pulse"></span>PREMIUM VANILLA SPA</p>
        <h1>Build polished AI ops dashboards at <span class="gradient-text">machine speed.</span></h1>
        <p class="lead">A dark glass single page app with hash routing, telemetry, calculators, workflow docs, validation, and offline service worker support.</p>
        <div class="actions">
          <a class="btn primary" href="#/dashboard">Open dashboard →</a>
          <a class="btn" href="#/workflow">Read docs</a>
        </div>
      </div>
      <aside class="card">
        <p class="eyebrow">SYSTEM SNAPSHOT</p>
        <div class="grid grid-2">
          <div class="stat"><strong>5</strong><span class="muted">SPA routes</span></div>
          <div class="stat"><strong>0</strong><span class="muted">Framework deps</span></div>
          <div class="stat"><strong>SW</strong><span class="muted">Offline shell</span></div>
          <div class="stat"><strong>100%</strong><span class="muted">Responsive UI</span></div>
        </div>
      </aside>
    </section>
    <section class="grid grid-3">
      <article class="card"><h3>Telemetry</h3><p class="muted">Animated counters, canvas chart, and live event stream.</p></article>
      <article class="card"><h3>Estimator</h3><p class="muted">Token sliders, model rates, totals, and ratio bars.</p></article>
      <article class="card"><h3>Workflow Docs</h3><p class="muted">Interactive SVG nodes, searchable FAQ, and copyable snippets.</p></article>
    </section>
  `);
}

function animateCounter(el, target, suffix = "") {
  const start = performance.now();
  const duration = 900;
  let raf = 0;
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = `${Math.round(target * p).toLocaleString()}${suffix}`;
    if (p < 1) raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
  addCleanup(() => cancelAnimationFrame(raf));
}

function renderDashboard() {
  mount(`
    <section>
      <div class="view-head">
        <div>
          <p class="eyebrow"><span class="pulse"></span>LIVE TELEMETRY</p>
          <h1>Dashboard</h1>
          <p class="lead">Realtime-feeling operational metrics with animated counters, canvas chart, and rolling logs.</p>
        </div>
      </div>
      <div class="grid grid-3">
        <div class="stat"><strong data-count="18420">0</strong><span class="muted">Requests today</span></div>
        <div class="stat"><strong data-count="98" data-suffix="%">0</strong><span class="muted">Success rate</span></div>
        <div class="stat"><strong data-count="247">0</strong><span class="muted">Avg latency ms</span></div>
      </div>
      <div class="grid grid-2" style="margin-top:18px">
        <div class="card canvas-wrap"><h2>Throughput</h2><canvas id="chart" width="900" height="360" aria-label="Live throughput chart"></canvas></div>
        <div class="card"><h2>Event logs</h2><div id="logs" class="log-list" aria-live="polite"></div></div>
      </div>
    </section>
  `, () => {
    document.querySelectorAll("[data-count]").forEach((el) => animateCounter(el, Number(el.dataset.count), el.dataset.suffix || ""));
    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let t = 0;
    function draw() {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(125,249,255,.9)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 12) {
        const y = 180 + Math.sin(x * 0.018 + t) * 70 + Math.cos(x * 0.006 + t * 2) * 28;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "rgba(125,249,255,.08)";
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();
      raf = requestAnimationFrame(draw);
    }
    draw();
    addCleanup(() => cancelAnimationFrame(raf));

    const logs = document.getElementById("logs");
    const messages = ["Policy gate passed", "Model latency normalized", "Cache warmed", "PR checks green", "Webhook received"];
    function addLog() {
      const row = document.createElement("div");
      row.className = "log-item";
      row.innerHTML = `<span class="dot"></span><span><strong>${new Date().toLocaleTimeString()}</strong><br><span class="muted">${messages[Math.floor(Math.random() * messages.length)]}</span></span>`;
      logs.prepend(row);
      while (logs.children.length > 9) logs.lastElementChild.remove();
    }
    addLog();
    const timer = setInterval(addLog, 1800);
    addCleanup(() => clearInterval(timer));
  });
}

function renderCalculator() {
  const saved = JSON.parse(localStorage.getItem("aiFactoryCalc") || "{}");
  const state = {
    model: saved.model || "GPT-4",
    input: saved.input || 120,
    output: saved.output || 40
  };

  mount(`
    <section>
      <p class="eyebrow">COST MODEL</p>
      <h1>Calculator</h1>
      <p class="lead">Estimate blended prompt and completion cost from token volume and selected model.</p>
      <div class="grid grid-2">
        <form class="card form-grid" id="calc-form">
          <div class="field">
            <label for="model">Model</label>
            <select id="model">${Object.keys(models).map((m) => `<option ${m === state.model ? "selected" : ""}>${m}</option>`).join("")}</select>
          </div>
          <div class="field">
            <label for="inputTokens">Input tokens / day (K): <span id="inputLabel">${state.input}</span></label>
            <input id="inputTokens" type="range" min="1" max="1000" value="${state.input}">
          </div>
          <div class="field">
            <label for="outputTokens">Output tokens / day (K): <span id="outputLabel">${state.output}</span></label>
            <input id="outputTokens" type="range" min="1" max="1000" value="${state.output}">
          </div>
        </form>
        <aside class="card">
          <h2 id="total">$0.0000</h2>
          <p class="muted">Estimated daily spend</p>
          <p>Input ratio</p><div class="bar"><span id="inputBar"></span></div>
          <p style="margin-top:18px">Output ratio</p><div class="bar"><span id="outputBar"></span></div>
        </aside>
      </div>
    </section>
  `, () => {
    const model = document.getElementById("model");
    const input = document.getElementById("inputTokens");
    const output = document.getElementById("outputTokens");
    function update() {
      const rate = models[model.value];
      const i = Number(input.value);
      const o = Number(output.value);
      const iCost = i * rate.input;
      const oCost = o * rate.output;
      const total = iCost + oCost;
      document.getElementById("inputLabel").textContent = i;
      document.getElementById("outputLabel").textContent = o;
      document.getElementById("total").textContent = money(total);
      document.getElementById("inputBar").style.width = `${total ? (iCost / total) * 100 : 0}%`;
      document.getElementById("outputBar").style.width = `${total ? (oCost / total) * 100 : 0}%`;
      localStorage.setItem("aiFactoryCalc", JSON.stringify({ model: model.value, input: i, output: o }));
    }
    [model, input, output].forEach((el) => el.addEventListener("input", update));
    update();
  });
}

function renderWorkflow() {
  const nodes = [
    ["issue", "Issue Labeled", "An incoming issue receives automation labels and priority metadata."],
    ["gate", "Policy Gate", "Rules evaluate allowed paths, forbidden files, and risk level."],
    ["code", "Code Synthesis", "The agent drafts constrained vanilla HTML, CSS, and JavaScript changes."],
    ["review", "Review", "Humans or checks validate accessibility, syntax, and scope."],
    ["pr", "PR Created", "A ready branch or patch is packaged for merge."]
  ];
  mount(`
    <section>
      <p class="eyebrow">WORKFLOW + DOCS</p>
      <h1>Workflow</h1>
      <div class="workflow-layout">
        <div class="card">
          <svg class="workflow-svg" viewBox="0 0 920 360" role="img" aria-label="AI Factory workflow">
            <path class="path" d="M110 180 H810"></path>
            ${nodes.map((n, i) => `<g class="node ${i === 0 ? "active" : ""}" data-node="${n[0]}" tabindex="0" transform="translate(${20 + i * 180},130)"><rect rx="18" width="150" height="90"></rect><text x="75" y="48" text-anchor="middle">${n[1]}</text></g>`).join("")}
          </svg>
        </div>
        <aside class="card" id="detail"><h2>${nodes[0][1]}</h2><p class="muted">${nodes[0][2]}</p></aside>
      </div>
      <div class="card" style="margin-top:18px">
        <h2>FAQ / docs</h2>
        <div class="faq-tools">
          <input id="faqSearch" type="search" placeholder="Search docs...">
          <button class="btn" data-copy="npm-free">Copy run command</button>
        </div>
        <div id="faqList">
          <button class="accordion">How is routing handled?</button><div class="panel"><p>Hash routes render view templates without a server.</p><pre>location.hash = "#/dashboard"</pre></div>
          <button class="accordion">Does it need a build?</button><div class="panel"><p>No build. Serve the root or open index.html for basic use.</p><pre>python3 -m http.server 8080</pre></div>
          <button class="accordion">What is cached offline?</button><div class="panel"><p>The service worker caches the app shell, CSS, JS, manifest, and index.</p><pre>caches.open("ai-factory-spa-v2")</pre></div>
        </div>
      </div>
    </section>
  `, () => {
    function select(id) {
      const node = nodes.find((n) => n[0] === id);
      document.querySelectorAll(".node").forEach((n) => n.classList.toggle("active", n.dataset.node === id));
      document.getElementById("detail").innerHTML = `<h2>${node[1]}</h2><p class="muted">${node[2]}</p>`;
      localStorage.setItem("aiFactoryNode", id);
    }
    document.querySelectorAll(".node").forEach((node) => {
      node.addEventListener("click", () => select(node.dataset.node));
      node.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          select(node.dataset.node);
        }
      });
    });
    select(localStorage.getItem("aiFactoryNode") || "issue");

    document.querySelectorAll(".accordion").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.nextElementSibling.classList.toggle("open");
      });
    });
    document.getElementById("faqSearch").addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll(".accordion").forEach((btn) => {
        const panel = btn.nextElementSibling;
        const show = `${btn.textContent} ${panel.textContent}`.toLowerCase().includes(q);
        btn.hidden = !show;
        panel.hidden = !show;
      });
    });
    document.querySelector("[data-copy]").addEventListener("click", () => copyText("python3 -m http.server 8080"));
  });
}

function renderContact() {
  mount(`
    <section>
      <p class="eyebrow">CONTACT</p>
      <h1>Send a signal</h1>
      <div class="grid grid-2">
        <div class="card"><h2>Validation built in.</h2><p class="muted">Accessible labels, visible errors, spinner simulation, and toast feedback.</p></div>
        <form class="card form-grid" id="contact" novalidate>
          <div class="field"><label for="name">Name</label><input id="name" name="name"><span class="error" id="name-error"></span></div>
          <div class="field"><label for="email">Email</label><input id="email" name="email" type="email"><span class="error" id="email-error"></span></div>
          <div class="field"><label for="topic">Topic</label><select id="topic" name="topic"><option value="">Select topic</option><option>Demo</option><option>Pricing</option><option>Automation</option></select><span class="error" id="topic-error"></span></div>
          <div class="field"><label for="message">Message</label><textarea id="message" name="message"></textarea><span class="error" id="message-error"></span></div>
          <label><input id="consent" type="checkbox"> I agree to be contacted.</label><span class="error" id="consent-error"></span>
          <button class="btn primary" id="submitBtn" type="submit">Submit</button>
        </form>
      </div>
    </section>
  `, () => {
    const form = document.getElementById("contact");
    const submitBtn = document.getElementById("submitBtn");
    function setError(id, msg) {
      const el = document.getElementById(id);
      const err = document.getElementById(`${id}-error`);
      if (el) el.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg;
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const errors = {
        name: data.get("name").trim() ? "" : "Name required.",
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get("email")) ? "" : "Valid email required.",
        topic: data.get("topic") ? "" : "Topic required.",
        message: data.get("message").trim().length >= 10 ? "" : "Message must be at least 10 characters.",
        consent: document.getElementById("consent").checked ? "" : "Consent required."
      };
      Object.entries(errors).forEach(([id, msg]) => setError(id, msg));
      if (Object.values(errors).some(Boolean)) {
        showToast("error", "Please fix the highlighted fields.");
        return;
      }
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner" aria-hidden="true"></span> Sending`;
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
        form.reset();
        showToast("success", "Message sent. Demo only; no data left your browser.");
      }, 1100);
    });
  });
}

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

window.addEventListener("hashchange", router);
router();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((err) => console.warn("SW registration failed", err));
  });
}
