import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Profile = () => {
    const [username, setUsername] = useState("");
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem("authToken");
        if (storedData) {
            try {
                const payload = JSON.parse(atob(storedData.split(".")[1])); // Decode base64 payload
                const email = payload.sub;
                const displayName = email.split("@")[0];
                setUsername(displayName);
                setIsUserLoaded(true);
            } catch (error) {
                console.error("Invalid token format:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("roles");
        localStorage.removeItem("userId");
        navigate("/products");
        window.location.reload();
    };

    return (
        <div className="tg-wishlistandcart">
            <div className="dropdown tg-themedropdown tg-wishlistdropdown">
                {username && isUserLoaded ? (
                    <div id="tg-username" className="tg-btnthemedropdown">
                        <i className="icon-user" />
                        <span>
                            Hello: {username}
                        </span>
                        <span 
                            onClick={handleLogout} 
                            style={{
                                color: "#4CAF50", 
                                cursor: "pointer",
                                fontWeight: "normal",
                                marginLeft: "5px"
                            }}
                        >
                            , Thoát!
                        </span>
                    </div>
                ) : (
                    <Link to="/auth/login" id="tg-wishlisst" className="tg-btnthemedropdown">
                        <i className="icon-user" />
                        <span>Đăng Nhập</span>
                    </Link>
                )}
            </div>
        </div>
    );
};
