import SearchMovieRepository from "../repositories/SearchMovieRepository";

class SearchMovieService {
    constructor(repository) {
        this.repository = repository;
    }

    searchMovies(params) {
        return this.repository.searchMovies(params);
    }

    getListMovies(params) {
        return this.repository.getListMovies(params);
    }
}

export default SearchMovieService;
