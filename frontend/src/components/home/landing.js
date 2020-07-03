import React from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Navbar from '../navbar/navbar'
import Posts from '../posts_component/posts_component'
import '../../styles/landing.css'
class Land extends React.Component {
    render() {
        console.log("From Landing page", this.props.state)
        return (
            <div>
                <nav className="mb-2"><Navbar /></nav>
                <article className="row">
                    {this.props.state.user.article == null ? <div></div> : this.props.state.user.article.map((el, i) => {
                        return (
                            <div className="card  mt-3" key={i} style={{ width: "20rem" }} >
                                <img className="card-img-top" style={{ height: "25rem" }} src={el.image} alt="Card image cap" />
                                <div className="card-body elegant-color white-text" style={{ height: "9.5rem" }}>
                                    <h6 className="card-title text-sm-left"><a>{el.title}</a></h6>
                                    <p className="text-center"><a target="_blank" rel="noopener noreferrer" href={el.post}> See post</a></p>
                                </div>
                            </div>
                        )
                    })}
                </article>
                <div className='row'>
                    <div className="col-8 main" >
                        <Posts />
                    </div>
                    <div className="col-4 side">
                    </div>
                </div>
            </div>

        )
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
export default connect(mapStateToProps, mapDispatchToProps)(Land)