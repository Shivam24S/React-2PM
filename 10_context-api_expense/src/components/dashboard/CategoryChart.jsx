import { useState } from "react";
import { PieChart as PieIcon } from "lucide-react";
import { useExpense } from "../../context/useExpense";
import { aggregateCategorySpending } from "../../utils/calculations";
import { formatCurrency, formatPercent } from "../../utils/formatters";

const CategoryChart = () => {
  const { expenseList, settings } = useExpense();
  const [hoveredCat, setHoveredCat] = useState(null);

  const { total, categories } = aggregateCategorySpending(expenseList);

  if (categories.length === 0 || total === 0) {
    return (
      <div className="card" style={{ height: "100%" }}>
        <div className="card-header">
          <div className="card-title">
            <PieIcon size={18} />
            <span>Expense by Category</span>
          </div>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">
            <PieIcon size={24} />
          </div>
          <h3 className="empty-state-title">No Expense Data</h3>
          <p className="empty-state-text">
            Add Debit transactions to see your category spending breakdown.
          </p>
        </div>
      </div>
    );
  }

  // SVG Donut geometry calculations
  const size = 180;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  const displayCategory = hoveredCat || categories[0];

  return (
    <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="card-header">
        <div>
          <div className="card-title">
            <PieIcon size={18} />
            <span>Category Spending</span>
          </div>
          <div className="card-subtitle">Breakdown of Debit transactions</div>
        </div>
      </div>

      <div className="donut-chart-wrapper">
        <div style={{ position: "relative", width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="var(--bg-subtle)"
              strokeWidth={strokeWidth}
            />

            {/* Category Segment Arcs */}
            {categories.map((cat) => {
              const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
              accumulatedPercent += cat.percentage;

              const isHovered = hoveredCat?.id === cat.id;

              return (
                <circle
                  key={cat.id}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={cat.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  transform={`rotate(-90 ${center} ${center})`}
                  style={{
                    cursor: "pointer",
                    transition: "stroke-width var(--transition-fast)",
                  }}
                  onMouseEnter={() => setHoveredCat(cat)}
                  onMouseLeave={() => setHoveredCat(null)}
                />
              );
            })}
          </svg>

          {/* Center Text inside Donut */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                maxWidth: "100px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {hoveredCat ? hoveredCat.label : "Total Spent"}
            </span>
            <span
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-main)",
              }}
            >
              {formatCurrency(hoveredCat ? hoveredCat.amount : total, settings.currency)}
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: displayCategory.color,
              }}
            >
              {hoveredCat ? formatPercent(hoveredCat.percentage) : `${categories.length} categories`}
            </span>
          </div>
        </div>

        {/* Legend list of top 4 categories */}
        <div className="donut-legend-list">
          {categories.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              className="donut-legend-item"
              onMouseEnter={() => setHoveredCat(cat)}
              onMouseLeave={() => setHoveredCat(null)}
              style={{
                backgroundColor: hoveredCat?.id === cat.id ? "var(--bg-subtle)" : "transparent",
              }}
            >
              <div className="donut-legend-label">
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: cat.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontWeight: 500 }}>{cat.label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--text-muted)" }}>
                  {formatCurrency(cat.amount, settings.currency)}
                </span>
                <span className="badge badge-neutral" style={{ fontSize: "0.7rem" }}>
                  {formatPercent(cat.percentage)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
