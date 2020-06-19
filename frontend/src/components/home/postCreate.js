import React, { Component } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";

class TabsDefault extends Component {
    state = {
        activeItem: "1"
    };

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    render() {
        return (
            <MDBContainer>
                <MDBNav className="nav-tabs mt-5">
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
                            Post
            </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
                            Image
            </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={this.state.activeItem === "3"} onClick={this.toggle("3")} role="tab" >
                            Poll
            </MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel">
                        <div>
                            <label for="exampleForm2" className="mt-2"><b>Title</b></label>
                            <input type="text" id="exampleForm2" class="form-control"></input><br /><br />
                            <div class="md-form">
                                <i class="fas fa-pencil-alt prefix"></i>
                                <textarea id="form10" class="md-textarea form-control" rows="3"></textarea>
                                <label for="form10">Text</label>
                            </div>
                            <br />
                            <button type="button" class="btn btn-secondary">Post</button>

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
                            <button type="button" class="btn btn-secondary">Post</button>
                        </div>
                    </MDBTabPane>
                    <MDBTabPane tabId="3" role="tabpanel">
                        <label for="exampleForm2" className="mt-2"><b>Title</b></label>
                        <input type="text" id="exampleForm2" class="form-control"></input><br /><br />
                    </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        );
    }
}
export default TabsDefault;