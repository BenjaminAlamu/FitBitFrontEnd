import React from "react";
import {Bar, Line, Pie} from 'react-chartjs-2';
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Link, Redirect} from "react-router-dom";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";



class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      selectedOption: "Admin",
      date: '',
      token: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2TDlUOEQiLCJhdWQiOiIyMkNZQjUiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNTY5MjYxMTM0LCJpYXQiOjE1Mzc3MjUxMzR9.ISW6kw5LuHjpr2C3tOMCFW5oxwjnXKh32cYeNJ5fjh4"',
      chartData: {},
      bodyData: {}
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
    const self = this;
    fetch('http://localhost:1337/data', {})
    .then((res) => res.json())
    .then(function(data){ 
      self.state.bodyData = data;
      console.log(data);
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
                    ><Link to = {'/sendmessage'} id = "nav-link">SEND MESSAGE</Link>
                      {/* <Explore className={classes.icons} />  */}
                      
                    </Button>
                  </ListItem>
                </List>
              }
            />
            <div class="row justify-content-center">
  <div class="col-sm-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center">Blood Pressure</h5>
        <p class="card-text text-center">{this.state.bodyData.systolicBP}/{this.state.bodyData.diastolicBP}mmHg</p>
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center">Body Temperature</h5>
        <p class="card-text text-center">{this.state.bodyData.bodyTemp}<sup>o</sup>C</p>
      </div>
    </div>
  </div>
  <div class="col-sm-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center">Blood Sugar</h5>
        <p class="card-text text-center">{this.state.bodyData.bloodsugar}mmHg</p>
      </div>
    </div>
  </div>
</div>
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
