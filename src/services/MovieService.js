import MovieRepository from "../repositories/MovieRepository";

const MovieService = {
  fetchNewMovies: async (page = 1) => {
    try {
      const data = await MovieRepository.getNewMovies(page);

      return data;
    } catch (error) {
      console.error("Error fetching new movies:", error);
      throw error;
    }
  },
};

export default MovieService;
