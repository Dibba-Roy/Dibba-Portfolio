import api from '../lib/api'
import {type Project,
        type ProjectResponseRaw
} from '../models/fetchProjectsModel'

export const projectService = {
    async getPersonalProjects(): Promise<Project[]> {
        try{
            const response = await api.get<ProjectResponseRaw>('/api/personal-projects?populate=projectImage');
            return response.data.data as Project[];

        }catch(error){
            throw error;
        }
        
    }
}

