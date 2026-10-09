import { Col, Row } from "react-bootstrap";

const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n || 0);

const svg = (paths) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths}
  </svg>
);

const UsersIcon = svg(
  <>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </>
);

const CheckIcon = svg(<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />);

const XIcon = svg(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </>
);

const RupeeIcon = svg(
  <>
    <path d="M6 3h12M6 8h12M6 13h4a4 4 0 0 0 0-8H6M6 13l8 8" />
  </>
);

const GridIcon = svg(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </>
);

const STAT_META = [
  {
    key: "total",
    label: "Total Employees",
    icon: UsersIcon,
    tint: "rgba(79,110,247,0.14)",
    color: "#4f6ef7",
    hint: "Full headcount",
  },
  {
    key: "active",
    label: "Active",
    icon: CheckIcon,
    tint: "rgba(16,185,129,0.14)",
    color: "#10b981",
    hint: "Currently working",
  },
  {
    key: "inactive",
    label: "Inactive",
    icon: XIcon,
    tint: "rgba(239,68,68,0.14)",
    color: "#ef4444",
    hint: "On leave / off",
  },
  {
    key: "avgSalary",
    label: "Avg Salary",
    icon: RupeeIcon,
    tint: "rgba(245,158,11,0.16)",
    color: "#f59e0b",
    hint: "Across all employees",
    format: money,
  },
  {
    key: "departments",
    label: "Departments",
    icon: GridIcon,
    tint: "rgba(14,165,233,0.15)",
    color: "#0ea5e9",
    hint: "Unique teams",
  },
];

const computeStats = (employees = []) => {
  const total = employees.length;
  const active = employees.filter(
    (e) => String(e.status).trim().toLowerCase() === "active"
  ).length;
  const salarySum = employees.reduce((sum, e) => sum + (Number(e.salary) || 0), 0);

  return {
    total,
    active,
    inactive: total - active,
    avgSalary: total ? Math.round(salarySum / total) : 0,
    departments: new Set(employees.map((e) => e.department).filter(Boolean)).size,
  };
};

const StatsCards = ({ employees = [] }) => {
  const stats = computeStats(employees);

  return (
    <Row className="g-3">
      {STAT_META.map((stat, i) => (
        <Col key={stat.key} xs={6} md={4} xl className="anim-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
          <div className="app-card stat-card h-100">
            <div className="app-card-body d-flex align-items-center gap-3">
              <div
                className="stat-icon"
                style={{ background: stat.tint, color: stat.color }}
                aria-hidden="true"
              >
                {stat.icon}
              </div>
              <div className="min-w-0">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value mono">
                  {stat.format ? stat.format(stats[stat.key]) : stats[stat.key]}
                </div>
                <div className="stat-hint d-none d-sm-block">{stat.hint}</div>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default StatsCards;
