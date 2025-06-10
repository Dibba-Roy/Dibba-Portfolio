import api from "../lib/api";
import {
  type WorkExperiencResponseRaw,
  type WorkExperience,
} from "../models/fetchWorkHistoryModel";

export const workHistoryService = {
  async getExperiences(): Promise<WorkExperience[]> {
    try {
      const response = await api.get<WorkExperiencResponseRaw>("/work-experiences");
      return response.data.data as WorkExperience[];
    } catch (error) {
      console.error("Error fetching work experiences:", error);
      throw error;
    }
  },
};
