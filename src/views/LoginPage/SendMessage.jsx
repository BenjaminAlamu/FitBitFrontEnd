import React from "react";
import {Link, Redirect} from 'react-router-dom';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
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

class SendMessage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      error: " ",
      success: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e){
    console.log("Here");
    e.preventDefault();
    let doctor = "Test Doctor";
    let patient = "Sample User"
    let message = document.getElementById('message').value;
    
    const self = this;
        fetch('http://localhost:1337/notification', {
          body:JSON.stringify({
            message,
            doctor,
            patient
        }),
            method: 'POST',
            headers: {
              Accept: "application/json",
                "Content-Type": "application/json",
                // Cache:'no-cache'
            }
        }).then((res) => res.json())
        .then(function(data){
          console.log(data);
            if(data.success === true){
                console.log("Here baby");
                self.setState({ success: true });
            }
            else{
                self.setState({ error: data.message });
            }
            console.log(data);
        } )
        .catch((err)=>console.log(err))    
  }
  componentDidMount() {
    document.title = "FitBit | Send Message";
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    if (this.state.success) {
      return <Redirect to='/details' />
    }
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Material Kit React"
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
                      <h4>Send Message</h4>
                    </CardHeader>
                    <CardBody>
                    <p className = "error">{this.state.error}</p>
                      <CustomInput
                        labelText="Enter message here:"
                        id="message"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "area",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg" onClick={this.handleSubmit}>
                        Send Message
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

export default withStyles(loginPageStyle)(SendMessage);
