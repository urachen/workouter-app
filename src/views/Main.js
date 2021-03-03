import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Link, useHistory } from 'react-router-dom';
import { Container, Grid, Avatar, Typography, AppBar, Toolbar, Paper } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import GroupButton from '@components/buttons/GroupButton';
import BasicButton from '@components/buttons/BasicButton';

import RoomIcon from '@material-ui/icons/Room';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SubjectIcon from '@material-ui/icons/Subject';
import ScheduleIcon from '@material-ui/icons/Schedule';

import logo from '@assets/img/logo_white.svg';
const data = {
  today: [
    {
      id: 1,
      name: "健身",
      startTime: "18:00",
      endTime: "20:00",
      place: "MYWAY Fitness",
      memo: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame",
      weightDetails: [
        {
          id: 1,
          part: { title: '上身', id: 1 },
          movement: { title: '深蹲', id: 1 },
          euqipment: { title: '啞鈴', id: 1 },
          times: 10,
          sets: 3
        }
      ]
    },
    {
      id: 2,
      name: "瑜珈",
      startTime: "20:00",
      endTime: "21:00",
      place: "MYWAY Fitness",
      memo: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame",
    }
  ],
  times: {
    total: 4,
    latest: [{
      date: "20201101",
      records: [
        {
          id: 1,
          name: "weight",
          startTime: "18:00",
          endTime: "20:00",
          place: "MYWAY Fitness",
          memo: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame",
          weightDetails: [
            {
              id: 1,
              part: { title: '上身', id: 1 },
              movement: { title: '深蹲', id: 1 },
              euqipment: { title: '啞鈴', id: 1 },
              times: 10,
              sets: 3
            }
          ]
        }, {
          id: 2,
          name: "yoga",
          startTime: "18:00",
          endTime: "20:00",
          place: "MYWAY Fitness",
          memo: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do ame",
        }
      ]
    }
    ]
  },
  mins: {
    total: 305,
    latest: [{}]
  },
  percents: {
    total: 305,
    latest: [{}]
  },

  proportions: [
    {
      title: "weight", rate: "30%",
    }
  ]

}
const Main = props => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);
  const [today, setToday] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleWorkout = () => {
    history.push('/workouter-app/record');
  }
  const handleOpenPopover = (type, e) => {
    setContent(data[type].latest)
    if (type === "times") {
      setTitle("- 近五次運動次數紀錄 -")
    }
    if (type === "mins") {
      setTitle("- 近五次運動時數紀錄 -")
    }
    if (data[type].total !== 0) {
      console.log(e);
      setAnchorEl(e.target);
    }

  }
  const handleChangePanel = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  }
  const formatWeightDetailContent = (detail) => {
    return `${Object.prototype.hasOwnProperty.call(detail, "part") && detail.part !== null ? detail.part.title : ""}
            ${Object.prototype.hasOwnProperty.call(detail, "movement") && detail.movement !== null ? detail.movement.title : ""}
            ${Object.prototype.hasOwnProperty.call(detail, "equipment") && detail.equipment !== null ? detail.equipment.title : ""}
            ${Object.prototype.hasOwnProperty.call(detail, "weight") && detail.weight !== "" ? detail.weight + detail.weightUnit : ""}
            ${Object.prototype.hasOwnProperty.call(detail, "times") && detail.times !== "" ? detail.times + " times" : ""}
            ${Object.prototype.hasOwnProperty.call(detail, "sets") && detail.sets !== "" ? detail.sets + " sets" : ""}
            ${Object.prototype.hasOwnProperty.call(detail, "rest") && detail.rest !== "" ? detail.rest + " min" : ""}
            ${Object.prototype.hasOwnProperty.call(detail, "weightMemo") && detail.weightMemoÎ !== "" ? detail.weightMemo : ""}`
  }
  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? 'simple-popover' : undefined;

  useEffect(() => {
    setToday(data.today)
  }, [])
  return (
    <Fragment>
      <div className="bg-main">
        <Container maxWidth="xl">
          <section>
            <Grid container justify="center">
              <AppBar position="sticky">
                <Toolbar className="header">
                  <Link to="/">
                    <img src={logo} alt="logo" className="logo" />
                  </Link>
                  <Avatar>YC</Avatar>
                </Toolbar>
              </AppBar>
            </Grid>
          </section>
          <section>
            <Container maxWidth="lg">
              <Grid container justify="flex-end" className="chart-btn">
                <Grid item>
                  <GroupButton variant="outlined" color="primary" textList={["WEEK", "MONTH", "YEAR"]} />
                </Grid>
              </Grid>
              <Grid container alignItems="center" justify="center">
                <Grid item lg={4} xs={12} className="chart-item">
                  <div className="circle bg-color-green" onClick={(e) => handleOpenPopover("times", e)}>
                    <Typography variant="h1">
                      {data.times.total}</Typography>
                    <Typography variant="h5">
                      TIMES</Typography>
                  </div>
                </Grid>
                <Grid item lg={4} xs={12} className="chart-item">
                  <div className="circle bg-color-beige" onClick={(e) => handleOpenPopover("mins", e)}>
                    <Typography variant="h1">
                      {data.mins.total}</Typography>
                    <Typography variant="h5">
                      MINS</Typography>
                  </div>
                </Grid>
                <Grid item lg={4} xs={12} className="chart-item">
                  <svg width="200" height="200" className="pie">
                    <circle r="50" cx="100" cy="100" />
                  </svg>
                  <div className="pie-item">
                    <div className="pie-circle-dark"></div>
                    <span>重訓:80%</span>
                    <br />
                    <div className="pie-circle-light"></div>
                    <span>瑜珈:20%</span>

                  </div>
                  {/* <div className="circle bg-color-dark-green" onClick={() => handleOpenPopover(event, "mins")}>
                    <Typography variant="h1">
                      {data.mins.total}</Typography>
                    <Typography variant="h4">
                      MINS</Typography>
                  </div> */}
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item lg={10} xs={10}>

                  <Paper elevation={3} className="main-info" >
                    {today.length === 0 ?
                      <Typography variant="h4">
                        您已經 3 天沒運動了喔！</Typography>
                      :
                      <div className="main-info-today">
                        <Typography variant="h4">TODAY</Typography>

                        {today && today.map(todayItem => (
                          <Accordion key={todayItem.id} expanded={expanded === `${todayItem.name}panel`} onChange={handleChangePanel(`${todayItem.name}panel`)}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>{todayItem.name}</Typography>
                              <Typography className="text-gray">{todayItem.startTime} ~ {todayItem.endTime}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div>
                                {todayItem.startTime && todayItem.endTime ?
                                  <Fragment>
                                    <Typography variant="h6" display="block" gutterBottom><ScheduleIcon /> Time</Typography>
                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>{todayItem.startTime} ~ {todayItem.endTime}</Typography>
                                  </Fragment> : <Fragment></Fragment>
                                }
                                {todayItem.place ?
                                  <Fragment>
                                    <Typography variant="h6" display="block" gutterBottom><RoomIcon /> Place</Typography>
                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>{todayItem.place}</Typography>
                                  </Fragment> : <Fragment></Fragment>
                                }
                                {todayItem.memo ?
                                  <Fragment>
                                    <Typography variant="h6" display="block" gutterBottom><MenuBookIcon /> Memo</Typography>
                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>{todayItem.memo}</Typography>
                                  </Fragment> : <Fragment></Fragment>
                                }
                                {todayItem.weightDetails ?
                                  <Fragment>
                                    <Typography variant="h6" display="block" gutterBottom><SubjectIcon /> Detail</Typography>
                                    <List>
                                      {todayItem.weightDetails && todayItem.weightDetails.map(item => (
                                        <ListItem key={Date.now()}>
                                          <ListItemText
                                            primary={formatWeightDetailContent(item)}
                                          />
                                          <ListItemSecondaryAction>
                                          </ListItemSecondaryAction>
                                        </ListItem>
                                      ))}
                                    </List>
                                  </Fragment> : <Fragment></Fragment>
                                }
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </div>
                    }
                    <BasicButton text="Start Workout"
                      variant="contained"
                      color="primary"
                      disabled={false}
                      size="large"
                      clickButton={handleWorkout}
                    />
                  </Paper>

                </Grid>
              </Grid>
            </Container>
          </section>
        </Container>
      </div >
      <Popover
        id={popoverId}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Fragment>
          <Typography variant="h6" className="text-primary">{title}</Typography>
          {content.map(item =>
            <Fragment>
              <Typography variant="subtitle1" display="block" gutterBottom>{item.date}</Typography>
              {item.records && item.records.map(rItem =>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>{rItem.name}</Typography>
              )}
            </Fragment>
          )}
        </Fragment>
      </Popover>
    </Fragment >
  );

};


export default Main;