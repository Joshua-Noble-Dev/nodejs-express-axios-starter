import axios, { AxiosResponse } from "axios";
import { JobRolesResponse } from "../models/JobRolesResponse";

const backend = axios.create({
	baseURL: process.env.API_URL || 'http://localhost:8080',
});

export const URL: string = "/api/job-roles/";

export const getJobRoles = async (): Promise<JobRolesResponse[]> => {
    try {
        const response: AxiosResponse = await backend.get(URL);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get Job Roles');
    }
}
