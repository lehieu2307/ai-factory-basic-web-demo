(function () {
  "use strict";

  const statusLabels = {
    todo: "To do",
    progress: "In progress",
    done: "Done"
  };

  let state = {
    tasks: []
  };

  const refs = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    refs.root = document.documentElement;
    refs.themeToggle = document.getElementById("themeToggle");
    refs.themeIcon = document.getElementById("themeIcon");
    refs.themeLabel = document.getElementById("themeLabel");
    refs.navButtons = Array.from(document.querySelectorAll("[data-tab]"));
    refs.panels = Array.from(document.querySelectorAll("[data-panel]"));
    refs.metricsGrid = document.getElementById("metricsGrid");
    refs.analyticsGrid = document.getElementById("analyticsGrid");
    refs.logsList = document.getElementById("logsList");
    refs.taskColumns = document.getElementById("taskColumns");
    refs.taskForm = document.getElementById("taskForm");
    refs.taskTitle = document.getElementById("taskTitle");
    refs.taskStatus = document.getElementById("taskStatus");
    refs.taskPriority = document.getElementById("taskPriority");

    if (!window.DashboardData) {
      console.error("DashboardData missing");
      return;
    }

    state.tasks = window.DashboardData.tasks.map((task) => ({ ...task }));

    initTheme();
    renderMetrics();
    renderAnalytics();
    renderLogs();
    renderTasks();
    bindEvents();
  }

  function bindEvents() {
    refs.navButtons.forEach((button) => {
      button.addEventListener("click", () => selectTab(button.dataset.tab));
    });

    refs.themeToggle.addEventListener("click", toggleTheme);

    refs.taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addTask();
    });
  }

  function initTheme() {
    const saved = localStorage.getItem("dashboard-theme");
    const theme = saved || "dark";
    setTheme(theme);
  }

  function toggleTheme() {
    setTheme(refs.root.dataset.theme === "light" ? "dark" : "light");
  }

  function setTheme(theme) {
    refs.root.dataset.theme = theme;
    localStorage.setItem("dashboard-theme", theme);
    refs.themeIcon.textContent = theme === "light" ? "☀️" : "🌙";
    refs.themeLabel.textContent = theme === "light" ? "Light" : "Dark";
  }

  function selectTab(tab) {
    refs.navButtons.forEach((button) => {
      const selected = button.dataset.tab === tab;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
    });

    refs.panels.forEach((panel) => {
      const selected = panel.dataset.panel === tab;
      panel.classList.toggle("is-active", selected);
      panel.hidden = !selected;
    });
  }

  function renderMetrics() {
    assertNode(refs.metricsGrid, "metricsGrid");
    refs.metricsGrid.replaceChildren();

    window.DashboardData.metrics.forEach((metric) => {
      const card = document.createElement("article");
      card.className = "metric-card";

      const label = document.createElement("div");
      label.className = "metric-card__label";
      label.textContent = metric.label;

      const value = document.createElement("div");
      value.className = "metric-card__value";
      value.textContent = metric.value;

      const delta = document.createElement("div");
      delta.className = "metric-card__delta";
      delta.textContent = metric.delta;

      card.append(label, value, delta);
      refs.metricsGrid.append(card);
    });
  }

  function renderAnalytics() {
    assertNode(refs.analyticsGrid, "analyticsGrid");
    refs.analyticsGrid.replaceChildren();

    window.DashboardData.analytics.forEach((item) => {
      const card = document.createElement("article");
      card.className = "analytics-card";

      const label = document.createElement("div");
      label.className = "analytics-card__label";
      label.textContent = item.label;

      const value = document.createElement("div");
      value.className = "analytics-card__value";
      value.textContent = item.value;

      const bar = document.createElement("div");
      bar.className = "analytics-card__bar";

      const fill = document.createElement("span");
      fill.style.width = `${Math.max(0, Math.min(100, item.progress))}%`;

      bar.append(fill);
      card.append(label, value, bar);
      refs.analyticsGrid.append(card);
    });
  }

  function renderLogs() {
    assertNode(refs.logsList, "logsList");
    refs.logsList.replaceChildren();

    window.DashboardData.logs.forEach((log) => {
      const item = document.createElement("article");
      item.className = "log-item";

      const time = document.createElement("div");
      time.className = "log-item__time";
      time.textContent = log.time;

      const message = document.createElement("p");
      message.className = "log-item__message";
      message.textContent = log.message;

      const level = document.createElement("div");
      level.className = `log-item__level log-item__level--${log.level}`;
      level.textContent = log.level;

      item.append(time, message, level);
      refs.logsList.append(item);
    });
  }

  function renderTasks() {
    assertNode(refs.taskColumns, "taskColumns");
    refs.taskColumns.replaceChildren();

    Object.entries(statusLabels).forEach(([status, label]) => {
      const tasks = state.tasks.filter((task) => task.status === status);

      const column = document.createElement("section");
      column.className = "kanban-column";

      const header = document.createElement("div");
      header.className = "kanban-column__header";

      const title = document.createElement("h2");
      title.className = "kanban-column__title";
      title.textContent = label;

      const count = document.createElement("span");
      count.className = "kanban-column__count";
      count.textContent = String(tasks.length);

      const cards = document.createElement("div");
      cards.className = "kanban-column__cards";

      tasks.forEach((task) => cards.append(createTaskCard(task)));

      header.append(title, count);
      column.append(header, cards);
      refs.taskColumns.append(column);
    });
  }

  function createTaskCard(task) {
    const card = document.createElement("article");
    card.className = "task-card";

    const title = document.createElement("h3");
    title.className = "task-card__title";
    title.textContent = task.title;

    const meta = document.createElement("div");
    meta.className = "task-card__meta";

    const status = document.createElement("span");
    status.className = "badge";
    status.textContent = statusLabels[task.status] || task.status;

    const priority = document.createElement("span");
    priority.className = `badge badge--${task.priority}`;
    priority.textContent = task.priority;

    meta.append(status, priority);
    card.append(title, meta);

    return card;
  }

  function addTask() {
    const title = refs.taskTitle.value.trim();

    if (!title) {
      refs.taskTitle.focus();
      return;
    }

    state.tasks.push({
      id: `task-${Date.now()}`,
      title,
      status: refs.taskStatus.value || "todo",
      priority: refs.taskPriority.value || "normal"
    });

    refs.taskForm.reset();
    renderTasks();
  }

  function assertNode(node, name) {
    if (!node) {
      console.error(`Required mount node missing: ${name}`);
    }
  }
})();
