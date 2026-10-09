import { Button, Table } from "react-bootstrap";

const EditIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
  </svg>
);

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "?";

const statusMeta = (status = "") => {
  const s = status.trim().toLowerCase();
  if (s === "active") return { label: "Active", cls: "badge-active" };
  if (s === "inactive") return { label: "Inactive", cls: "badge-inactive" };
  return { label: status || "—", cls: "badge-other" };
};

const SortableTh = ({ label, sortKey, sort, onSort }) => {
  const active = sort.key === sortKey;
  return (
    <th
      scope="col"
      className={`sortable-th ${active ? "sorted" : ""} ${active && sort.dir === "desc" ? "desc" : ""}`}
      onClick={() => onSort(sortKey)}
      aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
    >
      {label}
      <span className="sort-caret">▲</span>
    </th>
  );
};

const EmployeeTable = ({ rows, startIndex, sort, onSort, onEdit, onDelete }) => {
  return (
    <div className="table-card anim-fade-up delay-1">
      <div className="table-responsive" style={{ maxHeight: 640 }}>
        <Table className="app-table" hover>
          <thead>
            <tr>
              <th scope="col">#</th>
              <SortableTh label="Name" sortKey="name" sort={sort} onSort={onSort} />
              <SortableTh label="Emp ID" sortKey="emp_Id" sort={sort} onSort={onSort} />
              <th scope="col">Designation</th>
              <th scope="col">Department</th>
              <SortableTh label="Salary" sortKey="salary" sort={sort} onSort={onSort} />
              <th scope="col">Status</th>
              <th scope="col">Mobile</th>
              <th scope="col" className="text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((emp, i) => {
              const st = statusMeta(emp.status);

              return (
                <tr key={emp._id}>
                  <td className="mono text-muted">{startIndex + i + 1}</td>
                  <td>
                    <div className="emp-cell">
                      <span className="emp-avatar">{getInitials(emp.name)}</span>
                      <span>
                        <span className="emp-name d-block">{emp.name}</span>
                        <span className="emp-sub">{emp.email}</span>
                      </span>
                    </div>
                  </td>
                  <td className="mono">{emp.emp_Id}</td>
                  <td>{emp.designation}</td>
                  <td>
                    <span className="chip">{emp.department}</span>
                  </td>
                  <td className="mono fw-semibold">{inr.format(Number(emp.salary) || 0)}</td>
                  <td>
                    <span className={`badge-status ${st.cls}`}>{st.label}</span>
                  </td>
                  <td className="mono">{emp.mobile}</td>
                  <td className="text-end">
                    <div className="d-inline-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon"
                        onClick={() => onEdit(emp)}
                        aria-label={`Edit ${emp.name}`}
                        title="Edit"
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="btn-icon"
                        onClick={() => onDelete(emp)}
                        aria-label={`Delete ${emp.name}`}
                        title="Delete"
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeTable;
