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
          <h5 style={{ margin: "6px 0 0 0" }} className="instructor">
            {props.instructor}
          </h5>
        </div>
      </div>
      <div className="card-body">
        <ErrorOutlineIcon style={{ marginLeft: "0.5rem", color: "grey" }} />
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></p>
      </div>
      <div className="card-footer">
        <DateRangeIcon style={{ marginLeft: "0.5rem", color: "grey" }} />
        <div className="footer-info">
          <h5
            style={{ margin: "0 0 2px 0", color: "grey" }}
            className="registration"
          >
            {props.registration}
          </h5>
          <div className="full-date">
            <span>{props.start}</span> - <span>{props.end}</span>
          </div>
          <div className="duration">
            <span>{props.duration}</span> week course,{" "}
            <span>{props.workload}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
