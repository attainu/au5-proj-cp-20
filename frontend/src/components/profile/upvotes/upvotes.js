import React from "react";
import { MDBInput, MDBBtn } from "mdbreact";

class Upvotes extends React.Component {
  render() {
    return (
      <div>
        <div class='card bg-dark' id='edit-profile-card'>
          <div class='card-header' style={{ color: "white" }}>
            <h3>Title Here</h3>
          </div>
          <div class='card-body'>
            <div className='md-form' id='card-content'>
              <img
                id='post-image'
                src='https://www.iconspng.com/images/post-3d-scan-head-avatar/post-3d-scan-head-avatar.jpg'
                alt=''
              />
            </div>
          </div>
          <div class='card-footer text-muted'>
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

export default Upvotes;
