import React from "react";
import { useData } from "../context/DataContext";
import DataTable from "../components/DataTable";
import { ENTITIES } from "../config/entities";

interface Props {
  onNavigate: (section: any) => void;
}

export default function Overview({ onNavigate }: Props) {
  const { db } = useData();
  const unread = db.contact_submissions.filter((c) => !c.isRead).length;

  const cards = [
    { num: db.courses.filter((c) => c.isActive).length, lbl: "Active courses" },
    { num: db.blog_posts.filter((b) => b.status === "published").length, lbl: "Published posts" },
    { num: db.success_stories.length, lbl: "Success stories" },
    { num: unread, lbl: "Unread messages" }
  ];

  const recent = db.contact_submissions.slice(-5).reverse();

  return (
    <>
      <div className="ov-grid">
        {cards.map((c) => (
          <div className="ov-card" key={c.lbl}>
            <span className="num">{c.num}</span>
            <span className="lbl">{c.lbl}</span>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h2>Recent contact submissions</h2>
            <p>Latest messages from the Contact page form.</p>
          </div>
          <button className="btn btn-outline" onClick={() => onNavigate("contact_submissions")}>
            View all
          </button>
        </div>
        <DataTable columns={ENTITIES.contact_submissions.columns} rows={recent} onEdit={undefined} onDelete={undefined} />
      </div>
    </>
  );
}