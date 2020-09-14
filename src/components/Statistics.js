import React, { Component } from 'react'
import Axios from '../axios';

import { Bar } from 'react-chartjs-2';

export default class Statistics extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      categories: []
    }
  }

  componentDidMount() {
    Axios.get("/reports/countByCategory", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(Object.values(res.data))
        this.setState({
          reports: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <h1>Prijave po kategorijama
        </h1>

        <Bar
          data={{
            labels: Object.keys(this.state.reports),
            datasets: [{
                data: Object.values(this.state.reports),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        }}
          width={100}
          height={200}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    )
  }
}