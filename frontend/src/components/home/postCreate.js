import React, { Component } from "react";
import { bindActionCreators } from "redux";
import axios from "axios";
import { connect } from "react-redux";
import "../../styles/landing.css";
import Navbar from "../navbar/navbar";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBBtn,
  MDBAlert,
} from "mdbreact";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
class TabsDefault extends Component {
  state = {
    activeItem: "1",
    email: "",
    title: "",
    text: "",
    pic: "",
    option: ["", "", ""],
    error: "",
    post_error: "",
    image_error: "",
    poll_error: "",
  };
  toggle = (tab) => (e) => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab,
      });
    }
  };
  pollEvent = (el, i, event) => {
    this.state.option[i] = event.target.value;
    this.setState({ option: this.state.option });
  };
  postAction = async () => {
    await this.setState({ email: this.props.user.email });
    if (this.state.title === "") {
      this.setState({ error: "Empty Title" });
    }
    let tab = Number(this.state.activeItem);
    if (tab === 1) {
      if (this.state.text === "" || this.state.title === "") {
        NotificationManager.warning("Empty Text Field");
        // this.setState({ post_error: "Empty Text Field" });
      } else {
        let { email, title, text } = this.state;
        let data = { title, text, email };
        let token = localStorage.getItem("auth-token");
        return axios({
          method: "post",
          url: "/api/post/text",
          headers: { "auth-token": token },
          data,
        }).then((res) => {
          NotificationManager.success("Post created successfully !!!");
          console.log("posttextres", res);
        });
      }
    }
    if (tab === 2) {
      if (this.state.pic === "" || this.state.title === "") {
        this.setState({ image_error: "Please select a File" });
      } else {
        console.log("PIC UPLOAD", this.state.pic);
        var url;
        var form = new FormData();
        form.append("file", this.state.pic);
        form.append("upload_preset", "ml_default");
        form.append("cloud_name", "dtzdoldcm");
        console.log(form);
        await fetch("https://api.cloudinary.com/v1_1/dtzdoldcm/image/upload", {
          method: "POST",
          body: form,
        })
          .then((res) => res.json())
          .then((blue) => {
            url = blue.url;
          })
          .catch((err) => {
            console.log(err);
          });
        var data = {
          title: this.state.title,
          email: this.state.email,
          pic: url,
        };
        let token = localStorage.getItem("auth-token");
        console.log(data);
        return axios({
          method: "post",
          url: "/api/post/image",
          headers: { "auth-token": token },
          data,
        }).then((res) => {
          NotificationManager.success("Post created successfully !!!");
          console.log("posttextres", res);
        });
      }
    }
    if (tab === 3) {
      if (
        (this.state.option[0] === "" && this.state.option[1] === "") ||
        this.state.title === ""
      ) {
        console.log(
          "Why are you running",
          this.state.option[0],
          this.state.option[1],
          this.state.title
        );
        this.setState({ poll_error: "Minimum Two Inputs" });
      } else {
        let { email, title, option } = this.state;
        let data = { title, email, option };
        let token = localStorage.getItem("auth-token");
        return axios({
          method: "post",
          url: "/api/post/poll",
          headers: { "auth-token": token },
          data,
        }).then((res) => {
          console.log("posttextres", res);
          window.location.reload();
        });
      }
    }
    console.log(this.state.activeItem);
  };
  render() {
    console.log("Create Post", this.state, this.props.user);
    return (
      <div>
        <nav className=''>
          <Navbar />
        </nav>
        <NotificationContainer />
        <div className='row-cp'>
          <div className='cp'>
            <div className='post-create-title'>
              <h2 style={{ color: "whitesmoke" }}>Share what's on your mind</h2>
            </div>
            <MDBContainer id='create'>
              <MDBNav className='nav-tabs mt-5'>
                <MDBNavItem>
                  <MDBNavLink
                    link
                    to='#'
                    active={this.state.activeItem === "1"}
                    onClick={this.toggle("1")}
                    role='tab'>
                    <b>
                      <strong>Post</strong>
                    </b>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    link
                    to='#'
                    active={this.state.activeItem === "2"}
                    onClick={this.toggle("2")}
                    role='tab'>
                    <b>
                      <strong>Image</strong>
                    </b>
                  </MDBNavLink>
                </MDBNavItem>
                {/* <MDBNavItem>
                  <MDBNavLink
                    link
                    to='#'
                    active={this.state.activeItem === "3"}
                    onClick={this.toggle("3")}
                    role='tab'>
                    <b>
                      <strong>Poll</strong>
                    </b>
                  </MDBNavLink>
                </MDBNavItem> */}
              </MDBNav>
              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId='1' role='tabpanel'>
                  <div id='tab-pan'>
                    <label for='exampleForm2' className='mt-2'>
                      <b>Title</b>
                    </label>
                    <input
                      type='text'
                      id='exampleForm1'
                      class='form-control'
                      onChange={(e) => {
                        this.setState({ title: e.target.value });
                      }}></input>
                    <br />
                    <br />
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        this.setState({ text: editor.getData() });
                      }}
                    />
                    {this.state.post_error === "" ? (
                      <br />
                    ) : (
                      <MDBAlert color='warning'>
                        <strong>{this.state.post_error}</strong> You should
                        check in on some of those fields above.
                      </MDBAlert>
                    )}
                    <button
                      type='button'
                      class='btn btn-secondary'
                      onClick={() => this.postAction()}>
                      Post
                    </button>
                  </div>
                </MDBTabPane>
                <MDBTabPane tabId='2' role='tabpanel'>
                  <div>
                    <label for='exampleForm2' className='mt-2'>
                      <b>Title</b>
                    </label>
                    <input
                      type='text'
                      id='exampleForm2'
                      class='form-control'
                      onChange={(e) => {
                        this.setState({ title: e.target.value });
                      }}></input>
                    <br />
                    <br />
                    <div class='input-group'>
                      <div class='input-group-prepend'>
                        <span
                          class='input-group-text'
                          id='inputGroupFileAddon01'>
                          Upload
                        </span>
                      </div>
                      <div class='custom-file'>
                        <input
                          type='file'
                          class='custom-file-input'
                          id='inputGroupFile01'
                          aria-describedby='inputGroupFileAddon01'
                          onChange={(e) =>
                            this.setState({ pic: e.target.files[0] })
                          }
                        />
                        <label class='custom-file-label' for='inputGroupFile01'>
                          Choose file
                        </label>
                      </div>
                    </div>
                    {this.state.image_error === "" ? (
                      <br />
                    ) : (
                      <MDBAlert color='warning'>
                        <strong>{this.state.image_error}</strong> You should
                        check in on some of those fields above.
                      </MDBAlert>
                    )}
                    <button
                      type='button'
                      class='btn btn-secondary'
                      onClick={() => this.postAction()}>
                      Post
                    </button>
                  </div>
                </MDBTabPane>
                {/* <MDBTabPane tabId='3' role='tabpanel'>
                  <label for='exampleForm2' className='mt-2'>
                    <b>Title</b>
                  </label>
                  <input
                    type='text'
                    id='exampleForm3'
                    class='form-control'
                    onChange={(e) => {
                      this.setState({ title: e.target.value });
                    }}></input>
                  <label for='exampleForm2' className='mt-2'>
                    <b>Options</b>
                  </label>
                  <MDBBtn
                    disabled={this.state.option.length >= 6}
                    color='dark-green ml-3'
                    size='sm'
                    onClick={() =>
                      this.setState({
                        option: [...this.state.option, ""],
                      })
                    }>
                    Add Options
                  </MDBBtn>
                  <MDBBtn
                    disabled={this.state.option.length <= +2}
                    color='dark-green'
                    size='sm'
                    onClick={() => {
                      this.state.option.pop();
                      this.setState({ option: this.state.option });
                    }}>
                    Remove Options
                  </MDBBtn>
                  <ol>
                    {this.state.option.map((e, i) => {
                      return (
                        <li>
                          <input
                            key={i}
                            type='text'
                            id='exampleForm2'
                            class='form-control'
                            onChange={(event) =>
                              this.pollEvent(e, i, event)
                            }></input>
                        </li>
                      );
                    })}
                  </ol>
                  {this.state.poll_error === "" ? (
                    <br />
                  ) : (
                    <MDBAlert color='warning'>
                      <strong>{this.state.poll_error}</strong> You should check
                      in on some of those fields above.
                    </MDBAlert>
                  )}
                  <button
                    type='button'
                    class='btn btn-secondary'
                    onClick={() => this.postAction()}>
                    Post
                  </button>
                </MDBTabPane> */}
              </MDBTabContent>
            </MDBContainer>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(TabsDefault);
