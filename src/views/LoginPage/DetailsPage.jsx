import React from "react";
import {Bar, Line, Pie} from 'react-chartjs-2';
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
      date: '',
      token: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2TDlUOEQiLCJhdWQiOiIyMkNZQjUiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyaHIgcnBybyIsImV4cCI6MTUzNTk3NDM3NywiaWF0IjoxNTMzMzkxNjE3fQ.pm96PgAwsCfN2rWaPhecPtJ7LlNVOt8uS2Hb-4OzO1Q"',
      chartData: {}
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }
  handleOptionChange (e) {
      this.setState({selectedOption: e.target.value});
  }
  componentWillMount(){
    document.title = "FitBit | Details";
    const self = this;
    fetch('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json', {
        headers: {
            'Authorization': self.state.token,
            "Content-Type": "application/json"
        }}).then((res) => res.json())
    .then(function(data){  
        let date =data['activities-heart'][0].dateTime;    
        let result = data['activities-heart'][0].value.heartRateZones;
        let plotData = {
            labels:['Out of Range','Fat Burn', 'Cardio','Peak'],
            datasets:[
                {
                    label: "Min",
                    backgroundColor:            'rgba(54, 162, 235, 0.6)',
                    data: [result[0].min,result[1].min,result[2].min,result[3].min]
                },
                {
                    label: "Max",
                    backgroundColor:             'rgba(153, 102, 255, 0.6)',
                    data: [result[0].max,result[1].max,result[2].max,result[3].max]
                },
            ]

        }
        self.setState({
            chartData: plotData,
            date
        });
        console.log(result)
        console.log(result[0].max)
    }).catch((err)=>console.log(err))
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
                    ><Link to = {'/sendmessage'} id = "nav-link">SEND MESSAGE</Link>
                      {/* <Explore className={classes.icons} />  */}
                      
                    </Button>
                  </ListItem>
                </List>
              }
            />
            <div className = "dataChart">
      <div className="chart" width="400" height="400">
        <Bar
          data={this.state.chartData}
          options={{
            title:{
              display:true,
              text:'Heart Rate for ' + this.state.date,
              fontSize:25
            },
            legend:{
              display:true,
            //   position:this.props.legendPosition
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
          }}
        />
        </div>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(DashboardPage);
