import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import { useContext,useEffect } from "react";
import UserFeedPlayer from "../Components/UserFeedPlayer";

const Room: React.FC= () => {
        const {id} = useParams();
        const {socket,user,stream} = useContext(SocketContext);
    
        useEffect(()=>{
               if(user) {
                console.log("New user with id",user._id,"has joined room",id)

               
                socket.emit("joined-room",{roomId:id,peerId: user._id});
               
               
               }
        },[id,user, socket]);
        return(
                <div>
                        room: {id}
                        <UserFeedPlayer stream ={stream}/>
                </div>
        )
}
export default Room;