import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ userAccountName: '', password: '' });

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleValidate = (e: any) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = { userAccountName: '', password: '' };

        if (!email) {
            newErrors.userAccountName = 'Tài khoản không được để trống';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Mật khẩu không được để trống';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
            isValid = false;
        } else if (/\s/.test(password)) {
            newErrors.password = 'Mật khẩu không được chứa dấu cách';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (e: any) => {
        if (handleValidate(e)) {
            const fetchLogin = async () => {
                const baseUrl: string = `http://localhost:8000/auth/access`;
                const response = await fetch(baseUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userAccountName: email, password: password }),
                });

                const responseJson = await response.json();
                if (!response.ok) {
                    const errorMessage = await responseJson.message;
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        userAccountName: errorMessage,
                        password: errorMessage,
                    }));
                }

                const responseData = responseJson.result;

                const loadedData: TokenResponseModel = {
                    accessToken: responseData.accessToken,
                    refreshToken: responseData.refreshToken,
                    roles: responseData.roles,
                    userId: responseData.userId,
                };
                localStorage.setItem('authToken', JSON.stringify(loadedData));
                if (loadedData) {
                    navigate('/products');
                }
            };
            fetchLogin().catch((error) => {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    userAccountName: 'Mẩu khẩu hoặc tài khoản sai!',
                    password: 'Mẩu khẩu hoặc tài khoản sai!',
                }));
                console.log(error);
            });
        } else {
            console.log('Form is invalid');
        }
    };

    return (
        <div className="container_page_register body_signup">
            <div className="register_image_container">
                <img src="/images/login/haui-logo-rmbg.png" alt="Logo" className="register_logo" />
            </div>
            <div className="register_container">
                <div className="register_box">
                    <h2>Đăng nhập tài khoản</h2>
                    <form style={{padding: 18}}>
                        <div className="register_input_group">
                            <label htmlFor="email">Tên Tài Khoản:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ textTransform: 'none' }}
                            />
                            {errors.userAccountName && (
                                <p className="error" style={{ color: 'red', marginTop: '3px' }}>
                                    {errors.userAccountName}
                                </p>
                            )}
                        </div>
                        <div className="register_input_group">
                            <label htmlFor="password">Mật khẩu:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ textTransform: 'none' }}
                            />

                            {errors.password && (
                                <p className="error" style={{ color: 'red', marginTop: '3px' }}>
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <button type="submit" onClick={handleSubmit}>
                            Đăng nhập
                        </button>
                    </form>
                    <div className="social-icons" style={{padding: 15}}>
                    </div>
                </div>
            </div>
        </div>
    );
};
