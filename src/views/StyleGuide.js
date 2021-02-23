import React, { useState } from 'react';

import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

import Card from '@components/Card';
import BasicButton from '@components/buttons/BasicButton';
import IconButton from '@components/buttons/IconButton';
import GroupButton from '@components/buttons/GroupButton';
import Radio from '@components/Radio';
import Checkbox from '@components/Checkbox';
import DateTimePicker from '@components/DateTimePicker';
import Calendar from '@components/Calendar';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import ButtonBase from '@material-ui/core/ButtonBase';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '-webkit-fill-available'
  },
}));

const time = new Date(2014, 6, 2, 15)
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];
const genderList = [
  {
    value: 'male',
    label: 'Male',
    disabled: false
  },
  {
    value: 'female',
    label: 'Female',
    disabled: false
  },
  {
    value: 'other',
    label: 'Other',
    disabled: true
  }
]
const sportList = [
  {
    label: 'Baseball',
    id: 'baseball',
    checked: true
  },
  {
    label: 'Football',
    id: 'football',
    checked: false
  },
  {
    label: 'Running',
    id: 'running',
    checked: true
  },
]
const workoutList = [
  {
    date: "20201001",
    records: [
      {
        id: 1,
        name: "weight"
      }
    ]

  },
  {
    date: "20201010",
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyleGuide = () => {
  const classes = useStyles();
  const [currency, setCurrency] = useState('EUR');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const clickDate = (date) => {
    setCurrentDate(date);
  }
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  }
  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Card header={<Typography variant="h3">
              Typography
                </Typography>}>
              <Typography variant="h1" component="h2" gutterBottom>
                h1. Heading
                </Typography>
              <Typography variant="h2" gutterBottom>
                h2. Heading
                </Typography>
              <Typography variant="h3" gutterBottom>
                h3. Heading
                </Typography>
              <Typography variant="h4" gutterBottom>
                h4. Heading
                </Typography>
              <Typography variant="h5" gutterBottom>
                h5. Heading
                </Typography>
              <Typography variant="h6" gutterBottom>
                h6. Heading
                </Typography>
              <Typography variant="subtitle1" gutterBottom>
                subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                </Typography>
              <Typography variant="subtitle2" gutterBottom>
                subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                </Typography>
              <Typography variant="body1" gutterBottom>
                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
              <Typography variant="body2" gutterBottom>
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
              <Typography variant="button" display="block" gutterBottom>
                button text
                </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                caption text
                </Typography>
              <Typography variant="overline" display="block" gutterBottom>
                overline text
                </Typography>
              <Box color="primary.main">primary.main</Box>
              <Box color="secondary.main">secondary.main</Box>
              <Box color="error.main">error.main</Box>
              <Box color="warning.main">warning.main</Box>
              <Box color="info.main">info.main</Box>
              <Box color="success.main">success.main</Box>
              <Box color="text.primary">text.primary</Box>
              <Box color="text.secondary">text.secondary</Box>
              <Box color="text.disabled">text.disabled</Box>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12}>
            <Card
              header={<Typography variant="h3">
                Buttons
                </Typography>}>
              <Typography variant="h4" gutterBottom>
                Contained
                </Typography>
              <BasicButton text="Primary"
                variant="contained"
                color="primary"
                disabled={false}
                size="large" />
              <BasicButton text="Secondary"
                variant="contained"
                color="secondary"
                disabled={false}
                size="large" />
              <BasicButton text="Default"
                variant="contained"
                color="default"
                disabled={false}
                size="large" />
              <Typography variant="h4" gutterBottom>
                Outlined
                </Typography>
              <BasicButton text="Primary"
                variant="outlined"
                color="primary"
                disabled={false}
                size="large" />
              <BasicButton text="Secondary"
                variant="outlined"
                color="secondary"
                disabled={false}
                size="large" />
              <BasicButton text="Default"
                variant="outlined"
                color="default"
                disabled={false}
                size="large" />
              <Typography variant="h4" gutterBottom>
                Text
                </Typography>
              <BasicButton text="Primary"
                color="primary"
                disabled={false}
                size="large" />
              <BasicButton text="Secondary"
                color="secondary"
                disabled={false}
                size="large" />
              <BasicButton text="Default"
                color="default"
                disabled={false}
                size="large" />
              <Typography variant="h4" gutterBottom>
                Size
                </Typography>
              <BasicButton text="Large"
                variant="contained"
                color="primary"
                disabled={false}
                size="large" />
              <BasicButton text="Large"
                variant="contained"
                color="secondary"
                disabled={false}
                size="large" />
              <BasicButton text="Small"
                variant="contained"
                color="primary"
                disabled={false}
                size="small" />
              <BasicButton text="Small"
                variant="contained"
                color="secondary"
                disabled={false}
                size="small" />
              <Typography variant="h4" gutterBottom>
                Disabled
                </Typography>
              <BasicButton text="Disabled"
                variant="contained"
                color="primary"
                disabled={true}
                size="large" />
              <BasicButton text="Disabled"
                variant="outlined"
                color="secondary"
                disabled={true}
                size="large" />
              <BasicButton text="Disabled"
                variant="text"
                color="secondary"
                disabled={true}
                size="large" />
              <Typography variant="h4" gutterBottom>
                With Icon
                </Typography>
              <BasicButton text="Save"
                variant="contained"
                color="primary"
                disabled={false}
                size="large"
                startIcon="SaveIcon" />
              <BasicButton text="Delete"
                variant="contained"
                color="secondary"
                disabled={false}
                size="large"
                startIcon="DeleteIcon" />
              <BasicButton text="Add"
                variant="contained"
                color="primary"
                disabled={false}
                size="large"
                startIcon="AddIcon" />
              <BasicButton text="Edit"
                variant="contained"
                color="secondary"
                disabled={false}
                size="large"
                startIcon="EditIcon" />
              <Typography variant="h4" gutterBottom>
                Icon Buttons
                </Typography>
              <IconButton color="primary" icon="EditIcon" ariaLabel="edit" />
              <IconButton color="secondary" icon="AddIcon" ariaLabel="add" />
              <IconButton color="primary" icon="SaveIcon" ariaLabel="save" />
              <IconButton color="secondary" icon="DeleteIcon" ariaLabel="delete" />
              <Typography variant="h4" gutterBottom>
                Group Button
                </Typography>
              <GroupButton color="primary" textList={['week', 'month', 'year']}>
              </GroupButton>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Card header={<Typography variant="h3">Forms</Typography>}>
              <Typography variant="h4" gutterBottom>
                Normal Text Field
                </Typography>
              <Grid container spacing={2}>
                <Grid item lg={2}><TextField id="standard-basic" label="Standard" className={classes.input} /></Grid>
                <Grid item lg={2}>
                  <TextField
                    error
                    id="standard-error-helper-text"
                    label="Error"
                    defaultValue="Hello World"
                    helperText="Incorrect entry."
                  />
                </Grid>
                <Grid item lg={2}><TextField required id="standard-required" label="Required" defaultValue="Hello World" /></Grid>
                <Grid item lg={2}><TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" /></Grid>
                <Grid item lg={2}>
                  <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  /></Grid>
                <Grid item lg={2}>
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /></Grid>
                <Grid item lg={2}><TextField id="outlined-basic" label="Outlined" variant="outlined" className={classes.input} /></Grid>
                <Grid item lg={2}>
                  <TextField
                    error
                    id="outlined-error-helper-text"
                    label="Error"
                    defaultValue="Hello World"
                    helperText="Incorrect entry."
                    variant="outlined"
                  /></Grid>
                <Grid item lg={2}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="outlined"
                  /></Grid>
                <Grid item lg={2}>
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                    variant="outlined"
                  /></Grid>
                <Grid item lg={2}>
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                  /></Grid>
                <Grid item lg={2}>
                  <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  /></Grid>
              </Grid>
              <Typography variant="h4" gutterBottom>
                Multi Text Field
                </Typography>
              <Grid container spacing={2}>
                <Grid item lg={2}><TextField id="standard-basic" multiline label="Standard" /></Grid>
                <Grid item lg={2}><TextField id="outlined-basic" multiline label="Outlined" variant="outlined" /></Grid>
              </Grid>
              <Typography variant="h4" gutterBottom>
                Select Text Field
                </Typography>
              <Grid container spacing={2}>
                <Grid item lg={2}>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    value={currency}
                    onChange={handleChange}
                    helperText="Please select your currency"
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField></Grid>
                <Grid item lg={2}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    value={currency}
                    onChange={handleChange}
                    helperText="Please select your currency"
                    variant="outlined"
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField></Grid>
              </Grid>
              <Typography variant="h4" gutterBottom>
                Radio Group
                </Typography>
              <Radio label="gender" radioList={genderList} horizontal={true} helperText="helperText" hasError={false} />
              <Typography variant="h4" gutterBottom>
                Checkbox
                </Typography>
              <Checkbox label="Sport" checkboxList={sportList} hasError={false} />
              <Typography variant="h4" gutterBottom>
                Date
                </Typography>
              <Grid container spacing={2}>
                <Grid item lg={2}><DateTimePicker label="Date" type="Date" /></Grid>
                <Grid item lg={2}><DateTimePicker label="Time" type="Time" defaultValue={time} /></Grid>
                <Grid item lg={2}><DateTimePicker label="DateTime" type="DateTime" /></Grid>
                <Grid item lg={2}><DateTimePicker label="Date" type="Date" variant="outlined" /></Grid>
                <Grid item lg={2}><DateTimePicker label="Time" type="Time" variant="outlined" /></Grid>
                <Grid item lg={2}><DateTimePicker label="DateTime" type="DateTime" variant="outlined" /></Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12}>
            <Card header={<Typography variant="h3">Calendar</Typography>}>
              <span>{format(new Date(currentDate), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}</span>
              <Calendar clickParentDate={clickDate} clickParentDateEvent={handleOpenDialog} workoutList={workoutList}>
                <BasicButton text="New Workout"
                  variant="outlined"
                  color="primary"
                  disabled={false}
                  size="large"
                  startIcon="AddIcon"
                  clickButton={handleOpenDialog} />
              </Calendar>
            </Card>
          </Grid>
        </Grid>
        <Dialog
          fullWidth={true}
          TransitionComponent={Transition}
          maxWidth={'sm'}
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <h4> {`+ Add Workout - ${format(currentDate, 'LLL / dd')}`}</h4>

          </DialogTitle>
          <Divider />
          <DialogContent>
            {/* <DialogContentText> */}
            <div>
              <div className="dialog-content">Please choose workout type</div>
              <div className="wk-type">
                <ButtonBase
                  focusRipple
                  className="btn-wk-type"
                >
                  <div className="wk-type-content"><FitnessCenterIcon style={{ fontSize: 50 }} /></div>
                  <span>Weight Training</span>
                </ButtonBase>
                <ButtonBase
                  focusRipple
                  className="btn-wk-type"
                >
                  <div className="wk-type-content"><DirectionsRunIcon style={{ fontSize: 50 }} /></div>
                  <span>Other Training</span>
                </ButtonBase>
              </div>
            </div>
            {/* </DialogContentText> */}
          </DialogContent>
          <Divider />
          <DialogActions>
            <BasicButton text="CANCEL"
              variant="outlined"
              color="secondary"
              disabled={false}
              size="large"
              clickButton={handleCloseDialog} />
            <BasicButton text="NEXT"
              variant="contained"
              color="secondary"
              disabled={false}
              size="large" />
          </DialogActions>
        </Dialog>
      </Container >
    </div >
  );

}
// StyleGuide.propTypes = {
//     params: React.PropTypes.object,
//   };

export default StyleGuide;
