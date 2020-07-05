import React from "react";
import "../../styles/posts_div.css";
import axios from "axios";
import { loggedPost } from "../../actions/register_action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  MDBBtn,
  MDBBadge,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import ReactHtmlParser from "react-html-parser";
import HtmlParser from "react-html-parser";
class Logposts extends React.Component {
  constructor() {
    super();
    this.state = {
      modal10: false,
      text: "",
      text_id: "",
      post_id: "",
      email: "",
      myclass: "",
      display: "none",
      callApi: false,
    };

    // if (this.props.state.user.email) {
    //   console.log("Calling", this.props.state.user.email);
    //   this.setState({ email: this.props.state.user.email });
    // }
  }

  componentDidMount() {
    if (this.props.state.user.email) {
      this.props.loggedPost(this.props.state.user.email);
    }
  }

  handleHide = (id) => {
    const divId = document.getElementById(id);
    console.log("divid", divId);
    if (divId.style.display === "none") {
      divId.style.display = "";
    } else {
      divId.style.display = "none";
    }
  };

  render() {
    console.log("Up and Down", this.props.state);
    return (
      <div>
        {this.props.state.logged_all.length === 0 ? (
          <div></div>
        ) : (
          this.props.state.logged_all.map((e, i) => {
            return (
              <div key={i} className='posts_div'>
                <div className='contents-tools-div'>
                  <div className='title-div'>
                    {/* {e.postedBy.map((el) => (
                      <div>
                        <div className='col-1'>
                          <img
                            src={el.image_url}
                            width='30'
                            height='30'
                            style={{
                              borderRadius: "50%",
                              border: "2px solid whitesmoke",
                            }}
                            alt=''
                          />
                        </div>
                        <div className='col-5'>{el.name}</div>{" "}
                      </div>
                    ))} */}
                    <h4>{e.title}</h4>
                  </div>
                  {e.pic && (
                    <div>
                      <div className='post-content-div'>
                        <img id='post-image' src={e.pic} alt='REDDIT' />
                      </div>
                      <div className='tools'>
                        <div id='up-arrow'>
                          <span class='badge badge-success ml-2'>
                            <i className='fas fa-arrow-up fa-2x'></i>
                          </span>
                        </div>
                        <div id='count'>
                          <h4>
                            <span className='badge badge-light ml-2'>
                              {Number(e.upvote.length - e.dvote.length)}
                            </span>
                          </h4>
                        </div>
                        <div id='down-arrow'>
                          <span class='badge badge-danger ml-2'>
                            <i className='fas fa-arrow-down fa-2x'></i>
                          </span>
                        </div>
                        <div className='comments-badge' id='comments'>
                          <h4>
                            <MDBBadge
                              color='light'
                              className='ml-2 fa-2x'
                              onClick={() => this.handleHide(e._id)}>
                              <i class='fas fa-comment-alt black-text'></i>{" "}
                              COMMENTS{" "}
                              <span
                                class='badge badge-secondary ml-2'
                                id='comments_count'>
                                {e.comments.length}
                              </span>
                            </MDBBadge>
                          </h4>
                        </div>
                      </div>
                      <div id='comment-div'>
                        <div
                          className='comments-display'
                          id={e._id}
                          style={{ display: this.state.display }}>
                          {e.comments.map((el, index) => (
                            <div className='comment-content' key={index}>
                              <div className='col-1'>
                                <img
                                  src={el.postedBy.image_url}
                                  alt=''
                                  width='35'
                                  height='35'
                                  style={{
                                    borderRadius: "50%",
                                    border: "2px solid whitesmoke",
                                  }}
                                />
                              </div>
                              <div className='col-11' id='comment-text'>
                                <div>
                                  <strong>{el.postedBy.name}</strong>
                                </div>
                                <div>{el.text}</div>
                              </div>
                            </div>
                          ))}
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
                          <span class='badge badge-success ml-2'>
                            <i className='fas fa-arrow-up fa-2x'></i>
                          </span>
                        </div>
                        <div id='count'>
                          <h4>
                            <span className='badge badge-light ml-2'>
                              {Number(e.upvote.length - e.dvote.length)}
                            </span>
                          </h4>
                        </div>
                        <div id='down-arrow'>
                          <span class='badge badge-danger ml-2'>
                            <i className='fas fa-arrow-down fa-2x'></i>
                          </span>
                        </div>
                        <div className='comments-badge' id='comments'>
                          <h4>
                            <MDBBadge
                              color='light'
                              className='ml-2 fa-2x'
                              onClick={() => this.handleHide(e._id)}>
                              <i class='fas fa-comment-alt black-text'></i>{" "}
                              COMMENTS{" "}
                              <span
                                class='badge badge-secondary ml-2'
                                id='comments_count'>
                                {e.comments.length}
                              </span>
                            </MDBBadge>
                          </h4>
                        </div>
                      </div>
                      <div id='comment-div'>
                        <div
                          className='comments-display'
                          id={e._id}
                          style={{ display: this.state.display }}>
                          {e.comments.map((el, index) => (
                            <div className='comment-content' key={index}>
                              <div className='col-1'>
                                <img
                                  src={el.postedBy.image_url}
                                  alt=''
                                  width='35'
                                  height='35'
                                  style={{
                                    borderRadius: "50%",
                                    border: "2px solid whitesmoke",
                                  }}
                                />
                              </div>
                              <div className='col-11' id='comment-text'>
                                <div>
                                  <strong>{el.postedBy.name}</strong>
                                </div>
                                <div>{el.text}</div>
                              </div>
                            </div>
                          ))}
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
    user: state.user.user,
    all_posts: state.user.all_posts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loggedPost }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Logposts);
