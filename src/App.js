import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from "axios";
import Moment from "react-moment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fuse from "fuse.js";

function App() {
  const [course, setCourse] = useState();
  const [showCourse, setShowCourse] = useState(false);

  const [filter, setFilter] = useState();
  const [showFilter, setShowFilter] = useState(false);

  const [categoryList, setCategoryList] = useState();

  const [value, setValue] = React.useState("All");

  const options = {
    isCaseSensitive: true,
    shouldSort: true,
    minMatchCharLength: 1,
    threshold: 0,
    includeScore: true,
    keys: [
      "category",
      "description",
      "end_date",
      "estimated_workload",
      "instructor_name",
      "start_date",
      "title",
    ],
  };

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
        console.log(JSON.parse(res.data.payload));
        setShowCourse(true);
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
    // console.log(event.target.value);
    const RadioValue = event.target.value;
    if (RadioValue === "All") {
      setShowFilter(false);
      setShowCourse(true);
    } else {
      const radioArray = [...course].filter((item, index) => {
        return item.category === RadioValue;
      });
      // console.log(radioArray);
      setShowCourse(false);
      setFilter(radioArray);
      setShowFilter(true);
    }

    // setCourse(radioArray);
  };

  function handleSearch(event) {
    console.log(event.target.value);
    const searchTerm = event.target.value;
    const fuse = new Fuse(course, options);
    if (!searchTerm) {
      setShowCourse(true);
    } else {
      let result = fuse.search(searchTerm);
      result = result.map((item) => item.item);
      // console.log(result);
      setShowCourse(false);
      setFilter(result);
      setShowFilter(true);
    }
  }

  return (
    <div className="App">
      <header>Course Finder</header>
      <div className="container">
        <Grid container spacing={3}>
          <Grid item sm={12} md={4}>
            <div className="search">
              <Typography variant="h6" gutterBottom>
                Search for keywords
              </Typography>
              <TextField
                onChange={handleSearch}
                id="input-with-icon-textfield"
                label="Filter Courses"
                type="search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* RadioGroup */}
            <div className="radio">
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <Typography variant="h6" gutterBottom>
                    Category
                  </Typography>
                </FormLabel>
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
            </div>
          </Grid>
          <Grid item sm={12} md={8}>
            <div>
              {showCourse && (
                <div>
                  <p
                    style={{
                      margin: "0 0 10px 0",
                      fontWeight: "500",
                      color: "grey",
                    }}
                  >
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
                            start={
                              <Moment format="MMMM D">{item.start_date}</Moment>
                            }
                            end={
                              <Moment format="MMMM D">{item.end_date}</Moment>
                            }
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
              )}

              {/* Filtered courses */}

              {showFilter && (
                <div>
                  <p
                    style={{
                      margin: "0 0 10px 0",
                      fontWeight: "500",
                      color: "grey",
                    }}
                  >
                    {filter && filter.length} courses open for registration
                  </p>
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
                            start={
                              <Moment format="MMMM D">{item.start_date}</Moment>
                            }
                            end={
                              <Moment format="MMMM D">{item.end_date}</Moment>
                            }
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
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
