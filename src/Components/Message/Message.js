import React , {Component} from 'react'
import {db} from "../Firebaseconfig/firebaseconfig"
import Messcom from "../Messcom/Messcom"
import Currchat from "../Currchat/Currchat"
import Scroll from "../Scroll/Scroll"
import {TextField} from '@material-ui/core'



class Message extends Component{
    constructor(props){
        super(props)
        this.state = {
            rooms : [] , 
            status : "main" , 
            id : "" , 
            user : this.props.user , 
            url : this.props.url , 
            email : this.props.email , 
            search : ""
          
        }
     
       }


    unsubscribe = null 
       
    componentDidMount(){
        
        this.unsubscribe =   db.collection(`/User/${this.state.email}/rooms`).onSnapshot((snap) =>{
     
            const rooms = snap.docs.map((doc) =>{
                return(
                    {
                        id : doc.id , 
                        room : doc.data().room 
                    }
                )
            })
            this.setState({rooms : rooms})
      
          } )

        


    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    main = () =>{
        this.setState({status : "main"})
    }


    check = (id) =>{
        this.setState({id : id})
        this.setState({status : "chat"})
       
    }

    change = (e) =>{
        this.setState({search : e.target.value})

    }
    render(){
        const {rooms , search} = this.state 
        



        
        if(this.state.status === "main"){
            const filteredRooms = rooms.filter(room =>{
                return room.room.toLowerCase().includes(search.toLowerCase());
              })
            return(
               <div>
                    <TextField className = "type" label='search rooms' placeholder='search' 
                                        onChange={this.change}
                                        value = {this.state.search} 
                                        style = {{padding : 20}}/>

                    <Scroll>
                        <div>
                            {
                                filteredRooms.map((room) =>{
                    
                                    return(
                                        <div key = {room.id} onClick = {() => this.check(room.room)} >
                                            <Messcom    room = {room.room}   />
    
                                        </div>
                                        )
                                    })
                            }
    
                        </div>      
                    

                </Scroll>

               </div> 
                
              
            )

        }
        else{
            return(
                <div className = "chat"  >
                    <Currchat id = {this.state.id} user = {this.state.user}  url = {this.state.url} main = {this.main} />
                    
                </div>

            )
        }
        
        
    }

}
export default Message 


