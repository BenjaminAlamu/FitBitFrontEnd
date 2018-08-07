import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from "components/CustomButtons/Button.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import tabsStyle from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import {Link, Redirect} from "react-router-dom";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      selectedOption: "Admin",
      list : []
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }
  handleOptionChange (e) {
      this.setState({selectedOption: e.target.value});
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  componentWillMount(){
    console.log("Here");
    var id = localStorage.getItem('userid');

    const self = this;
    fetch('http://localhost:1337/view', {
        headers: {
          method: 'POST',
            // 'Authorization': this.getToken(),
            "Content-Type": "application/json"
        }}).then((res) => res.json())
    .then(function(data){
        // if(data.tokenNotFound == true){
        //     self.setState({tokenNotFound :true})
        // }
        console.log(data);
        self.setState({list : data},() => console.log(self.state.list))
        console.log(self.state.list);
        
    }).catch((err)=>console.log(err))
}

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
              brand="Heart Rate Checker"
              color="primary"
              rightLinks={
                <List className={classes.list}>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink + " " + classes.navLinkActive}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      {/* <Explore className={classes.icons} />  */}
                      Log Out
                    </Button>
                  </ListItem>
                </List>
              }
            />
          <div id="nav-tabs">
            <h4>Here are your patients</h4>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Name Surname",
                      // tabIcon: Face,
                      tabContent: (
                        <div className={classes.textCenter}>
                          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, porro!</p>
                          <Button simple color="rose" size="lg">View Data</Button>
                          <Button simple color="info" size="lg">Send Message</Button>
                        </div>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(DashboardPage);
