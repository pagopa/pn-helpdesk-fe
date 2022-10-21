import { Navigate } from "react-router-dom";

const PrivateRoute = ({ condition, children }: any) => {

    let accepted = sessionStorage.getItem(condition) ? true : false 
    
    return (
        accepted ? children : <Navigate to="/" replace={true} />
    )
};

export default PrivateRoute;