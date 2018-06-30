import React from 'react';
import MarkdownData from '../../data/post.md';
import imagePath from '../images/dog.jpg'

const About = () => (
  <div className="profile">
    <img src={imagePath} />
    <h1>{MarkdownData.title}</h1>
    <div className='content' dangerouslySetInnerHTML={{ __html: MarkdownData.__content }}></div>
  </div>
);

export default About;
