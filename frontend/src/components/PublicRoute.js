import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {

    const userToken = localStorage.getItem('leaf-proj-token');

    return userToken ? <Navigate to='/history-page' /> : children;

};

export default PublicRoutes;