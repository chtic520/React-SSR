import React from 'react';
import axios from 'axios';

export default class TestApi extends React.Component {
  getTopics = () => {
    axios.get('/api/topics')
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }

  login = () => {
    axios.post('/api/user/login', {
      accessToken: 'b00339ac-61c7-4ddd-854e-b05ca0aa0b8e',
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  markAll = () => {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    );
  }
}
