import React from "react";
import "../../styles/profile.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "react-image-crop/dist/ReactCrop.css";
import Navbar from "../navbar/navbar";
import ReactCrop from "react-image-crop";
import { storage } from "../../config/firebase_config";
import { getCroppedImg } from "./crop_image/image_cropper";
import Login from "../login/login";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Forbidden from "../forbidden/forbidden";
import { Redirect } from "react-router-dom";
import { verifyToken, sendImageUrl } from "../../actions/register_action";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProfileTabs from "../profile/tabs/tabs";
import InfoCard from "./info_card/infocard";
import {
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
      login: false,
      progress: 0,
      src: null,
      loading: false,
      timeout: true,
      crop: {
        unit: "%",
        width: 30,
        height: 40,
        aspect: 16 / 14,
      },
    };
  }

  componentDidMount = () => {
    this.props.verifyToken();
    this.handleImage = this.handleImage.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    // console.log("login", this.props.login);
  };

  toggle = (nr) => () => {
    console.log("NR3", nr);
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
      src: null,
    });
  };

  handleImageUpload = (nr, pr, email) => {
    this.setState({
      loading: true,
    });
    let useremail = email;
    const { croppedImageUrl } = this.state;
    console.log("target :", croppedImageUrl);
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
            this.setState({ url: url, loading: false });
            console.log(url);
            this.props.sendImageUrl({ url: url, email: useremail });
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

  timeout = () => {
    setTimeout(() => {
      this.setState({
        timeout: false,
      });
    }, 1000);
  };

  handlePicture = (nr, mr) => {
    console.log(nr, mr);
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

  handleImage = (e) => {
    console.log("in handle image", e);
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

  render() {
    const { crop } = this.state;
    // console.log("progress", this.props.login, this.props.user.email);
    return (
      <div>
        <div>
          <Navbar />
          <div className='the-bg'></div>
          {this.props.login ? (
            <div>
              <div className='main_profile'>
                <div className='user-contents'>
                  <div className='nav-div'>
                    <ProfileTabs toggle={this.toggle(14)} />
                  </div>
                  <div className='pp-div'>
                    <InfoCard loading={this.state.loading} />
                  </div>
                </div>
                <div className='option-modal'>
                  {this.state.src && (
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
                          onClick={() =>
                            this.handleImageUpload(12, 2, this.props.user.email)
                          }>
                          Upload Image
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModal>
                  )}
                </div>
                <div className='modal-div'>
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
            <div></div>
          )}
        </div>
        <div></div>
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  // console.log("in profile", state.user.google);
  return {
    login: state.user.login,
    user: state.user.user,
  };
};

const giveDataToRedux = (dispatch) => {
  return bindActionCreators({ verifyToken, sendImageUrl }, dispatch);
};

export default connect(getDataFromRedux, giveDataToRedux)(Profile);
