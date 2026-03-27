import { StreamChat } from "stream-chat";
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("Stream API key or secret is missing!");
}

/**
 * @description by this we can communicate with stream platform
 */
const streamClient = StreamChat.getInstance(apiKey, apiSecret)

/**
 * @description create a user in stream
 * @imp upsertUsers creates user if it is not exists or if exists then it updates
 */
export const upsertStreamUser = async (userData)=>{
    try {
        await streamClient.upsertUsers([userData])
        return userData
    } catch (error) {
        console.error("Error upserting in stream user: ", error);
    }
}