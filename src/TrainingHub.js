import React, { useState, useEffect, useMemo } from "react";
import styles from "./TrainingHub.module.css";

const ModuleCard = ({ id, module, isExpanded, onToggle }) => (
  <div id={id} className={styles.moduleCard} aria-expanded={isExpanded}>
    <header
      className={styles.moduleHeader}
      onClick={() => onToggle(module.id)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle(module.id);
      }}
    >
      <h3>{module.title}</h3>
      <i
        className={`fas fa-chevron-down ${
          isExpanded ? styles.moduleIconRotate : styles.moduleIcon
        }`}
      ></i>
    </header>

    <section
      className={`${styles.moduleContent} ${
        isExpanded ? styles.moduleContentOpen : ""
      }`}
    >
      <p>
        <strong>Description:</strong> {module.description}
      </p>
      <p>
        <strong>Key Topics:</strong> {module.keyTopics}
      </p>
      <p>
        <strong>Resources:</strong>
      </p>
      <ul>
        {module.resources.map((res, idx) => (
          <li key={idx}>
            <a href={res.url} target="_blank" rel="noopener noreferrer">
              {res.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

function TrainingHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedModules, setExpandedModules] = useState({});

  const modules = useMemo(
    () => [
      {
        id: "abapContent",
        title: "ABAP (Advanced Business Application Programming)",
        description: "SAP's programming language for custom development.",
        keyTopics: "Syntax, Reports, Forms, Data Dictionary, ALV, BAPIs.",
        resources: [
          {
            title: "SAP ABAP Documentation",
            url: "https://help.sap.com/viewer/product/ABAP_PLATFORM/",
          },
          {
            title: "openSAP ABAP for Beginners",
            url: "https://open.sap.com/courses/abap1",
          },
          {
            title: "Guru99 ABAP Tutorials",
            url: "https://www.guru99.com/free-abap-tutorials.html",
          },
        ],
      },
      {
        id: "ppContent",
        title: "PP (Production Planning)",
        description: "Production Planning and Control module for SAP ERP.",
        keyTopics: "MRP, BOM, Work Centers, Routing, Production Orders.",
        resources: [
          {
            title: "SAP PP Overview",
            url: "https://help.sap.com/viewer/product/SAP_ERP/",
          },
          {
            title: "openSAP Production Planning",
            url: "https://open.sap.com/courses/pp1",
          },
        ],
      },
      {
        id: "mmContent",
        title: "MM (Materials Management)",
        description: "Procurement and inventory management module.",
        keyTopics: "Purchase Orders, Material Master, Inventory, Subcontracting.",
        resources: [
          {
            title: "SAP MM Overview",
            url: "https://help.sap.com/viewer/product/SAP_ERP/",
          },
          { title: "openSAP MM Course", url: "https://open.sap.com/courses/mm1" },
        ],
      },
      {
        id: "sdContent",
        title: "SD (Sales and Distribution)",
        description: "Manages customer orders, shipping, billing, and invoicing.",
        keyTopics: "Sales Orders, Pricing, Delivery, Billing.",
        resources: [
          {
            title: "SAP SD Overview",
            url: "https://help.sap.com/viewer/product/SAP_ERP/",
          },
          { title: "openSAP SD Course", url: "https://open.sap.com/courses/sd1" },
        ],
      },
      {
        id: "ficoContent",
        title: "FI/CO (Financial Accounting & Controlling)",
        description: "Finance and management accounting module.",
        keyTopics:
          "GL, AR, AP, Asset Accounting, Cost Center, Profit Center.",
        resources: [
          {
            title: "SAP FI/CO Overview",
            url: "https://help.sap.com/viewer/product/SAP_ERP/",
          },
          { title: "openSAP FI Course", url: "https://open.sap.com/courses/fi1" },
        ],
      },
      {
        id: "hcmContent",
        title: "HCM (Human Capital Management)",
        description: "Manages employee data, payroll, and HR processes.",
        keyTopics: "Personnel Administration, Payroll, Time Management.",
        resources: [
          {
            title: "SAP HCM Overview",
            url: "https://help.sap.com/viewer/product/SAP_ERP/",
          },
          { title: "openSAP HCM Course", url: "https://open.sap.com/courses/hcm1" },
        ],
      },
      {
        id: "wmContent",
        title: "WM (Warehouse Management)",
        description:
          "Advanced inventory management and warehouse operations.",
        keyTopics: "Storage, Transfer Orders, Inventory Movements.",
        resources: [
          {
            title: "SAP WM Overview",
            url: "https://help.sap.com/viewer/product/SAP_ERP/",
          },
          { title: "openSAP WM Course", url: "https://open.sap.com/courses/wm1" },
        ],
      },
      {
        id: "qmContent",
        title: "QM (Quality Management)",
        description: "Ensures product quality and compliance.",
        keyTopics: "Inspections, Quality Notifications, Audits.",
        resources: [
          {
            title: "SAP QM Overview",
            url: "https://help.sap.com/viewer/product/SAP_ERP/",
          },
          { title: "openSAP QM Course", url: "https://open.sap.com/courses/qm1" },
        ],
      },
      {
        id: "pmContent",
        title: "PM (Plant Maintenance)",
        description: "Manages maintenance planning and execution.",
        keyTopics: "Maintenance Orders, Preventive Maintenance, Notifications.",
        resources: [
          {
            title: "SAP PM Overview",
            url: "https://help.sap.com/viewer/product/SAP_ERP/",
          },
          { title: "openSAP PM Course", url: "https://open.sap.com/courses/pm1" },
        ],
      },
      {
        id: "psContent",
        title: "PS (Project System)",
        description: "Planning, execution, and monitoring of projects.",
        keyTopics: "Project Structures, WBS, Networks, Milestones.",
        resources: [
          {
            title: "SAP PS Overview",
            url: "https://help.sap.com/viewer/product/SAP_ERP/",
          },
          { title: "openSAP PS Course", url: "https://open.sap.com/courses/ps1" },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const initialExpanded = modules.reduce(
      (acc, mod) => ({ ...acc, [mod.id]: false }),
      {}
    );
    setExpandedModules(initialExpanded);
  }, [modules]);

  const toggleModule = (id) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredModules = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return modules.filter(
      (mod) =>
        mod.title.toLowerCase().includes(query) ||
        mod.description.toLowerCase().includes(query) ||
        mod.keyTopics.toLowerCase().includes(query)
    );
  }, [modules, searchQuery]);

  return (
    <div className={styles.container}>
      {/* Scoped Header */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>SAP Training Hub</h1>
        <nav className={styles.headerNav}>
          <a href="#modules">Modules</a>
          <a href="#resources">Resources</a>
          <a href="#top">Top</a>
        </nav>
      </header>

      <main id="top" className={styles.main}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Search Modules</h2>
          <input
            type="search"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.sidebarSearch}
          />
          <nav className={styles.sidebarNav}>
            {filteredModules.map((mod) => (
              <a
                key={mod.id}
                href={`#${mod.id}`}
                className={styles.sidebarLink}
                onClick={(e) => {
                  e.preventDefault();
                  toggleModule(mod.id);
                  document
                    .getElementById(mod.id)
                    .scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {mod.title}
              </a>
            ))}
          </nav>
        </aside>

        <section className={styles.content} id="modules">
          <h2 className={styles.contentTitle}>All SAP Modules</h2>
          {filteredModules.length ? (
            filteredModules.map((mod) => (
              <ModuleCard
                key={mod.id}
                id={mod.id}
                module={mod}
                isExpanded={expandedModules[mod.id]}
                onToggle={toggleModule}
              />
            ))
          ) : (
            <p>No modules found matching your search.</p>
          )}
        </section>
      </main>

      <section id="resources" className={styles.resources}>
        <h2>Useful SAP Learning Resources</h2>
        <ul className={styles.resourcesList}>
          <li>
            <a
              className={styles.resourcesLink}
              href="https://training.sap.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SAP Training & Certification Portal
            </a>
          </li>
          <li>
            <a
              className={styles.resourcesLink}
              href="https://open.sap.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              openSAP Free Online Courses
            </a>
          </li>
          <li>
            <a
              className={styles.resourcesLink}
              href="https://www.sap.com/corporate/en/company/learning.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              SAP Learning Hub
            </a>
          </li>
          <li>
            <a
              className={styles.resourcesLink}
              href="https://community.sap.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SAP Community for Q&A and Discussions
            </a>
          </li>
        </ul>
      </section>

      {/* Scoped Footer */}
      <footer className={styles.footer}>
        <p>© 2024 SAP Training Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default TrainingHub;
