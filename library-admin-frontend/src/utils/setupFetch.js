const originalFetch = window.fetch;

window.fetch = async (url, options = {}) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    const headers = {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '', // Thêm token vào header
    };

    // Gọi fetch gốc với headers đã cập nhật
    return originalFetch(url, { ...options, headers });
};
