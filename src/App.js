import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from "axios";
import Moment from "react-moment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function App() {
  const [course, setCourse] = useState();
  const [showCourse, setShowCourse] = useState(false);

  const [filter, setFilter] = useState();
  const [showFilter, setShowFilter] = useState(false);

  const [categoryList, setCategoryList] = useState();

  const [value, setValue] = React.useState("All");

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
        setCourse(JSON.parse(res.data.payload));
        setShowCourse(true);
        // console.log(JSON.parse(res.data.payload));
      });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://frontend-hiring.appspot.com/all_categories`,
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
        setCategoryList(JSON.parse(res.data.payload));
      });
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
    const RadioValue = event.target.value;
    if (RadioValue === "All") {
      setShowFilter(false);
      setShowCourse(true);
    } else {
      const radioArray = [...course].filter((item, index) => {
        return item.category === RadioValue;
      });
      console.log(radioArray);
      setShowCourse(false);
      setFilter(radioArray);
      setShowFilter(true);
    }

    // setCourse(radioArray);
  };
  return (
    <div className="App">
      <header>Course Finder</header>
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="Categories"
          name="Category"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="All"
            control={<Radio color="primary" />}
            label="All"
          />

          {categoryList &&
            categoryList.map((item, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={item}
                  control={<Radio color="primary" />}
                  label={item}
                />
              );
            })}
        </RadioGroup>
      </FormControl>
      <div className="container">
        <p style={{ margin: "0 0 10px 0", fontWeight: "500", color: "grey" }}>
          {course && course.length} courses open for registration
        </p>

        {showCourse && (
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
        )}

        {/* Filtered courses */}

        {showFilter && (
          <div className="grid">
            {filter &&
              filter.map((item, index) => {
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
        )}
      </div>
    </div>
  );
}

export default App;
