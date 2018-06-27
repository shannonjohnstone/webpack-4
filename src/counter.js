import React from 'react';
import { hot } from 'react-hot-loader'

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
    this.climb = this.climb.bind(this);
  }
  climb() {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div onClick={this.climb}>
        <h1>Count: {this.state.count}</h1>
      </div>
    )
  }
}

/* hot reload
 * this module will let you hot reloaded changes to components
 * and at the same time hold the state it may currently hold
 */

export default hot(module)(Counter);
