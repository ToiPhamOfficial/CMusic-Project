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

export function initLoginSignupEvents() {
    const $modal = $('#login-signup-modal');
    const $views = $('.auth-view');

    // Hàm chuyển đổi view linh hoạt
    function switchAuthView(viewId) {
        $views.removeClass('active');
        $(`${viewId}`).addClass('active');
    }

    // 1. Mở modal (mặc định luôn hiện login) - Sử dụng event delegation
    $(document).on('click', '.mini-user-profile.is-guest', function () {
        $modal.addClass('is-shown');
        switchAuthView('#login-view');
    });

    // 2. Chuyển đổi qua lại giữa Đăng nhập/Đăng ký (Sử dụng ID từ href)
    // Giả sử HTML: <a href="#signup-view" class="modal__link">Đăng ký ngay!</a>
    $(document).on('click', '.modal__link', function (e) {
        e.preventDefault();
        const targetView = $(this).attr('data-target');
        console.log('Switching to view:', targetView);
        if (targetView) {
            switchAuthView(targetView);
        }
    });

    // 3. Đóng modal (Vừa bấm nút Close vừa bấm ra ngoài Overlay)
    $modal.on('click', function (e) {
        const isCloseBtn = $(e.target).closest('.modal__close button').length > 0;
        const isOverlay = $(e.target).is($modal);

        if (isCloseBtn || isOverlay) {
            $modal.removeClass('is-shown');
        }
    });

    // Toggle password visibility - Sử dụng event delegation
    $(document).on('click', '.auth-form__toggle-password', function () {
        const $passwordInput = $(this).siblings('input[type="password"], input[type="text"]');
        const type = $passwordInput.attr('type') === 'password' ? 'text' : 'password';
        $passwordInput.attr('type', type);
        $(this).find('span').text(type === 'password' ? 'visibility' : 'visibility_off');
    });

    $(document).on('submit', '.auth-form', function (e) {
        e.preventDefault();
        // if(!$(this).valid) {
        //     console.log('Form is valid, proceeding...');
        //     return;
        // }
        const isLogin = $(this).attr('id') === 'login-form';
        if (isLogin) {
            // Handle login
            const email = $('#login-email').val().trim();
            const password = $('#login-password').val().trim();
            const loginResult = auth.handleLogin(email, password);
            Toast[loginResult.type](loginResult.message);

            if (loginResult.success) {
                // Đóng modal
                $modal.removeClass('is-shown');
                // Re-render Header để hiển thị thông tin user
                $('.header').html(Header());
                // Reset form
                $(this)[0].reset();
            }

        } else {
            // Handle signup
            const name = $('#signup-name').val().trim();
            const email = $('#signup-email').val().trim();
            const password = $('#signup-password').val().trim();
            const confirmPassword = $('#signup-confirm-password').val().trim();
            const signupResult = auth.handleSignup(name, email, password, confirmPassword);
            Toast[signupResult.type](signupResult.message);

            if (signupResult.success) {
                // Đóng modal
                $modal.removeClass('is-shown');
                // Re-render Header để hiển thị thông tin user
                $('.header').html(Header());
                // Reset form
                $(this)[0].reset();
            }
        }
    });
}