import React from "react";
import "../../../styles/posts_div.css";
import axios from "axios";
import {
  loggedPostup,
  getCommentDataText,
} from "../../../actions/register_action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { MDBBadge } from "mdbreact";
class UpVote extends React.Component {
  constructor() {
    super();
    this.state = {
      myclass: "",
      display: "none",
    };
  }

  generateRandomColor() {
    var colors = [
      ,
      "linear-gradient(to right, #834d9b, #d04ed6)",
      "linear-gradient(to right, #2980b9, #2c3e50)",
      "linear-gradient(to right, #fd746c, #ff9068)",
      "linear-gradient(to right, #4ca1af, #c4e0e5)",
      "linear-gradient(to right, #b24592, #f15f79)",
      "linear-gradient(to right, #c2e59c, #64b3f4)",
      "linear-gradient(to right, #76b852, #8dc26f)",
      "linear-gradient(to right, #e53935, #e35d5b)",
      "linear-gradient(to right, #ee9ca7, #ffdde1)",
      "linear-gradient(to right, #d1913c, #ffd194)",
    ];
    var len = colors.length;
    var randomNum = Math.floor(Math.random() * len);
    var color = colors[randomNum];
    colors.splice(randomNum, 1);
    return color;
  }

  componentDidMount() {
    if (this.props.state.user.email) {
      this.props.loggedPostup(this.props.state.user.email);
    }

    this.props.getCommentDataText();
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
        <h4 style={{ color: "whitesmoke", marginTop: "1rem" }}>
          Your Up Voted Post
        </h4>
        {this.props.state.logged_up.length === 0 ? (
          <div></div>
        ) : (
          this.props.state.logged_up.map((e, i) => {
            return (
              <div key={i} className='posts_div-profile'>
                <div className='contents-tools-div'>
                  <div className='title-div'>
                    <h4>
                      <span className='logo-title2-nav'># </span>
                      <u>{e.title}</u>
                    </h4>
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
                              onClick={() => this.handleHide(e._id + i)}>
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
                        <div className='comments-display' id={e._id + i}>
                          {e.comments.map((el, index) => (
                            <div className='comment-content' key={index}>
                              <div className='col-2'>
                                <img
                                  src={el.postedBy.image_url}
                                  alt=''
                                  width='38'
                                  height='38'
                                  style={{
                                    borderRadius: "50%",
                                    marginTop: "2px",
                                    border: "2px solid whitesmoke",
                                  }}
                                />
                              </div>
                              <div className='col-10'>
                                <div class='dialogbox'>
                                  <div class='body'>
                                    <span class='tip tip-left'></span>
                                    {el.postedBy.name}
                                    <div class='message'>
                                      <blockquote>{el.text}</blockquote>
                                    </div>
                                  </div>
                                </div>
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
                        <div
                          className='text-post-div'
                          style={{
                            background: this.generateRandomColor(),
                          }}>
                          {ReactHtmlParser(e.text)}
                          {this.props.videoData &&
                            this.props.videoData.map((el, i) => {
                              if (el.id === e._id) {
                                return (
                                  <div>
                                    <iframe
                                      src={`//www.youtube.com/embed/${el.v_url}`}></iframe>
                                  </div>
                                );
                              }
                              return <div></div>;
                            })}
                        </div>
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
                              onClick={() => this.handleHide(e._id + i)}>
                              <i class='fas fa-comment-alt black-text'></i>{" "}
                              COMMENTS{" "}
                              <span
                                class='badge badge-info ml-2'
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
                          id={e._id + i}
                          style={{ display: this.state.display }}>
                          {e.comments.map((el, index) => (
                            <div className='comment-content' key={index}>
                              <div className='col-2'>
                                <img
                                  src={el.postedBy.image_url}
                                  alt=''
                                  width='38'
                                  height='38'
                                  style={{
                                    borderRadius: "50%",
                                    marginTop: "2px",
                                    border: "2px solid whitesmoke",
                                  }}
                                />
                              </div>
                              <div className='col-10'>
                                <div class='dialogbox'>
                                  <div class='body'>
                                    <span class='tip tip-left'></span>
                                    {el.postedBy.name}
                                    <div class='message'>
                                      <blockquote>{el.text}</blockquote>
                                    </div>
                                  </div>
                                </div>
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
    comments_text: state.user.comments_text,
    comments_image: state.user.comments_image,
    videoData: state.user.videoData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loggedPostup, getCommentDataText }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(UpVote);
