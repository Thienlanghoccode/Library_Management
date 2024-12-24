const originalFetch = window.fetch;

window.fetch = async (url, options = {}) => {
    // Lấy authToken từ localStorage
    const authToken = localStorage.getItem('authToken');
    let accessToken = '';

    // Kiểm tra và lấy accessToken từ authToken
    if (authToken) {
        try {
            const parsedToken = JSON.parse(authToken); // Chuyển authToken từ chuỗi JSON thành đối tượng
            accessToken = parsedToken.accessToken || ''; // Lấy accessToken
        } catch (error) {
            console.error('authToken không phải JSON hợp lệ:', error);
        }
    }

    // Tạo headers với accessToken
    const headers = {
        ...options.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : '', // Thêm accessToken vào Authorization
    };

    // Gọi fetch gốc với headers đã cập nhật
    return originalFetch(url, { ...options, headers });
};
