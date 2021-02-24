import React from 'react'
import "./Landingpage.css"

const Landingpage = ({createroom , joinroom}) =>{
    return(
        <div>
            
            <div className="container darker" onClick = {createroom}>
                <h1>Create room</h1>
               
                
            </div> 
            
            <div className="container" onClick = {joinroom} >
                <h1>Join room</h1>
               
                
            </div>

        </div>
    )
    
    
}

export default Landingpage



