import phimapiClient from "../lib/axios";

const MovieRepository = {
  getNewMovies: (page = 1) => {
    return phimapiClient
      .get(`/phim-moi-cap-nhat-v3?page=${page}`)
      .then((res) => res.data);
  },
};

export default MovieRepository;
