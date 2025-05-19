import phimapiClient from "../lib/axiosSearch";

const SearchMovieRepository = {
    searchMovies(params) {
        const query = new URLSearchParams(params).toString();
        return phimapiClient.get(`/tim-kiem?${query}`).then(res => res.data);
    },

    getListMovies({ type_list, ...rest }) {
        const query = new URLSearchParams(rest).toString();
        return phimapiClient.get(`/danh-sach/${type_list}?${query}`).then(res => res.data);
    }
};

export default SearchMovieRepository;
