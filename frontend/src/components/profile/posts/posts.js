import React from "react";
import Postdiv from "../../posts_component/posts_component";
class Posts extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h4>Posts</h4>
        </div>
        <hr />
        <div>You have no posts yet</div>
        <Postdiv />
      </div>
    );
  }
}

export default Posts;
