import React from "react";
import {Redirect, Link} from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockOutline from "@material-ui/icons/LockOutline";
import People from "@material-ui/icons/People";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      error: " ",
      login: false
    }
    this.handleLogin = this.handleLogin.bind(this);
  }
  
  handleLogin(e){
    console.log("Here");
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    const self = this;
        fetch('http://localhost:1337/login', {
            
            method: 'POST',
            // credentials: "include",
            body:JSON.stringify({
                username,
                password
            }),
            headers: {
              Accept: "application/json",
                "Content-Type": "application/json",
                // Cache:'no-cache'
            }
        }).then((res) => res.json())
        .then(function(data){
          console.log(data);
            if(data.success === true){
              self.setState({ login: true });
            }
            else{
                self.setState({ error: data.message });
            }
            console.log(data);
        } )
        .catch((err)=>console.log(err))    
  }
  componentDidMount() {
    document.title = "FitBit | Login";
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    if (this.state.login) {
      return <Redirect to='/dashboard' />
    }
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Login"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} >
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                    </CardHeader>
                    <CardBody>
                    <p className = "error">{this.state.error}</p>
                      <CustomInput
                        labelText="Username"
                        id="username"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOutline
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg" onClick={this.handleLogin}>
                        Login
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
