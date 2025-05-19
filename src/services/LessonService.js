export default class LessonService {
  constructor(lessonRepository) {
    this.lessonRepository = lessonRepository;
  }

  async listLessons() {
    return await this.lessonRepository.getAllLessons();
  }

  async getLessonDetail(slug) {
    return await this.lessonRepository.getLessonBySlug(slug);
  }
}
