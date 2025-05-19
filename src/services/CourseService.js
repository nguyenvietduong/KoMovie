export default class CourseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }

    async listCourses() {
        const courses = await this.courseRepository.getAllCourses();

        return courses;
    }

    async getCourseDetail(slug) {
        const course = await this.courseRepository.getCourseBySlug(slug);
        return course;
    }
}