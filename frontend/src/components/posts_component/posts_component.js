import React from "react";
import "../../styles/posts_div.css";
import axios from "axios";
import { getallPost } from "../../actions/register_action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
class Postdiv extends React.Component {
  componentDidMount() {
    console.log("ARE YOU RUNNING");
    this.setState({ email: this.props.state.user.email });
  }
  state = {
    email: "",
  };
  upvote_text = (id) => {
    let token = localStorage.getItem("auth-token");
    let data = { id: id, email: this.props.state.user.email };
    axios({
      method: "post",
      url: "/api/post/upvote/text",
      headers: { "auth-token": token },
      data,
    }).then((res) => {
      this.props.getallPost();
      console.log("Upvoted", res);
    });
  };
  downvote_text = (id) => {
    let token = localStorage.getItem("auth-token");
    let data = { id: id, email: this.props.state.user.email };
    axios({
      method: "post",
      url: "/api/post/dvote/text",
      headers: { "auth-token": token },
      data,
    }).then((res) => {
      this.props.getallPost();
      console.log("DownVoted", res);
    });
  };
  upvote_img = (id) => {
    let token = localStorage.getItem("auth-token");
    let data = { id: id, email: this.props.state.user.email };
    axios({
      method: "post",
      url: "/api/post/upvote/img",
      headers: { "auth-token": token },
      data,
    }).then((res) => {
      this.props.getallPost();
      console.log("Upvoted", res);
    });
  };
  downvote_img = (id) => {
    let token = localStorage.getItem("auth-token");
    let data = { id: id, email: this.props.state.user.email };
    axios({
      method: "post",
      url: "/api/post/dvote/img",
      headers: { "auth-token": token },
      data,
    }).then((res) => {
      this.props.getallPost();
      console.log("DownVoted", res);
    });
  };
  containsObject = (obj, list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  };
  render() {
    console.log(this.props.state.all_posts, this.state);
    return (
      <div className='pd-top'>
        {this.props.state.all_posts.length === 0 ? (
          <div></div>
        ) : (
          this.props.state.all_posts.map((e, i) => {
            return (
              <div key={i} className='posts_div'>
                <div className='contents-tools-div'>
                  <div className='title-div'>
                    <h4>{e.title}</h4>
                  </div>
                  {e.pic && (
                    <div>
                      <div className='post-content-div'>
                        <img id='post-image' src={e.pic} alt='REDDIT' />
                      </div>
                      <div className='tools'>
                        <div id='up-arrow'>
                          <i
                            className='fas fa-arrow-up fa-2x'
                            onClick={() => this.upvote_img(e._id)}></i>
                        </div>
                        <div id='count'>
                          <span className='badge badge-pill badge-light'>
                            {Number(e.upvote.length - e.dvote.length)}
                          </span>
                        </div>
                        <div id='down-arrow'>
                          <i
                            className='fas fa-arrow-down fa-2x'
                            onClick={() => this.downvote_img(e._id)}></i>
                        </div>
                        <div id='comments'>
                          <span className='badge badge-light'>
                            <i className='fas fa-comment-alt black-text'></i>{" "}
                            <strong>Comments</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {e.text && (
                    <div>
                      <div className='post-content-div'>
                        {ReactHtmlParser(e.text)}
                      </div>
                      <div className='tools'>
                        <div id='up-arrow'>
                          <i
                            className='fas fa-arrow-up fa-2x'
                            onClick={() => this.upvote_text(e._id)}></i>
                        </div>
                        <div id='count'>
                          <span className='badge badge-pill badge-light'>
                            {Number(e.upvote.length - e.dvote.length)}
                          </span>
                        </div>
                        <div id='down-arrow'>
                          <i
                            className='fas fa-arrow-down fa-2x'
                            onClick={() => this.downvote_text(e._id)}></i>
                        </div>
                        <div id='comments'>
                          <span className='badge badge-light'>
                            <i className='fas fa-comment-alt black-text'></i>{" "}
                            <strong>Comments</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getallPost }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Postdiv);
