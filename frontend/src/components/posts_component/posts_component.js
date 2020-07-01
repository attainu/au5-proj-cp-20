import React from "react";
import "../../styles/posts_div.css";

class Postdiv extends React.Component {
  render() {
    return (
      <div>
        <div className='posts_div'>
          <div className='contents-tools-div'>
            <div className='title-div'>
              <h4>Title of the post</h4>
            </div>
            <div class='post-content-div'>
              <img
                id='post-image'
                src='https://www.iconspng.com/images/post-3d-scan-head-avatar/post-3d-scan-head-avatar.jpg'
                alt=''
              />
            </div>
            <div class='tools'>
              <div id='up-arrow'>
                <i class='fas fa-arrow-up fa-2x'></i>
              </div>
              <div id='count'>
                <span class='badge badge-pill badge-light'>2.5k</span>
              </div>
              <div id='down-arrow'>
                <i class='fas fa-arrow-down fa-2x'></i>
              </div>
              <div id='comments'>
                <span className='badge badge-light'>
                  <i class='fas fa-comment-alt black-text'></i>{" "}
                  <strong>Comments</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Postdiv;
