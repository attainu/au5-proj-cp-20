import React from "react";
import "../../styles/profile.css";
import ReactCrop from "react-image-crop";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, Link, Redirect } from "react-router-dom";
import "react-image-crop/dist/ReactCrop.css";
import { storage } from "../../config/firebase_config";
import Upvotes from "./upvotes/upvotes";
import Downvotes from "./downvotes/downvotes";
import Posts from "./posts/posts";
import Navbar from "../navbar/navbar";
import EditProfile from "../profile/edit-profile/edit-profile";
// import Login from "../login/login";
// import Forbidden from "../forbidden/forbidden";
import { getCroppedImg } from "./crop_image/image_cropper";
import { verifyToken } from "../../actions/register_action";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProfileTabs from "../profile/tabs/tabs";

import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBProgress,
} from "mdbreact";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      modal14: false,
      modal12: false,
      progress: 0,
      src: null,
      crop: {
        unit: "%",
        width: 30,
        height: 40,
        aspect: 16 / 14,
      },
    };
    this.props.verifyToken();
    this.handleImage = this.handleImage.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  handleImage = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }

    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
      src: null,
    });
  };

  handleImageUpload = (nr, pr) => {
    const { croppedImageUrl } = this.state;
    const uploadTask = storage
      .ref(`images/${croppedImageUrl.name}`)
      .put(croppedImageUrl);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        console.log(snapshot);
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
        this.setState({ progress });
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(croppedImageUrl.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ url });
          });
      }
    );
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
    let modalNumber2 = "modal" + pr;
    this.setState({
      [modalNumber2]: !this.state[modalNumber2],
    });
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  handlePicture = (nr, mr) => {
    document.getElementById("filePicture").click();
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
      src: null,
    });
    let modalNumber1 = "modal" + mr;
    this.setState({
      [modalNumber1]: !this.state[modalNumber1],
      src: null,
    });
  };

  render() {
    const { crop } = this.state;
    console.log("progress", this.state.progress);
    return (
      <div>
        <Navbar />
        <div className='the-bg'></div>
        {this.props.login === true ? (
          <div>
            <div className='main_profile'>
              {/* <MDBContainer>
                <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)}>
                  <MDBModalHeader toggle={this.toggle(2)}>
                    MDBModal title
                  </MDBModalHeader>
                  <MDBModalBody>
                    <div className='prog-bar'>
                      <CircularProgressbar
                        value={this.state.progress}
                        text={`${this.state.progress}%`}
                      />
                    </div>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={this.toggle(2)}>
                      Close
                    </MDBBtn>
                    <MDBBtn color='primary'>Save changes</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
              </MDBContainer> */}

              <div className='user-contents'>
                <div className='nav-div'>
                  <ProfileTabs />
                  <div className='content-div'>
                    <div className='post-div'></div>
                  </div>
                </div>
                <div className='pp-div'>
                  <div
                    className='card bg-dark'
                    id='profile-card'
                    style={{ width: "18rem", height: "25rem" }}>
                    <div className='card-header'>
                      {this.props.user.name} {this.props.google.name}
                    </div>
                    <div className='avatar' onClick={this.toggle(14)}>
                      <img
                        className='avatar_img'
                        htmlFor='file'
                        src={
                          this.state.url
                            ? this.state.url
                            : "https://cdn.dribbble.com/users/446910/screenshots/10953246/avatar-dribble_1x.png"
                        }
                        alt=''
                      />
                      <div className='changeAvatar'>
                        <button className='btn btn-elegant'>
                          <i className='fas fa-edit'></i> edit profile pic
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className='card-body'>
                      <ul>
                        <li>
                          <i className='fas fa-at amber-text'></i>{" "}
                          {this.props.user.email}
                          {this.props.google.email}
                        </li>
                        <li>
                          <i className='fas fa-birthday-cake green-text'></i> 12
                          october
                        </li>
                        <li>
                          <i className='fas fa-map-marker-alt red-text'></i>{" "}
                          Shimla
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='option-modal'>
                {this.state.src && (
                  <MDBContainer>
                    <MDBModal
                      isOpen={this.state.modal12}
                      toggle={this.toggle(12)}>
                      <MDBModalHeader toggle={this.toggle(12)}>
                        Crop Image
                      </MDBModalHeader>
                      <MDBModalBody id='modal-body'>
                        <ReactCrop
                          id='image-crop'
                          src={this.state.src}
                          crop={crop}
                          ruleOfThirds
                          onImageLoaded={this.onImageLoaded}
                          onComplete={this.onCropComplete}
                          onChange={this.onCropChange}
                        />
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn
                          outline
                          color='elegant'
                          onClick={this.toggle(12)}>
                          Close
                        </MDBBtn>
                        <MDBBtn
                          outline
                          color='primary'
                          onClick={() => this.handleImageUpload(12, 2)}>
                          Upload Image
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModal>
                  </MDBContainer>
                )}
              </div>

              <div className='modal-div'>
                <MDBContainer>
                  <MDBModal
                    isOpen={this.state.modal14}
                    toggle={this.toggle(14)}
                    centered>
                    <MDBModalHeader toggle={this.toggle(14)}>
                      Update Profile Picture
                    </MDBModalHeader>
                    <MDBModalBody id='modal-body'>
                      <img
                        id='file-upload'
                        src='https://cdn3.iconfinder.com/data/icons/cloudcon-colored/512/upload-512.png'
                        alt=''
                        width='250'
                        height='250'
                      />
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn
                        outline
                        color='secondary'
                        onClick={() => this.handlePicture(14, 12)}>
                        Upload From Device
                      </MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
                </MDBContainer>
              </div>
              <input
                onChange={(event) => this.handleImage(event)}
                type='file'
                id='filePicture'
                accept='image/*'
              />
            </div>
          </div>
        ) : (
          <div>{/* <Redirect to='/login' Component={Login} /> */}</div>
        )}
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  console.log("in profile", state.user.google);
  return {
    login: state.user.login,
    user: state.user.user,
    google: state.user.google,
  };
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators({ verifyToken }, dispatch);
};

export default connect(getDataFromRedux, giveDataToRedux)(Profile);
