import React from "react";
import "../../../styles/profiletabs.css";
import Upvotes from "../upvotes/upvotes";
import Downvotes from "../downvotes/downvotes";
import Posts from "../posts/posts";
import EditProfile from "../../profile/edit-profile/edit-profile";

class ProfileTabs extends React.Component {
  sendDataFromEDP = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div>
        <nav id='tab-nav'>
          <div class='nav nav-tabs' id='nav-tab' role='tablist'>
            <a
              class='nav-item nav-link active profile-nav-link'
              id='nav-posts-tab'
              data-toggle='tab'
              href='#nav-posts'
              role='tab'
              aria-controls='nav-posts'
              aria-selected='true'>
              POSTS
            </a>
            <a
              class='nav-item nav-link profile-nav-link'
              id='nav-upvotes-tab'
              data-toggle='tab'
              href='#nav-upvotes'
              role='tab'
              aria-controls='nav-upvotes'
              aria-selected='false'>
              UPVOTES
            </a>
            <a
              class='nav-item nav-link profile-nav-link'
              id='nav-downvotes-tab'
              data-toggle='tab'
              href='#nav-downvotes'
              role='tab'
              aria-controls='nav-downvotes'
              aria-selected='false'>
              DOWNVOTES
            </a>
            <a
              class='nav-item nav-link profile-nav-link'
              id='nav-followers-tab'
              data-toggle='tab'
              href='#nav-followers'
              role='tab'
              aria-controls='nav-followers'
              aria-selected='false'>
              FOLLOWERS
            </a>
            <a
              class='nav-item nav-link profile-nav-link'
              id='nav-following-tab'
              data-toggle='tab'
              href='#nav-following'
              role='tab'
              aria-controls='nav-following'
              aria-selected='false'>
              FOLLOWING
            </a>
            <a
              class='nav-item nav-link profile-nav-link'
              id='nav-ep-tab'
              data-toggle='tab'
              href='#nav-ep'
              role='tab'
              aria-controls='nav-ep'
              aria-selected='false'>
              EDIT PROFILE
            </a>
          </div>
        </nav>
        <div class='tab-content' id='nav-tabContent'>
          <div
            class='tab-pane fade show active'
            id='nav-posts'
            role='tabpanel'
            aria-labelledby='nav-posts-tab'>
            <Posts />
          </div>
          <div
            class='tab-pane fade'
            id='nav-upvotes'
            role='tabpanel'
            aria-labelledby='nav-upvotes-tab'>
            <Upvotes />
          </div>
          <div
            class='tab-pane fade'
            id='nav-downvotes'
            role='tabpanel'
            aria-labelledby='nav-downvotes-tab'>
            <Downvotes />
          </div>
          <div
            class='tab-pane fade'
            id='nav-followers'
            role='tabpanel'
            aria-labelledby='nav-followers-tab'>
            FOLLOWERS
          </div>
          <div
            class='tab-pane fade'
            id='nav-following'
            role='tabpanel'
            aria-labelledby='nav-following-tab'>
            FOLLOWING
          </div>
          <div
            class='tab-pane fade'
            id='nav-ep'
            role='tabpanel'
            aria-labelledby='nav-ep-tab'>
            <EditProfile sendDataFromEDP={(nr) => this.sendDataFromEDP(nr)} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
