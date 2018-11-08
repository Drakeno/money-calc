export class AuthService {
    private isLogined = false;

    login() {
        this.isLogined = true;
    }

    logout() {
        this.isLogined = false;
        window.localStorage.clear();
    }

    checkLogin(): boolean {
        return this.isLogined;
    }
}