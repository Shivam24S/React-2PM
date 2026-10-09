import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Modal, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getAllEmployee } from "../api/studentAxios";
import { useToast } from "../ui/ToastContext";
import Loading from "../ui/Loading";
import StatsCards from "./StatsCards";
import EmployeeToolbar from "./EmployeeToolbar";
import EmployeeTable from "./EmployeeTable";

const PAGE_SIZE = 8;

const buildPageItems = (current, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set([1, totalPages, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  const items = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) items.push("…");
    items.push(p);
    prev = p;
  }
  return items;
};

const Employee = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState({ key: "name", dir: "asc" });
  const [page, setPage] = useState(1);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(() => {
    return getAllEmployee()
      .then((data) => {
        setEmployees(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = () => {
    setLoading(true);
    loadData();
  };

  const departments = useMemo(
    () =>
      [...new Set(employees.map((e) => e.department).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b)
      ),
    [employees]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    const list = employees.filter((emp) => {
      const matchesSearch =
        !q ||
        String(emp.name ?? "").toLowerCase().includes(q) ||
        String(emp.email ?? "").toLowerCase().includes(q) ||
        String(emp.emp_Id ?? "").toLowerCase().includes(q);

      const matchesDept = department === "all" || emp.department === department;

      const empStatus = String(emp.status ?? "").trim().toLowerCase();
      const matchesStatus =
        status === "all" ||
        (status === "other" ? empStatus !== "active" && empStatus !== "inactive" : empStatus === status);

      return matchesSearch && matchesDept && matchesStatus;
    });

    const dir = sort.dir === "asc" ? 1 : -1;
    return [...list].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];

      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      if (!isNaN(Number(av)) && !isNaN(Number(bv)) && av !== "" && bv !== "") {
        return (Number(av) - Number(bv)) * dir;
      }
      return String(av ?? "").localeCompare(String(bv ?? "")) * dir;
    });
  }, [employees, search, department, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const hasFilters = search !== "" || department !== "all" || status !== "all";

  const handleSearch = (v) => {
    setSearch(v);
    setPage(1);
  };
  const handleDepartment = (v) => {
    setDepartment(v);
    setPage(1);
  };
  const handleStatus = (v) => {
    setStatus(v);
    setPage(1);
  };
  const clearFilters = () => {
    setSearch("");
    setDepartment("all");
    setStatus("all");
    setPage(1);
  };

  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
    setPage(1);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await deleteEmployee(deleteTarget._id);
      setDeleteTarget(null);
      await loadData();
      showToast(`"${deleteTarget.name}" has been deleted`, "success");
    } catch (err) {
      showToast(err?.message || "Failed to delete employee", "error");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="app-card anim-fade-up" style={{ marginTop: "2rem" }}>
        <div className="state-block">
          <div className="state-icon">!</div>
          <h5>Could not load employees</h5>
          <p>{error.message || "Something went wrong while fetching data."}</p>
          <Button variant="primary" onClick={handleRefresh}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-2">
      <div className="page-header">
        <div>
          <div className="section-kicker">Workforce</div>
          <h1>Employees</h1>
          <p className="subtitle">
            Search, filter and manage your entire team from one place.
          </p>
        </div>
        <Button variant="outline-secondary" onClick={handleRefresh} title="Refresh data">
          <span className="d-inline-flex align-items-center gap-2">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
            </svg>
            Refresh
          </span>
        </Button>
      </div>

      <StatsCards employees={employees} />

      <div className="mt-3">
        <EmployeeToolbar
          search={search}
          onSearch={handleSearch}
          department={department}
          onDepartment={handleDepartment}
          status={status}
          onStatus={handleStatus}
          departments={departments}
          shown={filtered.length}
          total={employees.length}
          hasFilters={hasFilters}
          onClear={clearFilters}
        />
      </div>

      <div className="mt-3">
        {filtered.length === 0 ? (
          <div className="app-card anim-fade-up delay-1">
            <div className="state-block">
              <div className="state-icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </div>
              <h5>{employees.length === 0 ? "No employees yet" : "No matching employees"}</h5>
              <p>
                {employees.length === 0
                  ? "Get started by adding your first employee to the directory."
                  : "Try adjusting your search or clearing the active filters."}
              </p>
              {employees.length === 0 ? (
                <Button variant="primary" onClick={() => navigate("/add")}>
                  Add Employee
                </Button>
              ) : (
                <Button variant="outline-secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <EmployeeTable
              rows={pageRows}
              startIndex={startIndex}
              sort={sort}
              onSort={handleSort}
              onEdit={(emp) => navigate(`/edit/${emp._id}`)}
              onDelete={(emp) => setDeleteTarget(emp)}
            />

            {totalPages > 1 && (
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3 anim-fade-in">
                <span className="text-muted" style={{ fontSize: "0.85rem" }}>
                  Page {currentPage} of {totalPages}
                </span>
                <Pagination className="mb-0">
                  <Pagination.First
                    disabled={currentPage === 1}
                    onClick={() => setPage(1)}
                  />
                  <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => setPage(currentPage - 1)}
                  />
                  {buildPageItems(currentPage, totalPages).map((item, i) =>
                    item === "…" ? (
                      <Pagination.Ellipsis key={`gap-${i}`} disabled />
                    ) : (
                      <Pagination.Item
                        key={item}
                        active={item === currentPage}
                        onClick={() => setPage(item)}
                      >
                        {item}
                      </Pagination.Item>
                    )
                  )}
                  <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => setPage(currentPage + 1)}
                  />
                  <Pagination.Last
                    disabled={currentPage === totalPages}
                    onClick={() => setPage(totalPages)}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        show={Boolean(deleteTarget)}
        onHide={() => !deleting && setDeleteTarget(null)}
        centered
        backdrop={deleting ? "static" : true}
      >
        <Modal.Header closeButton={!deleting}>
          <Modal.Title style={{ fontSize: "1.1rem", fontWeight: 700 }}>
            Delete employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-3 align-items-start">
            <div
              className="d-inline-grid rounded-circle flex-shrink-0"
              style={{
                width: 42,
                height: 42,
                placeItems: "center",
                background: "rgba(239,68,68,0.14)",
                color: "#ef4444",
                fontWeight: 800,
              }}
            >
              !
            </div>
            <div>
              <p className="mb-1">
                Are you sure you want to delete{" "}
                <strong>{deleteTarget?.name}</strong>?
              </p>
              <p className="text-muted mb-0" style={{ fontSize: "0.87rem" }}>
                This will permanently remove their record (Emp ID{" "}
                <span className="mono">{deleteTarget?.emp_Id}</span>). This action
                cannot be undone.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setDeleteTarget(null)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Employee;
