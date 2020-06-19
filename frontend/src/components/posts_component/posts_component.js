import React from "react";
import "../../styles/posts_div.css";

class Postdiv extends React.Component {
  render() {
    return (
      <div>
        <div className='posts_div'>
          <div className='upvote-downvote-div'>
            <div className='col-3'>
              <i class='fas fa-arrow-alt-circle-up fa-2x green-text'></i>
            </div>
            <div className='col-6'>2.5k</div>
            <div className='col-3'>
              <i class='fas fa-arrow-alt-circle-down fa-2x red-text'></i>
            </div>
          </div>
          <div className='contents-tools-div'>
            <div class='post-content-div'>
              <img
                src='https://www.iconspng.com/images/post-3d-scan-head-avatar/post-3d-scan-head-avatar.jpg'
                alt=''
                width='400'
                height='300'
              />
            </div>
            <div class='tools'>
              <span class='badge fa-2x badge-pill amber'>
                <i class='far fa-comments fa-lg' aria-hidden='true'></i>
                <span> </span>Comment
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Postdiv;
