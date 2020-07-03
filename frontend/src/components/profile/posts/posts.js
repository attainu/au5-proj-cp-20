import React from "react";
import Postdiv from "../../posts_component/posts_component";
class Posts extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h4 style={{ color: "whitesmoke", marginTop: "1rem" }}>Posts</h4>
        </div>
        <hr />
        <Postdiv />
      </div>
    );
  }
}

export default Posts;
