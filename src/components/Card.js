import React from "react";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="avatar" />
        <div className="info">
          <p className="title">{props.title}</p>
          <p className="instructor">{props.instructor}</p>
        </div>
      </div>
      <div className="card-body">
        <ErrorOutlineIcon />
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></p>
      </div>
      <div className="card-footer">
        <DateRangeIcon />
        <div className="footer-info">
          <p className="registration">{props.registration}</p>
          <div className="full-date">
            <span>{props.start}</span> - <span>{props.end}</span>
          </div>
          <div className="duration">
            <span>{props.duration}</span> week course,
            <span>{props.workload}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
