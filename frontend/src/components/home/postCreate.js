import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import '../../styles/landing.css'
import Navbar from '../navbar/navbar'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBBtn, MDBAlert } from "mdbreact";

class TabsDefault extends Component {
    state = {
        activeItem: "1",
        title: "",
        text: "",
        pic: "",
        option: ['', '', ''],
        error: "",
        post_error: "",
        image_error: "",
        poll_error: ""
    };

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };
    pollEvent = (el, i, event) => {
        this.state.option[i] = event.target.value
        this.setState({ option: this.state.option })
    }
    postAction = () => {
        if (this.state.title === "") {
            this.setState({ error: "Empty Title" })
        }
        let tab = Number(this.state.activeItem)
        if (tab == 1) {
            if (this.state.text === "") {
                this.setState({ post_error: "Empty Text Field" })
            }
        }
        if (tab == 2) {
            if (this.state.pic === "") {
                this.setState({ image_error: "Please select a File" })
            }
        }
        if (tab == 3) {
            if (this.state.option[0] === "" && this.state.option[1] === "") {
                this.setState({ poll_error: "Minimum Two Inputs" })
            }
        }
        console.log(this.state.activeItem)
    }
    render() {
        console.log("Create Post", this.state)
        return (
            <div>
                <nav className="mb-2"><Navbar /></nav>
                <div className='row'>
                    <div className="col-8 ml-3" >
                        <MDBContainer id="create" >
                            <MDBNav className="nav-tabs mt-5">
                                <MDBNavItem>
                                    <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
                                        <b><strong>Post</strong></b>
                                    </MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink link to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
                                        <b><strong>Image</strong></b>
                                    </MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink link to="#" active={this.state.activeItem === "3"} onClick={this.toggle("3")} role="tab" >
                                        <b><strong>Poll</strong></b>
                                    </MDBNavLink>
                                </MDBNavItem>
                            </MDBNav>
                            <MDBTabContent activeItem={this.state.activeItem} >
                                <MDBTabPane tabId="1" role="tabpanel">
                                    <div>
                                        <label for="exampleForm2" className="mt-2"><b>Title</b></label>
                                        <input type="text" id="exampleForm2" class="form-control" onChange={(e) => {
                                            this.setState({ title: e.target.value })
                                        }}></input><br /><br />
                                        <CKEditor editor={ClassicEditor} onChange={(event, editor) => {
                                            this.setState({ text: editor.getData() })
                                        }} />
                                        {this.state.post_error === "" ? <br /> :
                                            <MDBAlert color="warning">
                                                <strong>{this.state.post_error}</strong> You should check in on some of those fields above.
                                            </MDBAlert>
                                        }
                                        <button type="button" class="btn btn-secondary" onClick={() => this.postAction()} >Post</button>
                                    </div>
                                </MDBTabPane>
                                <MDBTabPane tabId="2" role="tabpanel">
                                    <div>
                                        <label for="exampleForm2" className="mt-2"><b>Title</b></label>
                                        <input type="text" id="exampleForm2" class="form-control"></input><br /><br />
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                            </div>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" id="inputGroupFile01"
                                                    aria-describedby="inputGroupFileAddon01" />
                                                <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                            </div>
                                        </div>
                                        {this.state.image_error === "" ? <br /> :
                                            <MDBAlert color="warning">
                                                <strong>{this.state.image_error}</strong> You should check in on some of those fields above.
                                            </MDBAlert>
                                        }
                                        <button type="button" class="btn btn-secondary" onClick={() => this.postAction()} >Post</button>
                                    </div>
                                </MDBTabPane>
                                <MDBTabPane tabId="3" role="tabpanel">
                                    <label for="exampleForm2" className="mt-2"><b>Title</b></label>
                                    <input type="text" id="exampleForm2" class="form-control"></input>
                                    <label for="exampleForm2" className="mt-2"><b>Options</b></label>
                                    <MDBBtn disabled={this.state.option.length >= 6} color="dark-green ml-3" size="sm" onClick={() => this.setState({
                                        option: [...this.state.option, '']
                                    })} >Add Options</MDBBtn>
                                    <MDBBtn disabled={this.state.option.length <= +2} color="dark-green" size="sm" onClick={() => {
                                        this.state.option.pop()
                                        this.setState({ option: this.state.option })
                                    }} >Remove Options</MDBBtn>
                                    <ol>
                                        {this.state.option.map((e, i) => {
                                            return (
                                                <li>
                                                    <input type="text" id="exampleForm2" class="form-control" onChange={(event) => this.pollEvent(e, i, event)}></input>
                                                </li>
                                            )
                                        })}
                                    </ol>
                                    {this.state.poll_error === "" ? <br /> :
                                        <MDBAlert color="warning">
                                            <strong>{this.state.poll_error}</strong> You should check in on some of those fields above.
                                            </MDBAlert>
                                    }
                                    <button type="button" class="btn btn-secondary" onClick={() => this.postAction()} >Post</button>
                                </MDBTabPane>
                            </MDBTabContent>
                        </MDBContainer>
                    </div>
                    <div className="col-4">

                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        state: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(TabsDefault)