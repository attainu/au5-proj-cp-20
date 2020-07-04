import React from "react";
import Logerpost from '../../posts_component/logerposts'
class Posts extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h4 style={{ color: "whitesmoke", marginTop: "1rem" }}>Posts</h4>
        </div>
        <hr />
        <Logerpost />
      </div>
    );
  }
}

export default Posts;
