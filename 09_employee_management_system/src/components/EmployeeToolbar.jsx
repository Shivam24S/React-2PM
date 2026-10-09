import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const EmployeeToolbar = ({
  search,
  onSearch,
  department,
  onDepartment,
  status,
  onStatus,
  departments = [],
  shown,
  total,
  hasFilters,
  onClear,
}) => {
  return (
    <div className="app-card anim-fade-up">
      <div className="app-card-body d-flex flex-wrap gap-2 align-items-center">
        <div className="toolbar-search">
          <span className="search-icon">
            <SearchIcon />
          </span>
          <Form.Control
            type="search"
            placeholder="Search by name, email or emp id..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search employees"
          />
        </div>

        <Form.Select
          style={{ width: "auto", minWidth: 150 }}
          value={department}
          onChange={(e) => onDepartment(e.target.value)}
          aria-label="Filter by department"
        >
          <option value="all">All departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          style={{ width: "auto", minWidth: 130 }}
          value={status}
          onChange={(e) => onStatus(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="other">Other</option>
        </Form.Select>

        {hasFilters && (
          <Button variant="outline-secondary" size="sm" onClick={onClear}>
            Clear
          </Button>
        )}

        <div className="d-flex align-items-center gap-3 ms-auto flex-wrap">
          <span className="chip">
            Showing <b>{shown}</b> / <b>{total}</b>
          </span>
          <Button as={Link} to="/add" variant="primary">
            <span className="d-inline-flex align-items-center gap-1">
              <PlusIcon /> Add Employee
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeToolbar;
