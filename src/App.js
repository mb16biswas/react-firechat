import React, {Component} from 'react'
import {db} from "./Components/Firebaseconfig/firebaseconfig"
import {firebase} from "./Components/Firebaseconfig/firebaseconfig"
import "./App.css"
import Landingpage from "./Components/Landingpage/Landingpage"
import Navbar from "./Components/Navbar/Navbar"
import Message from "./Components/Message/Message"

class App extends Component{
 constructor(){
   super()
   this.state = {
     data : "", 
     message : [] , 
     cur_user : "" , 
     status : "signout",
     url : "" , 
     email : "" , 
     rooms : [] , 
     your_rooms : [] , 
     
        }

  }
  
  
  createroom = () =>{
    let room = prompt("Enter your room name")
    let password = prompt("enter your password")
    const rooms = this.state.rooms
    if(room !== null && password !== null){
       room = room.trim()
       password = password.trim()
      
      if(room.length > 4 && password.length > 4 ){
       
        let i 
      
        if(rooms.includes(room) === true){
          alert("this room is already taken")
        }

        else{
          
            db.collection("Room").doc(room).set({
      
     
             timestamp : Date.now() , 
             password :  password 
          })

           db.collection(`Room/${room}/rooms`).add({
              message : "Hola..." , 
              name : this.state.cur_user ,
              timestamp : Date.now() , 
              url : this.state.url
          })

          db.collection(`User/${this.state.email}/rooms`).add({
              room : room , 
              timestamp : Date.now()
        })

        }
       

 }
      else{
        alert("your room and password must contain more than 4 words")
      }

    }
    }





  joinroom = () =>{
    const room = prompt("Enter your room name")
    const password  = prompt("Enter your password")
    const your_rooms = this.state.your_rooms 
    const rooms = this.state.rooms 


    
    if(room !== null && password !== null){
      if(your_rooms.includes(room) === true){
        console.log("you alredy exit")
          
      }
      else{
        
        let i 
        for(i = 0 ; i < rooms.length ; ++i){
          if(room === rooms[i] ){
            db.collection("Room").doc(room).onSnapshot((snap) =>{
              const pass = [snap].map(doc => doc.data().password)
              
              if(pass[0] === password){
                db.collection(`User/${this.state.email}/rooms`).add({
                  room : room
                  })
        
               }
              else{
                alert("invalid")
               
              }
        
             })
  
          }
          }
        } }
      }


  signup = () =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
     
     
    }).catch((error) => {
      console.log(error)
      
    });
  

  
  }

  signout = () =>{
    firebase.auth().signOut().then(() => {
     
      
    }).catch((error) => {
      console.log(error)
     
    });
    
  }

  landingpage = () =>{
    this.setState({status : "land"})
  }
  chatpage = () =>{
    this.setState({status : "chat"})
  }
  unsubscribe1 = null 
  unsubscribe2 = null 




  componentDidMount(){
    

    this.unsubscribe1 = firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        
        
        
        this.setState({cur_user : user.displayName})
        this.setState({status : "land"})
        this.setState({url : user.photoURL})
        this.setState({email : user.email})
        db.collection(`/User/${this.state.email}/rooms`).onSnapshot((snap) =>{
          const your_rooms = snap.docs.map(doc => doc.data().room)
         
         this.setState({your_rooms : your_rooms})
        })

      }
      else{
        
        this.setState({status : "signout"})
      }

    })



    this.unsubscribe2 =  db.collection("Room").onSnapshot((snap) =>{
     
      const rooms = snap.docs.map(doc => doc.id)
      this.setState({rooms : rooms})

    } )
}

componentWillUnmount(){
  this.unsubscribe1()
  this.unsubscribe2()
}




   render(){
     
     
    
     if(this.state.status === "land"){
      

      return(
        <div className = "App">
          <Navbar landingpage = {this.landingpage} chatpage = {this.chatpage} signout = {this.signout}/>
          <Landingpage createroom = {this.createroom} joinroom = {this.joinroom}/>
        </div>  

      )
       
        
       
     }
    
    else if(this.state.status === "chat"){
      return(
        <div className = "App">
          <Navbar landingpage = {this.landingpage} chatpage = {this.chatpage} signout = {this.signout} />
          <Message user = {this.state.cur_user}  url = {this.state.url} email = {this.state.email} />
        </div> 
        )
    } 

    else{
      return(
        <div className = "sign" >
       
              <button className="sign-in" onClick = {this.signup}>Click here to start</button>
              
        </div>
        )
     
    }

   }


    
}

export default App 




