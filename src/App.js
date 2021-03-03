import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from '@views/Login'
import Main from '@views/Main'
import Record from '@views/Record'
import StyleGuide from '@views/StyleGuide';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/workouter-app/">
            <Login />
          </Route>
          <Route path="/workouter-app/login">
            <Login />
          </Route>
          <Route path="/workouter-app/main">
            <Main />
          </Route>
          <Route path="/workouter-app/record">
            <Record />
          </Route>
          <Route path="/workouter-app/StyleGuide">
            <StyleGuide />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
