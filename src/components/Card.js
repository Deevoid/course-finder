import React from "react";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

export default function Card() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="avatar" />
        <div className="info">
          <p className="title">Course 1</p>
          <p className="instructor">Prof 1</p>
        </div>
      </div>
      <div className="card-body">
        <ErrorOutlineIcon />
        <p className="description">!Lorem asdf asdf</p>
      </div>
      <div className="card-footer">
        <DateRangeIcon />
        <div className="footer-info">
          <p className="registration">Reg</p>
          <p className="full-date">Full date</p>
          <p className="duration">Duration</p>
        </div>
      </div>
    </div>
  );
}
