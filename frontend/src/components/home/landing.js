import React from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Navbar from '../navbar/navbar'
import '../../styles/landing.css'
class Land extends React.Component {
    render() {
        console.log("From Landing page", this.props.state)
        return (
            <div>
                <nav><Navbar /></nav>
                <article>
                    {this.props.state.user.article == null ? <div></div> : this.props.state.user.article.map((el, i) => {
                        return (
                            <div className="card" key={i} >
                                <img className="card-img-top" src={el.image} alt="Card image cap" />
                                <div className="card-body elegant-color white-text">
                                    <h4 className="card-title"><a>{el.title}</a></h4>
                                    <p className="card-text">{el.text}</p>
                                    <p className="text-center"><a target="_blank" rel="noopener noreferrer" href={el.post}> See post</a></p>
                                </div>
                            </div>
                        )
                    })}
                </article>
                <div className='row'>
                    <div className="col-8 main" >

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