export default function LoginSignup() {
    return `
        <section class="modal" id="login-signup-modal">
            <div class="modal__container">
                <div class="modal__close">
                    <button aria-label="Close modal">
                        <span class="material-icons-round">close</span>
                    </button>
                </div>

                <!-- Login Form -->
                <div class="auth-view" id="login-view">
                    <header class="modal__header">
                        <h2 class="modal__title">Đăng nhập</h2>
                        <p class="modal__subtitle">
                            Chưa có tài khoản? <a href="#" class="modal__link" data-target="#signup-view">Đăng
                                ký ngay!</a>
                        </p>
                    </header>

                    <form class="auth-form" id="login-form">
                        <div class="auth-form__group">
                            <input type="email" id="login-email" class="auth-form__input" placeholder="Email"
                                required>
                        </div>

                        <div class="auth-form__group">
                            <div class="auth-form__password-wrapper">
                                <input type="password" id="login-password" class="auth-form__input has-icon"
                                    placeholder="Nhập mật khẩu" required>
                                <button type="button" class="auth-form__toggle-password">
                                    <span class="material-icons-round">visibility</span>
                                </button>
                            </div>
                        </div>

                        <button type="submit" class="auth-form__submit-btn">Đăng nhập</button>
                    </form>

                    <div class="modal__divider">
                        <div class="divider"></div>
                        <span>Hoặc đăng nhập với</span>
                        <div class="divider"></div>
                    </div>

                    <button class="social-login-btn">
                        <img src="/assets/img/icon/google-icon.png" alt="Google">
                        <span>Google</span>
                    </button>
                </div>

                <!-- Signup Form -->
                <div class="auth-view" id="signup-view">
                    <header class="modal__header">
                        <h2 class="modal__title">Đăng ký</h2>
                        <p class="modal__subtitle">
                            Đã có tài khoản? <a href="#" class="modal__link" data-target="#login-view">Đăng nhập
                                ngay!</a>
                        </p>
                    </header>

                    <form class="auth-form" id="signup-form">
                        <div class="auth-form__group">
                            <input type="text" id="signup-name" class="auth-form__input" placeholder="Họ và tên"
                                required>
                        </div>

                        <div class="auth-form__group">
                            <input type="email" id="signup-email" class="auth-form__input" placeholder="Email"
                                required>
                        </div>

                        <div class="auth-form__group">
                            <div class="auth-form__password-wrapper">
                                <input type="password" id="signup-password" class="auth-form__input has-icon"
                                    placeholder="Mật khẩu" required minlength="6">
                                <button type="button" class="auth-form__toggle-password">
                                    <span class="material-icons-round">visibility</span>
                                </button>
                            </div>
                        </div>

                        <div class="auth-form__group">
                            <div class="auth-form__password-wrapper">
                                <input type="password" id="signup-confirm-password" class="auth-form__input has-icon"
                                    placeholder="Xác nhận mật khẩu" required minlength="6">
                                <button type="button" class="auth-form__toggle-password">
                                    <span class="material-icons-round">visibility</span>
                                </button>
                            </div>
                        </div>

                        <button type="submit" class="auth-form__submit-btn">Đăng ký</button>
                    </form>

                    <div class="modal__divider">
                        <div class="divider"></div>
                        <span>Hoặc đăng ký với</span>
                        <div class="divider"></div>
                    </div>

                    <button class="social-login-btn">
                        <img src="/assets/img/icon/google-icon.png" alt="Google">
                        <span>Google</span>
                    </button>
                </div>
            </div>
        </section>
    `;
}