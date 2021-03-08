import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Link, useHistory } from 'react-router-dom';
import { format, parse, isAfter } from 'date-fns';

import Card from '@components/Card';
import BasicButton from '@components/buttons/BasicButton';
import Calendar from '@components/Calendar';
import Dialog from '@components/Dialog'
import DateTimePicker from '@components/DateTimePicker';
import IconButton from '@components/buttons/IconButton';
import AutoComplete from '@components/AutoComplete'

import { Container, Grid, Avatar, Typography, AppBar, Toolbar } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import ButtonBase from '@material-ui/core/ButtonBase';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import RoomIcon from '@material-ui/icons/Room';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SubjectIcon from '@material-ui/icons/Subject';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles';
import logo from '@assets/img/logo_white.svg';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '-webkit-fill-available'
  }
}));

const workoutList = [
  {
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
      }
    ]

  },
  {
    date: "20201110",
    records: [
      {
        id: 2,
        name: "weight"
      },
      {
        id: 3,
        name: "yoga"
      }
    ]
  }
]
const parts = [
  { title: '全身', id: 1 },
  { title: '上身', id: 2 },
  { title: '下身', id: 3 }
]
const movements = [
  { title: '深蹲', id: 1 },
  { title: '硬舉', id: 2 },
  { title: '划船', id: 3 }
]
const equipments = [
  { title: '啞鈴', id: 1 },
  { title: '槓鈴', id: 2 },
  { title: '壺鈴', id: 3 }
]

const weightUnits = [
  {
    value: 'kg',
    label: 'KG',
  },
  {
    value: 'pond',
    label: 'Pond',
  }
];
// const generate = (element) => {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }
const Record = props => {
  const history = useHistory();
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [openWeightDialog, setOpenWeightDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // const [dense, setDense] = useState(false);
  const [secondary,] = useState(false);
  const [trainType, setTrainType] = useState('');
  const [mode, setMode] = useState('');
  const [record, setRecord] = useState({ formatStartTime: new Date(), formatEndTime: new Date() });
  // const [weightDetails, setWeightDetails] = useState([]);
  const [weightDetailObj, setWeightDetailObj] = useState({ part: null, movement: null, equipment: null, weight: "", weightUnit: 'kg', times: "", sets: "", rest: "", weightMemo: "" });
  const [timeHasError, setTimeHasError] = useState(false);

  const clickDate = (date) => {
    setCurrentDate(date);
  }
  const handleOpenDialog = type => {
    setAnchorEl(null);
    if (type === 'add') {
      setMode('add');
      setRecord({ formatStartTime: new Date(), formatEndTime: new Date() });
    }
    if (type === 'edit') {
      setMode('edit');
      setTrainType(record.name);
      let formatStartTime = parse(format(currentDate, 'yyyy/MM/dd ') + record.startTime, 'yyyy/MM/dd HH:mm', new Date());
      let formatEndTime = parse(format(currentDate, 'yyyy/MM/dd ') + record.endTime, 'yyyy/MM/dd HH:mm', new Date());
      setRecord({ ...record, formatStartTime: formatStartTime, formatEndTime: formatEndTime })
    }
    setWeightDetailObj({ part: null, movement: null, equipment: null, weight: "", weightUnit: 'kg', times: "", sets: "", rest: "", weightMemo: "" });
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTrainType('');
    setTimeHasError(false);
  }
  const handleOpenWeightDialog = () => {
    setOpenWeightDialog(true);
  }
  const handleCloseWeightDialog = () => {
    setOpenWeightDialog(false);
  }
  const handleBack = () => {
    setTrainType('');
    setRecord({ formatStartTime: new Date(), formatEndTime: new Date() });
    setWeightDetailObj({ part: null, movement: null, equipment: null, weight: "", weightUnit: 'kg', times: "", sets: "", rest: "", weightMemo: "" });
  }
  const handleOpenPopover = (r, e) => {
    setAnchorEl(e.target);
    setRecord(r);
  }
  const handleClosePopover = () => {
    setAnchorEl(null);
  }
  const handleClickBaseButton = t => {
    setTrainType(t);
  }
  const handleAddDetail = () => {

    setWeightDetailObj({ id: Date.now(), ...weightDetailObj });
    let details = record.weightDetails === undefined ? [] : record.weightDetails
    details.push(weightDetailObj);
    setRecord({ ...record, weightDetails: details })
  }
  const handleDeleteDetail = (id) => {
    let details = record.weightDetails.filter(item => item.id !== id);
    setRecord({ ...record, weightDetails: details });
  }
  const handleAddDetailList = () => {
    setOpenWeightDialog(false);
  }
  const handleSelect = (id, e) => {
    setWeightDetailObj({ ...weightDetailObj, [id]: e.target.value })
    console.log(weightDetailObj)
  }
  const hanleAutoComplete = (id, newValue) => {
    setWeightDetailObj({ ...weightDetailObj, [id]: newValue })
  }
  const onInput = (id, e) => {
    switch (id) {
      case 'weight':
      case 'weightMemo':
        setWeightDetailObj({ ...weightDetailObj, [id]: e.target.value })
        return;
      case 'place':
      case 'memo':
        setRecord({ ...record, [id]: e.target.value });
        return;
      default:
        return;
    }
  }
  const handleClear = () => {
    setWeightDetailObj({ part: null, movement: null, equipment: null, weight: "", weightUnit: 'kg', times: "", sets: "", rest: "", weightMemo: "" });
  }
  const handleSaveWeight = () => {
    console.log(record);
  }

  const handleChangeStartTime = (newDate) => {
    if (!isAfter(newDate, record.formatEndTime)) {
      setRecord({ ...record, startTime: format(newDate, 'HH:mm'), formatStartTime: newDate });
      setTimeHasError(false);
      return;
    }
    setTimeHasError(true);
  }

  const handleChangeEndTime = (newDate) => {
    if (isAfter(newDate, record.formatStartTime)) {
      setRecord({ ...record, endTime: format(newDate, 'HH:mm'), formatEndTime: newDate });
      setTimeHasError(false);
      return;
    }
    setTimeHasError(true);

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
  const handleBackPrevPage = () => {
    history.push('/workouter-app/main');
  }
  useEffect(() => {
    console.log("useEffect start")
  })
  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? 'simple-popover' : undefined;
  const helperText = timeHasError ? "Start Time must be earlier than End Time" : ""

  let addWorkoutTitle = ''
  let dialogAction;
  let dialogContent;
  if (trainType !== "") {
    if (trainType === 'weight') {
      addWorkoutTitle = `Weight Training - ${format(currentDate, 'LLL / dd').toUpperCase()}`
      dialogContent = <Fragment>
        <Grid container justify="space-between" spacing={1}>
          <Grid item lg={6} xs={12}><DateTimePicker label="Start Time" type="Time" variant="outlined" selectValue={record.formatStartTime} handleDateChange={handleChangeStartTime} helperText={helperText} /></Grid>
          <Grid item lg={6} xs={12}><DateTimePicker label="End Time" type="Time" variant="outlined" selectValue={record.formatEndTime} handleDateChange={handleChangeEndTime} /></Grid>
          <Grid item lg={12} xs={12}><TextField variant="outlined" label="Place" value={record.place} onChange={(e) => onInput('place', e)} className={classes.input} /></Grid>
          <Grid item lg={12} xs={12}><TextField variant="outlined" multiline label="Memo" rows={5} value={record.memo} onChange={(e) => onInput('memo', e)} fullWidth /></Grid>

          <Grid item lg={12}>
            <BasicButton text="Detail"
              variant="contained"
              color="primary"
              disabled={false}
              size="large"
              startIcon="AddIcon"
              clickButton={handleOpenWeightDialog} />
          </Grid>
          {record.weightDetails ?
            <Grid item lg={8} xs={12}>
              <List>
                {record.weightDetails.map(item => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={formatWeightDetailContent(item)}
                      secondary={secondary ? 'Secondary text' : null}
                    />
                    <ListItemSecondaryAction>
                      <IconButton color="primary" icon="DeleteIcon" ariaLabel="delete" className="list-icon-button" clickButton={() => handleDeleteDetail(item.id)} />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid> : <Fragment></Fragment>
          }
        </Grid>
      </Fragment >
      dialogAction = <Fragment>
        <BasicButton text="CANCEL"
          variant="outlined"
          color="primary"
          disabled={false}
          size="large"
          clickButton={handleCloseDialog} />
        <BasicButton text="BACK"
          variant="outlined"
          color="primary"
          disabled={mode === 'edit'}
          size="large"
          clickButton={handleBack} />
        <BasicButton text="SAVE"
          variant="contained"
          color="primary"
          disabled={trainType === '' ? true : false}
          size="large"
          clickButton={handleSaveWeight} />
      </Fragment>
    } else {
      addWorkoutTitle = `Other Training - ${format(currentDate, 'LLL / dd').toUpperCase()}`
      dialogContent = <Fragment>
        <Grid container justify="space-between" spacing={1}>
          <Grid item lg={6} xs={12}><DateTimePicker label="Start Time" type="Time" variant="outlined" selectValue={record.startTime} handleDateChange={handleChangeStartTime} helperText={helperText} /></Grid>
          <Grid item lg={6} xs={12}><DateTimePicker label="End Time" type="Time" variant="outlined" selectValue={record.endTime} handleDateChange={handleChangeEndTime} /></Grid>
          <Grid item lg={12} xs={12}><TextField variant="outlined" label="Place" value={record.place} onChange={(e) => onInput('place', e)} className={classes.input} /></Grid>
          <Grid item lg={12} xs={12}><TextField variant="outlined" multiline label="Memo" rows={5} value={record.memo} onChange={(e) => onInput('memo', e)} fullWidth /></Grid>
        </Grid>
      </Fragment >
      dialogAction = <Fragment>
        <BasicButton text="CANCEL"
          variant="outlined"
          color="primary"
          disabled={false}
          size="large"
          clickButton={handleCloseDialog} />
        <BasicButton text="BACK"
          variant="outlined"
          color="primary"
          disabled={mode === 'edit'}
          size="large"
          clickButton={handleBack} />
        <BasicButton text="SAVE"
          variant="contained"
          color="primary"
          disabled={trainType === '' ? true : false}
          size="large"
          clickButton={handleCloseDialog} />
      </Fragment>
    }
  } else {
    addWorkoutTitle = `Workout - ${format(currentDate, 'LLL / dd').toUpperCase()}`;
    dialogAction = <Fragment>
      <BasicButton text="CANCEL"
        variant="outlined"
        color="primary"
        disabled={false}
        size="large"
        clickButton={handleCloseDialog} />
    </Fragment>
    dialogContent = <Fragment>
      <Typography variant="subtitle1">Please choose a workout type</Typography>
      <div className="wk-type">
        <ButtonBase
          focusRipple
          className="btn-wk-type"
          onClick={() => handleClickBaseButton('weight')}
        >
          <div className="wk-type-content"><FitnessCenterIcon style={{ fontSize: 50 }} /></div>
          <Typography variant="subtitle1">Weight Training</Typography>
        </ButtonBase>
        <ButtonBase
          focusRipple
          className="btn-wk-type"
          onClick={() => handleClickBaseButton('other')}
        >
          <div className="wk-type-content"><DirectionsRunIcon style={{ fontSize: 50 }} /></div>
          <Typography variant="subtitle1">Other Training</Typography>
        </ButtonBase>
      </div>
    </Fragment>
  }
  return (
    <Fragment>
      <div className="bg-main">
        <Container maxWidth="xl">
          <section>
            <AppBar position="sticky">
              <Toolbar className="header">
                <Link to="/">
                  <img src={logo} alt="logo" className="logo" />
                </Link>
                <Avatar>YC</Avatar>
              </Toolbar>
            </AppBar>
            {/* <div className="header">
              <Link to="/main">
                <img src={logo} alt="logo" className="logo" />
              </Link>
              <Avatar>YC</Avatar>
            </div>*/}
          </section>
          <section>
            <Grid container justify="center" spacing={3}>
              <Grid item lg={12} xs={12}>
                <BasicButton text="BACK"
                  variant="text"
                  color="default"
                  disabled={false}
                  startIcon="KeyboardBackspaceIcon"
                  size="large"
                  clickButton={handleBackPrevPage} />
                <Card>
                  <Calendar clickParentDate={clickDate} clickParentDateEvent={(r, e) => handleOpenPopover(r, e)} workoutList={workoutList}>
                    <BasicButton text="NEW WORKOUT"
                      variant="outlined"
                      color="primary"
                      disabled={false}
                      size="large"
                      startIcon="AddIcon"
                      clickButton={() => handleOpenDialog('add')} />
                  </Calendar>
                </Card>
              </Grid></Grid>
          </section>
        </Container>
      </div>
      <Dialog maxWidth={'sm'} fullWidth={true}
        title={addWorkoutTitle}
        openDialog={openDialog}
        actions={dialogAction}
      >
        {dialogContent}
      </Dialog>
      <Dialog maxWidth={'md'} fullWidth={true}
        title='WEIGHT TRAINING - DETAIL'
        openDialog={openWeightDialog}
        actions={<Fragment>
          <BasicButton text="CANCEL"
            variant="outlined"
            color="primary"
            disabled={false}
            size="large"
            clickButton={handleCloseWeightDialog} />
          <BasicButton text="OK"
            variant="contained"
            color="primary"
            disabled={false}
            size="large"
            clickButton={handleAddDetailList} />
        </Fragment>}
      >
        <Fragment>
          <Grid container justify="flex-start" spacing={1}>
            <Grid item lg={3} xs={12}>
              <AutoComplete id="part" list={parts} label="Part" defaultValue={weightDetailObj.part} changeSelect={(newValue) => hanleAutoComplete('part', newValue)} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <AutoComplete id="movement" list={movements} label="Movement" defaultValue={weightDetailObj.movement} changeSelect={(newValue) => hanleAutoComplete('movement', newValue)} />
            </Grid>
            <Grid item lg={3} xs={12}>
              <AutoComplete id="equipment" list={equipments} label="Equipment" defaultValue={weightDetailObj.equipment} changeSelect={(newValue) => hanleAutoComplete('equipment', newValue)} />
            </Grid>
            <Grid item lg={1} xs={6}>
              <TextField variant="outlined" label="Weight" className={classes.input} value={weightDetailObj.weight} onChange={(e) => onInput('weight', e)} />
            </Grid>
            <Grid item lg={2} xs={6}>
              <TextField
                id="weightUnit"
                select
                label="Unit"
                value={weightDetailObj.weightUnit}
                onChange={(e) => handleSelect('weightUnit', e)}
                variant="outlined"
                className={classes.input}
              >
                {weightUnits.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item lg={3} xs={12}>
              <FormControl variant="outlined" fullWidth={true}>
                <InputLabel id="label-times">Times</InputLabel>
                <Select
                  labelId="label-times"
                  id="times"
                  value={weightDetailObj.times}
                  onChange={(e) => handleSelect('times', e)}
                  label="Times"
                >
                  <MenuItem key="none" value="">
                    <em>None</em>
                  </MenuItem>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((value) =>
                    <MenuItem key={value} value={value}>{value}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} xs={12}>
              <FormControl variant="outlined" fullWidth={true}>
                <InputLabel id="label-sets">Sets</InputLabel>
                <Select
                  labelId="label-sets"
                  id="sets"
                  value={weightDetailObj.sets}
                  onChange={(e) => handleSelect('sets', e)}
                  label="Sets"
                >
                  <MenuItem key="none" value="">
                    <em>None</em>
                  </MenuItem>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((value) =>
                    <MenuItem key={value} value={value}>{value}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} xs={12}>
              <FormControl variant="outlined" fullWidth={true}>
                <InputLabel id="label-rest">Rest (min)</InputLabel>
                <Select
                  labelId="label-rest"
                  id="rest"
                  value={weightDetailObj.rest}
                  onChange={(e) => handleSelect('rest', e)}
                  label="Rest"
                >
                  <MenuItem key="none" value="">
                    <em>None</em>
                  </MenuItem>
                  {[5, 15, 30, 45, 60, 90, 120, 150, 180].map((value) =>
                    <MenuItem key={value} value={value}>{value}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField variant="outlined" multiline label="Memo" rows={1} fullWidth value={weightDetailObj.weightMemo} onChange={(e) => onInput('weightMemo', e)} />
            </Grid>
            <Grid item lg={3} xs={12}>
              <BasicButton text="List"
                variant="outlined"
                color="primary"
                disabled={false}
                size="small"
                startIcon="AddIcon"
                clickButton={() => handleAddDetail()} />
              <BasicButton text="Clear"
                variant="outlined"
                color="secondary"
                disabled={false}
                size="small"
                startIcon="ClearIcon"
                clickButton={() => handleClear()} />
            </Grid>
          </Grid>
          {record.weightDetails ?
            <Grid container justify="flex-start" spacing={1}>
              <Grid item lg={8} xs={12}>
                <List>
                  {record.weightDetails && record.weightDetails.map(item => (
                    <ListItem key={item.id}>
                      <ListItemText
                        primary={formatWeightDetailContent(item)}
                        secondary={secondary ? 'Secondary text' : null}
                      />
                      <ListItemSecondaryAction>
                        <IconButton color="primary" icon="DeleteIcon" ariaLabel="delete" className="list-icon-button" clickButton={() => handleDeleteDetail(item.id)} />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid> : <Fragment></Fragment>
          }
        </Fragment >
      </Dialog>
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
        <Typography variant="h5">{`${format(currentDate, 'LLL / dd').toUpperCase()} - ${record.name}`}</Typography>
        {record.startTime && record.endTime ?
          <Fragment>
            <Typography variant="h6" display="block" gutterBottom><ScheduleIcon /> Time</Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>{record.startTime} ~ {record.endTime}</Typography>
          </Fragment> : <Fragment></Fragment>
        }
        {record.place ?
          <Fragment>
            <Typography variant="h6" display="block" gutterBottom><RoomIcon /> Place</Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>{record.place}</Typography>
          </Fragment> : <Fragment></Fragment>
        }
        {record.memo ?
          <Fragment>
            <Typography variant="h6" display="block" gutterBottom><MenuBookIcon /> Memo</Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>{record.memo}</Typography>
          </Fragment> : <Fragment></Fragment>
        }
        {record.weightDetails ?
          <Fragment>
            <Typography variant="h6" display="block" gutterBottom><SubjectIcon /> Detail</Typography>
            <List>
              {record.weightDetails && record.weightDetails.map(item => (
                <ListItem key={Date.now()}>
                  <ListItemText
                    primary={formatWeightDetailContent(item)}
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Fragment> : <Fragment></Fragment>
        }
        <div className="popover-action">
          <BasicButton text="DELETE"
            variant="contained"
            color="secondary"
            disabled={false}
            size="large"
            clickButton={() => handleOpenDialog('edit')} />
          <BasicButton text="EDIT"
            variant="contained"
            color="primary"
            disabled={false}
            size="large"
            clickButton={() => handleOpenDialog('edit')} />
        </div>
      </Popover>
    </Fragment>

  );
};
export default Record;