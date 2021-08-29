import React from "react";
import "./loading.css";

export function Loading() {
  return (
    <div>
      <div className="container-fluid flex-grow-1">
        <div className="card empty-state">
          <div className="empty-state-content">
            <div className="spinner-grow text-primary" role="status">
              <span className="sr-only"></span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only"></span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="sr-only"></span>
            </div>
            <div className="spinner-grow text-danger" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
