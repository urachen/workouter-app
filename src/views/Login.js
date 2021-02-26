import React, { useState, Fragment } from 'react';
import '@assets/css/style.css';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import BasicButton from '@components/buttons/BasicButton';

import { makeStyles } from '@material-ui/core/styles';
import logo from '@assets/img/logo_black.svg';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '-webkit-fill-available'
  }
}));

const Login = props => {
  const classes = useStyles();
  const [isForgot, setForgot] = useState(false);
  const [isSignUp, setSignUp] = useState(false);

  const changeForgot = () => {
    setForgot(true);
    setSignUp(false);
  }
  const changeSignIn = () => {
    setForgot(false);
    setSignUp(false);
  }
  const changeSignUp = () => {
    setSignUp(true);
    setForgot(false);
  }
  const handleSignIn = () => {
    console.log('sign in');
    props.history.push('/Main');
  }
  let board = null;
  if (isForgot === false && isSignUp === false) {
    board = (
      <Fragment>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Email" variant="outlined" className={classes.input} />
          <TextField id="outlined-basic" type="password" label="Password" variant="outlined" className={classes.input} />
        </form>
        <Typography variant="subtitle2"  align="right" display="block" gutterBottom>
          <a href="/#" className="link" onClick={changeForgot}>Forgot Password?</a>
        </Typography>
        <BasicButton text="Sign In"
          variant="contained"
          color="primary"
          disabled={false}
          defaultMargin={0}
          size="large"
          fullWidth={true} Î
          clickButton={handleSignIn}
        />
        {/* <Link to="StyleGuide">
          <div>點選跳轉到Page1</div>
        </Link> */}
        <Typography variant="subtitle1" align="center" gutterBottom className="text">
          Don’t have an account ?<br/><a href="/#" className="link" onClick={changeSignUp}> Sign Up </a>Now!</Typography>
      </Fragment>
    );
  }
  if (isForgot) {
    board = (
      <Fragment>
        <Typography variant="h5" align="center" gutterBottom className="text">
          <span>- Reset Your Password -</span>
        </Typography>
        <Typography variant="subtitle1" align="left" gutterBottom className="text">
          <span>Enter your user account's verified email address and we will send you a password reset link.</span>
        </Typography>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Email" variant="outlined" className={classes.input} />
        </form>

        <BasicButton text="Send Email"
          variant="contained"
          color="primary"
          disabled={false}
          defaultMargin={0}
          size="large"
          fullWidth={true}
        />
        <Typography variant="subtitle1" align="center" gutterBottom className="text">
          <a href="/#" className="link" onClick={changeSignIn}> Sign In </a> / <a href="/#" className="link" onClick={changeSignUp}> Sign Up </a></Typography>
      </Fragment>
    )
  }
  if (isSignUp) {
    board = (
      <Fragment>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Name" variant="outlined" className={classes.input} />
          <TextField id="outlined-basic" label="Email" variant="outlined" className={classes.input} />
          <TextField id="outlined-basic" type="password" label="Password" variant="outlined" className={classes.input} />
          <TextField id="outlined-basic" type="password" label="Password Again" variant="outlined" className={classes.input} />
        </form>
        <BasicButton text="Sign Up"
          variant="contained"
          color="primary"
          disabled={false}
          defaultMargin={0}
          size="large"
          fullWidth={true}
        />
        <Typography variant="subtitle1" align="center" gutterBottom className="text">
          Already have an account? <a href="/#" className="link" onClick={changeSignIn}> Sign In </a></Typography>
      </Fragment >
    )

  }
  return (
    <div>
      <div className="bg-login">
        <Container maxWidth="lg">
          <Grid container justify="center" spacing={3}>
            <Grid item lg={4} sm={10} xs={10}>
              <div className="board-login">
                <img src={logo} alt="logo" className="logo logo-login"></img>
                {board}
              </div>
            </Grid></Grid>
        </Container>
        <Container maxWidth="lg" className="board-copyright">
          <Grid container justify="center">
            <Grid item lg={4} sm={10} xs={10}>
              <Typography variant="subtitle1" align="center" gutterBottom className="text-copyright">
                COPYRIGHT © 2021 Workouter. ALL RIGHTS RESERVED.</Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div >
  );
};


export default Login;