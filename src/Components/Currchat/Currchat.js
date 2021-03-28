import React , {Component} from 'react'
import {db} from "../Firebaseconfig/firebaseconfig"
import {TextField} from '@material-ui/core'
import Chat from "../Chat/Chat"
import Scroll from "../Scroll/Scroll"
import firebase from "firebase"



class Currchat extends Component{
    constructor(props){
        super(props)
        this.state = {
           
            id : this.props.id  , 
            user : this.props.user , 
            message : [] , 
            data : "" , 
            url : this.props.url
          
        }
     
       }


    change = (e) =>{
        this.setState({data :e.target.value })
      }
         

    sendmess = () =>{
        
   
        db.collection(`/Room/${this.state.id}/rooms`).add({
          message : this.state.data , 
          name : this.state.user ,
          timestamp : firebase.firestore.FieldValue.serverTimestamp() ,
          url : this.state.url
          
    
        })
        this.setState({data : ""})
       
    
      } 
    
    unsubscribe = null   

    componentDidMount(){
       
         this.unsubscribe  = db.collection(`/Room/${this.state.id}/rooms`).orderBy("timestamp" , "desc").onSnapshot((snap) =>{
            
            const data = snap.docs.map((doc) =>{
              return(
                {
                  id : doc.id , 
                  message : doc.data().message , 
                  name : doc.data().name , 
                  timestamp : doc.data().timestamp , 
                  url : doc.data().url
                }
              )
            })
           
           
            this.setState({message : data})
            
          })
          
    }

    componentWillUnmount(){

        this.unsubscribe()

    }
  
    
    render(){
      
       

        return(
            <div className = "chat">
                  <button onClick = {this.props.main}>{this.state.id}</button>
                  <TextField className = "type" label='enter your message' placeholder='type........' 
                                        onChange={this.change}
                                        value = {this.state.data} 
                                        style = {{padding : 20}}/>

                  <button onClick = {this.sendmess}>send to the group</button>
                  <Scroll>
                      <div>
                        {
                          this.state.message.map((doc) =>{
                            
                            return(
                              <div key = {doc.id}>
                                <Chat   curr_user = {this.state.user} name = {doc.name}  message = {doc.message} url  = {doc.url} />
                              
                              </div>  
                            )
                          })
                        }
 
                      </div> 

                   </Scroll>
         
       
                
         
            </div>
            
        )
}

}
export default Currchat


