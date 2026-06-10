import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const getAuhenticatedUserData = async () => {
            try {
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_API_NODEJS}/get-user-profile`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('leaf-proj-token')}`
                        }
                    }
                );
            } catch (error) {
                localStorage.removeItem('leaf-proj-token');
                navigate('/');
            }
        };

        getAuhenticatedUserData();
    }, [navigate]);

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoutes;
