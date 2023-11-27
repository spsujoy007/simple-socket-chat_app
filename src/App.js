import './App.css';
import io from "socket.io-client"
import './index.css'
import {useEffect, useState} from 'react'
import Chat from './Chat';

const socket = io.connect('http://localhost:3001')

function App() {

  const [showChat, setShowChat] = useState(false)

  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState("")

  const handleJoinRoom = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const roomno = e.target.roomNo.value;
    
    if(roomno !== "" && name !== ""){
      try{
        socket.emit("join_room", {roomno})
      }
      finally{
        setShowChat(true)
      }
    }
  }
  
  
  return (
    <div className="App bg-indigo-100 min-h-screen">
        <div className='flex items-center justify-center min-h-screen'>
          {
            !showChat ?
            <div>
            <h1 className='lg:text-[60px] text-[30px] uppercase'>Let's join in a <span className='text-indigo-500 font-bold'>chat!</span></h1>
            
            <form onSubmit={handleJoinRoom}>
            <div className='w-[300px] mx-auto mt-10'>
              
              <div className='flex flex-col'>
                <label htmlFor="" className='label text-left text-indigo-500'>Room ID</label>

                <input name='roomNo' required onChange={(e) => {
                  setRoom(e.target.value)
                }} className='border-b-2 bg-indigo-100 border-indigo-500 outline-none h-10 text-lg placeholder:text-indigo-300' type="text" placeholder='create or join in a room'/>
                {room.length ? room.length < 3 ? <p className='text-left text-red-500'>!type atleast 3 character</p> : <p className='text-left text-green-500'>Great!</p> : '' }
              </div>

              <div className='flex flex-col mt-5'>
                <label htmlFor="" className='label text-left text-indigo-500'>Your name</label>

                <input name='name' required onChange={(e) => {
                  setUserName(e.target.value)
                }} className='border-b-2 bg-indigo-100 border-indigo-500 outline-none h-10 text-lg placeholder:text-indigo-300' type="text" placeholder='type your name here...'/>
              </div>

            <button type='submit' className='text-white bg-indigo-500 mt-3 w-full py-3 text-xl uppercase rounded-md hover:bg-indigo-700 duration-300'>Join</button>

            </div>
            </form>


          </div>
          :
          <>
            <Chat 
            socket={socket}
            userName={userName}
            room={room}
            ></Chat>
          </>
          }
        </div>
    </div>
  );
}

export default App;
