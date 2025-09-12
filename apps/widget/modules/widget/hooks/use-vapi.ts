import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
    role: "user" | "assistant";
    text: string;
}

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {
        // TEST API KEY, customer will provide their own
        const vapiInstance = new Vapi("e0748f90-6e4e-4dea-8f70-98f6869daae1");
        setVapi(vapiInstance);
        
        vapiInstance.on("call-start", ()=>{
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
        })
        vapiInstance.on("call-end", ()=>{
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        })
        vapiInstance.on("speech-start", ()=>{
            setIsSpeaking(true);
        })
        vapiInstance.on("speech-end", ()=>{
            setIsSpeaking(false);
        })
        vapiInstance.on("error", (error)=>{
            console.log("VAPI error", error) ;
            setIsConnecting(false);
        })
        vapiInstance.on("message", (message)=>{
            if(message.type==="transcript" && message.transcriptType==="final"){
                setTranscript(prev=>[...prev, {
                    role: message.role==="user" ? "user" : "assistant",
                    text: message.transcript,
                }])
            }
        });

        return ()=>{
            vapiInstance?.stop();
        }
    },[]);

    const startCall = ()=>{
        setIsConnecting(true);

        if(vapi){
            // TEST API KEY, customer will provide their own assistant id
            vapi.start("be8e1b33-83df-4586-bd1b-a613b420bf8e");
        }
    }
    const endCall = ()=>{
        if(vapi){
            vapi.stop();
        }
    }

    return {
        isSpeaking,
        isConnected,
        isConnecting,
        transcript,
        startCall,
        endCall,
    };
}