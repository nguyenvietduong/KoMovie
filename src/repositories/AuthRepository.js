import apiClient from "../lib/axiosAuth";

class AuthRepository {
  async getAllUsers() {
    try {
      const response = await apiClient.get("/accounts");

      return response.data;
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      return [];
    }
  }

  async findByEmail(email) {
    const users = await this.getAllUsers();

    return users.find((u) => u.email === email);
  }

  async saveUser(user) {
    try {
      const response = await apiClient.post("/accounts", user);

      return response.data;
    } catch (error) {
      console.error("Lỗi khi lưu user:", error);
      return null;
    }
  }

  async login(email, password) {
    try {
      const response = await apiClient.post("/login", { email, password });

      return response.data;
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);

      throw error;
    }
  }

  async register(name, email, password, password_confirmation) {
    try {
      const response = await apiClient.post("/register", { name, email, password, password_confirmation });

      return response.data;
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);

      throw error;
    }
  }
}

export default AuthRepository;