import UserRepository from "../repositories/AuthRepository";

class AuthService {
    constructor() {
        this.userRepo = new UserRepository();
    }

    async getAllAccounts() {
        try {
            const users = await this.userRepo.getAllUsers();
            console.log(users);
            return users;
        } catch (error) {
            throw new Error("Lỗi khi lấy danh sách người dùng");
        }
    }

    // Function Login
    async login(email, password) {
        try {
            const response = await this.userRepo.login(email, password);

            return response;
        } catch (error) {
 
            throw new Error(error.message || "Đăng nhập thất bại");
        }
    }

    async register(name, email, password, password_confirmation) {
        try {
            const response = await this.userRepo.register(name, email, password, password_confirmation);

            return response;
        } catch (error) {
 
            throw new Error(error.message || "Đăng ký thất bại");
        }
    }
}

export default AuthService;
