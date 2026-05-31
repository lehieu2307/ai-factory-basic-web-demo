window.DashboardData = {
  metrics: [
    { label: "Revenue", value: "$128.4K", delta: "+12.8%" },
    { label: "Active runs", value: "342", delta: "+7.2%" },
    { label: "Latency", value: "184ms", delta: "-18.1%" },
    { label: "Success rate", value: "99.2%", delta: "+2.4%" }
  ],
  tasks: [
    { id: "task-1", title: "Tune prompt routing", status: "todo", priority: "high" },
    { id: "task-2", title: "Review analytics export", status: "todo", priority: "normal" },
    { id: "task-3", title: "Deploy cache warmer", status: "progress", priority: "high" },
    { id: "task-4", title: "QA mobile layouts", status: "progress", priority: "normal" },
    { id: "task-5", title: "Publish operator notes", status: "done", priority: "low" }
  ],
  logs: [
    { time: "09:42", level: "info", message: "Model gateway warmed successfully." },
    { time: "10:08", level: "warn", message: "Queue depth exceeded soft threshold." },
    { time: "10:19", level: "info", message: "Autoscaler added two workers." },
    { time: "10:31", level: "error", message: "Retry budget consumed for legacy endpoint." },
    { time: "10:46", level: "info", message: "Nightly analytics snapshot completed." }
  ],
  analytics: [
    { label: "Token efficiency", value: "87%", progress: 87 },
    { label: "Automation coverage", value: "74%", progress: 74 },
    { label: "User satisfaction", value: "92%", progress: 92 },
    { label: "Cost target", value: "68%", progress: 68 }
  ]
};
