import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from "axios";
import Moment from "react-moment";

function App() {
  const [course, setCourse] = useState();

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://frontend-hiring.appspot.com/all_courses`,
        {
          params: {
            secret: "HelloMars",
          },
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
      .then((res) => {
        console.log(JSON.parse(res.data.payload));
        setCourse(JSON.parse(res.data.payload));
      });
  }, []);

  return (
    <div className="App">
      <header>Course Finder</header>
      <div className="container">
        <p style={{ margin: "0 0 10px 0", fontWeight: "500", color: "grey" }}>
          {course && course.length} courses open for registration
        </p>

        <div className="grid">
          {course &&
            course.map((item, index) => {
              return (
                <Card
                  key={index}
                  title={item.title}
                  instructor={item.instructor_name}
                  description={item.description}
                  registration={
                    new Date() < item.start_date
                      ? `Pre Registration`
                      : item.start_date < new Date() &&
                        new Date() < item.end_date
                      ? `Ongoing`
                      : `Completed`
                  }
                  start={<Moment format="MMMM D">{item.start_date}</Moment>}
                  end={<Moment format="MMMM D">{item.end_date}</Moment>}
                  duration={
                    <Moment diff={item.start_date} unit="weeks">
                      {item.end_date}
                    </Moment>
                  }
                  workload={item.estimated_workload}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
