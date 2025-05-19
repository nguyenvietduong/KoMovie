import apiClient from "../lib/axios";

export default class LessonRepository {
    async getAllLessons() {
        const response = await apiClient.get("/lessons");
        return response.data;
    }

    async getLessonBySlug(slug) {
        const response = await apiClient.get(`/lessons/${slug}`);
        return response.data;
    }
}
