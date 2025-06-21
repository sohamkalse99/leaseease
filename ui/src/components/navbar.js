import { useNavigate } from "react-router-dom";
import { ICON } from "../static/png/icon";

export const Navbar = ({auth}) =>{
    let navigate = useNavigate()
    const handleLogout = () => {
        auth.logout();
        navigate('/');
    }
    const handleHome = () =>{
        navigate("/home")
    }
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                
            </div>
            <div className="navbar-center">
                <a onClick={handleHome}><ICON height={400} width={400} /></a>
            </div>
            <div className="navbar-end">
                <button onClick={handleHome} className="mr-5"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></button>
                <button className="btn mr-7 bg-white text-black" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}