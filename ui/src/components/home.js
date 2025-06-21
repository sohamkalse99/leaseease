import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ViewListings } from "./viewListings";

const Home = ({ auth }) => {
    let navigate = useNavigate();
    useEffect(() => {
        if (!auth.isAuthenticated()) {
            navigate('/login')
        }
    })

    return (
        <div>
            <ViewListings auth={auth}/>
        </div>
    );
};

export default Home;