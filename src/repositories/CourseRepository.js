import apiClient from "../lib/axios";

export default class CourseRepository {
    async getAllCourses() {
        const response = await apiClient.get("/courses");
        return response.data;
    }

    async getCourseBySlug(slug) {
        const response = await apiClient.get(`/courses/${slug}`);
        return response.data;
    }
}
