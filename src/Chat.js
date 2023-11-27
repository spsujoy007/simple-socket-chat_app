import React, { useEffect, useState } from 'react';
import { } from "react-icons/fa";
import { AiFillCheckCircle, AiOutlineSend } from "react-icons/ai";
import ScrollToBottom from 'react-scroll-to-bottom'
import './Chat.css'

const Chat = ({socket, room, userName}) => {

    const [errorMsg, setErrorMsg] = useState(false)
    const [messagesList, setMessagesList] = useState([])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        const message = e.target.message.value;
        
        if(message !== ""){
            const messageBody = {
                room,
                message,
                username: userName,
                date_time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", {messageBody})
            setMessagesList((list) => [...list, messageBody])
            setErrorMsg(false)
            e.target.reset()
        }
        else{
            setErrorMsg(true)
        }
    }

    useEffect( () => {
        socket.on("recive_message", (data) => {
            console.log("Recive msg:", data)
            setMessagesList((list) => [...list, data])
        })
    }, [socket])
    
    
    return (
        <div>
            <div>

                <h1 className='lg:text-[40px] text-[30px] uppercase'>Welcome to the chat! <span className='text-indigo-500 font-bold'>"{userName}"</span></h1>

                <form onSubmit={handleSendMessage}>
                <div className='w-[400px] mx-auto mt-10'>
                    <div className={`p-2 bg-indigo-500 text-xl rounded-t-md text-left text-white flex items-center gap-x-3
                     uppercase`}>Live Chat <AiFillCheckCircle></AiFillCheckCircle>
                     </div>

                    {/* message body  */}
                    <div className='bg-white  p-3'>
                        {/* {messages?.messageBody?.message} */}
                        <ScrollToBottom className='h-[400px] overflow-x-hidden'> 
                        {
                            messagesList.map((msg, i) => <div className={`mt-5 scroll-mb-0 ${msg.username === userName ? "flex justify-end text-right" : "flex justify-start text-left"}`} key={i}>
                                <div>
                                <span className='bg-indigo-500 mt-2 text-white p-2 rounded-md '>{msg.message}</span>
                                <div className='flex items-center mt-2 text-sm gap-x-2 text-indigo-300'>
                                    <p>{msg.date_time}</p>
                                    <p className={`font-semibold`}>{msg.length < 15 ? <span>{msg.username}</span> : <span>{msg.username.slice(0, 15)}</span>} </p>
                                </div>
                                </div>
                            </div>) 
                        }
                        </ScrollToBottom>
                    </div>

                    <div className='flex items-center rounded-b-md overflow-hidden pt-1'>
                        <input required name="message" className='w-full p-2 outline-none' type="text" placeholder='type your message...' />
                        <button className='text-2xl  bg-indigo-500 text-white py-2 px-4' type='submit'>
                            <AiOutlineSend></AiOutlineSend>
                        </button>
                    </div>
                    <div>
                        {errorMsg && <p className='text-left text-sm text-red-500'>Please write something!</p>}
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;