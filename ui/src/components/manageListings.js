import { useNavigate } from "react-router-dom";
import { MyListings } from "./myListing";
import { Navbar } from "./navbar";
import { ListingTabs } from "./listingTabs";
export const ManageListings = ({auth}) =>{
    let navigate = useNavigate()
    const handleAddListing = () =>{
        navigate('/addListing')
    }
    return (
        <div>
            <Navbar auth={auth}/>
            <ListingTabs myListingTab={true}/>
            <center>
                <br/>
                <br/>
                <button className="btn btn-success" onClick={handleAddListing}>Add Listing</button>
                <MyListings auth={auth}/>
            </center>
        </div>
    );
}