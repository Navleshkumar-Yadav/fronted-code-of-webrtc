import SocketIoClient from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import {v4 as UUIDv4 } from "uuid";

const ws_Server = "http://localhost:5500";
export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(ws_Server,{
        withCredentials: false,
        transports:["polling","websocket"]

});

interface Props{

       children: React.ReactNode 
}
export const SocketProvider: React.FC<Props> = ({children}) =>{
        const navigate = useNavigate();
        const [user, setUser] =useState<Peer>();
        const fetchParticipantList = ({roomId,participants}:{roomId: string,participants: string[]}) =>{
                console.log("Fetched from participants");
                console.log(roomId,participants);
        }
     
        useEffect(()=> {
                const userID = UUIDv4();
                const newPeer = new Peer(userID);
                setUser(newPeer);
                const enterRoom =({roomId}: {roomId:string}) =>{

                
                        navigate(`/room/${roomId}`);
                }
                socket.on("room-created",enterRoom);
                socket.on("get-users",fetchParticipantList);
               
         


        },[]);
        return(
                <SocketContext.Provider value={{socket,user}}>
                {children}
                </SocketContext.Provider>
        );
}