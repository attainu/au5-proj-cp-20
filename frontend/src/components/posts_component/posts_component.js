import React from "react";
import "../../styles/posts_div.css";
import axios from "axios";
import { getallPost } from "../../actions/register_action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  sendCommentDataText,
  sendCommentDataImage,
  getCommentDataText,
  getCommentDataImage,
} from "../../actions/register_action";
import ReactHtmlParser from "react-html-parser";
import { MDBBadge } from "mdbreact";

class Postdiv extends React.Component {
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
      disable: "",
      correctColor: undefined,
      rgbDisplay: "",
      colorSquares: undefined,
      video_url: "",
    };
    // if (this.props.state.user.email) {
    //   console.log("Calling", this.props.state.user.email);
    //   this.setState({ email: this.props.state.user.email });
    // }
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
    console.log("ARE YOU RUNNING");
    this.setState({ email: this.props.state.user.email });
    this.props.getallPost();
    this.props.getCommentDataImage();
    this.props.getCommentDataText();

    let url = document.querySelector("oembed");
    console.log(url);
  }

  upvote_text = (id, elem) => {
    let res = document.getElementById(elem);
    // console.log("on Working", res, val)
    res.style.pointerEvents = "none";
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

  handleComment = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleCommentSaveText = (text, textId) => {
    console.log("Comment Data", text, this.props.user._id, textId);
    const data = {
      text_id: textId,
      text: text,
      user_id: this.props.user._id,
    };
    this.props.sendCommentDataText(data);
    this.props.getCommentDataText();
    this.props.getallPost();
    // setTimeout(function () {
    //   this.setState({ callApi: false });
    // }, 1500);
  };

  handleCommentSaveImage = (text, imageId) => {
    console.log("Comment Data", text, this.props.user._id, imageId);
    const data = {
      image_id: imageId,
      text: text,
      user_id: this.props.user._id,
    };
    this.props.sendCommentDataImage(data);
    this.props.getCommentDataImage();
    this.props.getallPost();
  };

  downvote_text = (id, elem) => {
    let res = document.getElementById(elem);
    // console.log("on Working", res, val)
    res.style.pointerEvents = "none";
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
  upvote_img = (id, elem) => {
    let res = document.getElementById(elem);
    // console.log("on Working", res, val)
    res.style.pointerEvents = "none";
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
  downvote_img = (id, elem) => {
    let res = document.getElementById(elem);
    // console.log("on Working", res, val)
    res.style.pointerEvents = "none";
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
  containsObject = (val, list) => {
    console.log(list, val);
    for (let i = 0; i < list.length; i++) {
      if (list[i].email === val) {
        return true;
      }
    }
    return false;
  };

  handleHide = (id) => {
    const divId = document.getElementById(id);
    console.log("divid", divId);
    if (divId.style.display === "none") {
      divId.style.display = "";
    } else {
      divId.style.display = "none";
    }
  };
  disableArrow = (arr, i) => {
    let val = this.containsObject(this.state.email, arr);
    if (val) {
      let res = document.getElementById(i);
      console.log("on Working", res, val);
      res.style.pointerEvents = "none";
      // this.setState({ disable: { 'pointer-events': 'none  } })
    }
  };
  render() {
    console.log("sda", this.props.videoData);
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
                      {e.postedBy.map((el) => (
                        <div
                          className='row'
                          style={{ backgroundColor: "#252525" }}>
                          <div className='col-2-lg ml-3'>
                            <img
                              src={el.image_url}
                              width='35'
                              height='35'
                              style={{
                                borderRadius: "50%",
                                border: "2px solid whitesmoke",
                              }}
                              alt=''
                            />
                          </div>
                          <div
                            className='col-10-lg ml-3 mt-2'
                            style={{ textTransform: "capitalize" }}>
                            <h5>{el.name}</h5>
                          </div>
                        </div>
                      ))}
                      <hr />
                      <h4>{e.title}</h4>
                    </div>
                    {e.pic && (
                      <div>
                        <div className='post-content-div'>
                          <img id='post-image' src={e.pic} alt='REDDIT' />
                        </div>
                        <div className='tools'>
                          <div id='up-arrow'>
                            <span className='badge badge-success ml-2'>
                              <i
                                className='fas fa-arrow-up fa-2x'
                                id={i + "up"}
                                onMouseEnter={() =>
                                  this.disableArrow(e.upvote, i + "up")
                                }
                                onClick={() =>
                                  this.upvote_img(e._id, i + "up")
                                }></i>
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
                              <i
                                className='fas fa-arrow-down fa-2x'
                                id={i + "down"}
                                onMouseEnter={() =>
                                  this.disableArrow(e.dvote, i + "down")
                                }
                                onClick={() =>
                                  this.downvote_img(e._id, i + "down")
                                }></i>
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
                          <div className='input-div'>
                            <div className='col-2 '>
                              <img
                                src={this.props.user.image_url}
                                alt=''
                                width='35'
                                height='35'
                                style={{
                                  borderRadius: "50%",
                                  border: "2px solid whitesmoke",
                                }}
                              />
                            </div>
                            <div className='col-10'>
                              <form
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  this.handleCommentSaveImage(
                                    event.target[0].value,
                                    e._id,
                                    this.props.user._id
                                  );
                                }}>
                                <input
                                  type='text'
                                  placeholder='Add your comment'
                                  className='form-control comment-input'
                                />
                              </form>
                            </div>
                          </div>

                          <div
                            className='comments-display'
                            id={e._id}
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
                                        <span>{el.text}</span>
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
                            }}
                            id='text-post-div'>
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
                              <i
                                className='fas fa-arrow-up fa-2x'
                                id={i + "up"}
                                onMouseEnter={() =>
                                  this.disableArrow(e.upvote, i + "up")
                                }
                                onClick={() =>
                                  this.upvote_text(e._id, i + "up")
                                }></i>
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
                              <i
                                className='fas fa-arrow-down fa-2x'
                                id={i + "down"}
                                onMouseEnter={() =>
                                  this.disableArrow(e.upvote, i + "down")
                                }
                                onClick={() =>
                                  this.downvote_text(e._id, i + "down")
                                }></i>
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
                                  class='badge badge-info ml-2'
                                  id='comments_count'>
                                  {e.comments.length}
                                </span>
                              </MDBBadge>
                            </h4>
                          </div>
                        </div>
                        <div id='comment-div'>
                          <div className='input-div'>
                            <div className='col-1'>
                              <img
                                src={this.props.user.image_url}
                                alt=''
                                width='35'
                                height='35'
                                style={{
                                  borderRadius: "50%",
                                  border: "2px solid whitesmoke",
                                }}
                              />
                            </div>
                            <div className='col-11'>
                              <form
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  this.handleCommentSaveText(
                                    event.target[0].value,
                                    e._id,
                                    this.props.user._id
                                  );
                                }}>
                                <input
                                  type='text'
                                  placeholder='Add your comment'
                                  className='form-control comment-input'
                                />
                              </form>
                            </div>
                          </div>

                          <div
                            className='comments-display'
                            id={e._id}
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
  console.log("VideoPost", state.user.videoData);
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
  return bindActionCreators(
    {
      getallPost,
      sendCommentDataText,
      sendCommentDataImage,
      getCommentDataText,
      getCommentDataImage,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Postdiv);
