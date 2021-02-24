import React from 'react'
import "./Chat.css"

const Chat = ({curr_user , name , message , url }) =>{
    if(curr_user === name){
        
        return(
            <div className="curr mess">
                <img alt='Avatar' className = "right" src={url} />
                <p>{name}</p>
                <p>{message}</p>
                
            </div>

        )
    }

    else{
      
        return(
            <div className="curr">
                <img  alt="Avatar" src= {url}/>
                <p>{name}</p>
                <p>{message}</p>
                
            </div>


        )
        

    }
    
}

export default Chat 