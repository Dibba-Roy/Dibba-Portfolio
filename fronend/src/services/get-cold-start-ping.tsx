import api from '../lib/api'
import {type PingResponse} from '../models/fetchServerPingModel'

export const coldStartPingService = {
    async pingServer(): Promise<PingResponse>{
        try {
            const response = await api.get<PingResponse>('/ping')
            return response.data as PingResponse;
        } catch (error){
            console.error(error);
            throw error;
        }
    }
}