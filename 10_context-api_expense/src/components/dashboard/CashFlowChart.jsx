import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { useExpense } from "../../context/useExpense";
import { aggregateCashFlowByMonth } from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";

const CashFlowChart = () => {
  const { expenseList, settings } = useExpense();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const rawData = aggregateCashFlowByMonth(expenseList);
  // Take last 6 months for clean dashboard view
  const data = rawData.slice(-6);

  if (data.length === 0) {
    return (
      <div className="card" style={{ height: "100%" }}>
        <div className="card-header">
          <div className="card-title">
            <BarChart3 size={18} />
            <span>Cash Flow Trends</span>
          </div>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">
            <BarChart3 size={24} />
          </div>
          <h3 className="empty-state-title">No Chart Data</h3>
          <p className="empty-state-text">
            Add income and expense transactions to visualize your cash flow history over time.
          </p>
        </div>
      </div>
    );
  }

  // Calculate maximum value for chart scaling
  const maxVal = Math.max(
    ...data.flatMap((d) => [d.income, d.expense]),
    1000,
  );

  const chartHeight = 180;
  const chartWidth = 520;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const barGroupWidth = innerWidth / data.length;
  const individualBarWidth = Math.min(22, (barGroupWidth - 16) / 2);

  return (
    <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="card-header">
        <div>
          <div className="card-title">
            <BarChart3 size={18} />
            <span>Cash Flow (Income vs. Expense)</span>
          </div>
          <div className="card-subtitle">Monthly financial inflow and outflow comparison</div>
        </div>
      </div>

      <div style={{ position: "relative", flex: 1, minHeight: "220px", width: "100%" }}>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = paddingTop + innerHeight * (1 - ratio);
            const val = maxVal * ratio;
            return (
              <g key={ratio}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="var(--border-light)"
                  strokeDasharray={ratio === 0 ? "none" : "3 3"}
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="var(--text-subtle)"
                >
                  {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((item, idx) => {
            const groupX = paddingLeft + idx * barGroupWidth;
            const centerX = groupX + barGroupWidth / 2;

            const incomeHeight = maxVal > 0 ? (item.income / maxVal) * innerHeight : 0;
            const expenseHeight = maxVal > 0 ? (item.expense / maxVal) * innerHeight : 0;

            const incomeY = paddingTop + innerHeight - incomeHeight;
            const expenseY = paddingTop + innerHeight - expenseHeight;

            const isHovered = hoveredIndex === idx;

            return (
              <g
                key={item.key}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Background highlight pill on hover */}
                {isHovered && (
                  <rect
                    x={groupX + 4}
                    y={paddingTop}
                    width={barGroupWidth - 8}
                    height={innerHeight + 20}
                    fill="var(--bg-subtle)"
                    rx="4"
                    opacity="0.6"
                  />
                )}

                {/* Income Bar */}
                <rect
                  x={centerX - individualBarWidth - 2}
                  y={incomeY}
                  width={individualBarWidth}
                  height={Math.max(2, incomeHeight)}
                  fill="var(--income)"
                  rx="3"
                  opacity={isHovered ? 1 : 0.88}
                />

                {/* Expense Bar */}
                <rect
                  x={centerX + 2}
                  y={expenseY}
                  width={individualBarWidth}
                  height={Math.max(2, expenseHeight)}
                  fill="var(--expense)"
                  rx="3"
                  opacity={isHovered ? 1 : 0.88}
                />

                {/* X-axis label */}
                <text
                  x={centerX}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  fontSize="10"
                  fill={isHovered ? "var(--text-main)" : "var(--text-muted)"}
                  fontWeight={isHovered ? "600" : "400"}
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIndex !== null && data[hoveredIndex] && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              padding: "8px 12px",
              boxShadow: "var(--shadow-md)",
              fontSize: "0.8rem",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              pointerEvents: "none",
            }}
          >
            <div style={{ fontWeight: 600, color: "var(--text-main)" }}>
              {data[hoveredIndex].label}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", color: "var(--income)" }}>
              <span>Income:</span>
              <strong>{formatCurrency(data[hoveredIndex].income, settings.currency)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", color: "var(--expense)" }}>
              <span>Expense:</span>
              <strong>{formatCurrency(data[hoveredIndex].expense, settings.currency)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", borderTop: "1px solid var(--border-light)", paddingTop: "4px" }}>
              <span style={{ color: "var(--text-muted)" }}>Net:</span>
              <strong style={{ color: data[hoveredIndex].net >= 0 ? "var(--income)" : "var(--expense)" }}>
                {formatCurrency(data[hoveredIndex].net, settings.currency)}
              </strong>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="chart-legend">
        <span>
          <span className="legend-dot" style={{ backgroundColor: "var(--income)" }} />
          Income
        </span>
        <span>
          <span className="legend-dot" style={{ backgroundColor: "var(--expense)" }} />
          Expense
        </span>
      </div>
    </div>
  );
};

export default CashFlowChart;
