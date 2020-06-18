import React from 'react'
import Navbar from '../navbar/navbar'
import '../../styles/landing.css'
import Create from './postCreate'
class Land extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <div className='row'>
                        <div className="col-8 main" >

                        </div>
                        <div className="col-4 side">

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Land