import React from "react";
import "../../styles/posts_div.css";
import axios from "axios";
import { getallPost } from "../../actions/register_action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import {
  MDBBtn,
  MDBBadge,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

class Postdiv extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.state.user.email) {
      console.log("Calling", this.props.state.user.email)
      this.setState({ email: this.props.state.user.email })
    }
  }
  state = {
    modal10: false,
    email: this.props.state.user.email,
  };
  toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
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
    console.log("sda", this.props.state.all_posts, this.state);
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
                            <MDBBtn
                              color='elegant'
                              size='md'
                              onClick={this.toggle(12)}>
                              Comments
                            <MDBBadge color='danger' className='ml-2'>
                                4
                            </MDBBadge>
                            </MDBBtn>
                          </div>
                        </div>
                      </div>
                    )}
                    {e.text && (
                      <div>
                        <div className='post-content-div'>
                          <div className='text-post-div'>
                            {ReactHtmlParser(e.text)}
                          </div>
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
                            <MDBBtn color='light' size='md'>
                              Comments
                            <MDBBadge
                                color='danger'
                                className='ml-2'
                                onClick={this.toggle(12)}>
                                4
                            </MDBBadge>
                            </MDBBtn>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        <div>
          <MDBModal
            isOpen={this.state.modal12}
            toggle={this.toggle(12)}
            backdrop={false}>
            <MDBModalHeader toggle={this.toggle(12)}>
              MDBModal title
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput label='Username' icon='comment' />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={this.toggle(12)}>
                Close
              </MDBBtn>
              <MDBBtn color='primary'>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </div>
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