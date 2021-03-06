import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import {Link, Redirect} from "react-router-dom";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      selectedOption: "Admin",
      list : [],
      view: false,
      send: false
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
    console.log("Herefefe");
    var id = localStorage.getItem('userid');

    const self = this;
    fetch('http://localhost:1337/view', {
            
      method: 'POST',
      // credentials: "include",
      body:JSON.stringify({

      }),
      headers: {
        Accept: "application/json",
          "Content-Type": "application/json",
          // Cache:'no-cache'
      }
  }).then((res) => res.json())
  .then(function(data){
    console.log(data);
    self.setState({ list: data });
  } )
  .catch((err)=>console.log(err))    
}
  redirectDetails(){
    this.setState({view: true});
  }

  render() {
    if(this.state.view){
      <Redirect to='/details' />
    }
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
              brand="Health Monitoring System"
              color="primary"
              rightLinks={
                <List className={classes.list}>
                  <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink + " " + classes.navLinkActive}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    ><Link to = {'/login'} id = "nav-link">LOG OUT</Link>
                      {/* <Explore className={classes.icons} />  */}
                      
                    </Button>
                  </ListItem>
                </List>
              }
            />
          <div id="nav-tabs">
            <h4>Here are your patients</h4>
            {console.log(this.state)}
            <GridContainer>
              {this.state.list.map((user, index) =>{
              return <GridItem xs={12} sm={12} md={6} key = {index}>
                <CustomTabs
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: user.firstname + " " + user.lastname,
                      // tabIcon: Face,
                      tabContent: (
                        <div className={classes.textCenter}>
                          <p>Email: {user.email}</p>
                          <p>Phone Number: {user.number}</p>
                          <Button simple color="rose" size="lg" ><Link to = {'/details'}>View Data</Link></Button>
                          <Button simple color="info" size="lg"><Link to = {'/sendmessage'}>Send Message</Link></Button>
                        </div>
                      )
                    }
                  ]}
                />
              </GridItem>
              })}
            </GridContainer>
          </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(DashboardPage);
