import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";

import axios from 'axios';

const homeURL = process.env.REACT_APP_HOME_URL;
const apiServer = process.env.REACT_APP_API_SERVER;
const clientID = 64858;

function App(props) {
  return (
    <div>
      <Switch>
        <Route path="/redirect">
          <Redirect/>
        </Route> 
        <Route path="/loggedin">
          <LoggedIn/>
        </Route> 
        <Route path="/">
          <div className="App">
            <h1>
              Hello
            </h1>
          </div>
          <div>
            <button onClick={login}>
              Login to Strava
            </button>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

function LoggedIn(props) {
  let paramVals = getParamValues(window.location.search);
  let userName = paramVals["username"];

  console.log(userName);
  console.log(homeURL);

  return <h1> {userName} </h1>;
}

function Redirect(props) {
  let paramVals = getParamValues(window.location.search);
  let code = paramVals["code"];
  let scope = paramVals["scope"];

  console.log("hello?");

  console.log(apiServer);


  // The below is rendering twice, maybe has something to do with: https://reactjs.org/docs/state-and-lifecycle.html
  axios.get(apiServer, { params: { code: code, scope: scope } })
  .then(res => {
    console.log("done?");
  })

  return <h1>Loading...</h1>
}

function login(){
  let redirectURI = encodeURI(homeURL + "/redirect");
  let authUrl = "http://www.strava.com/oauth/authorize?client_id=" + clientID + "&response_type=code&redirect_uri=" + redirectURI + "&approval_prompt=force&scope=read";

  window.location.replace(authUrl);
}

function getParamValues(authUrl) {
    return authUrl
        .slice(1)
        .split("&")
        .reduce((prev, curr) => {
            const [title, value] = curr.split("=");
            prev[title] = value;
            return prev;
        }, {});
};

export default App;
