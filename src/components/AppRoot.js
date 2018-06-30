import React from 'react';
import { hot } from 'react-hot-loader'
// import MarkdownData from '../../data/post.md';

class AppRoot extends React.Component {
  render() {
    return (
      <div className="profile">
        {/* <img src={require("../images/dog.jpg")} /> */}
        {/* <h1>{MarkdownData.title}</h1> */}
        <h1>Temp heading.</h1>
        {/* <div className='content' dangerouslySetInnerHTML={{ __html: MarkdownData.__content }}></div> */}
        <div className='content' dangerouslySetInnerHTML={{ __html: '<p>Temp text</p>' }}></div>
      </div>
    )
  }
}

/* hot reload
 * this module will let you hot reloaded changes to components
 * and at the same time hold the state it may currently hold
 */

export default hot(module)(AppRoot);
