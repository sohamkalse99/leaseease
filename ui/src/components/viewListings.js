import { Navbar } from "./navbar"
import { ListingTabs } from "./listingTabs"
import { ListingCard } from "./allListingsCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_HOST, GET_LISTING } from "../constants"
export const ViewListings = ({ auth }) => {
    const [listingData, setListingData] = useState(null);
    useEffect(() => {
        if(auth.isAuthenticated()){
            fetchListingData()
        }
    })
    const fetchListingData = async () =>{
        let response = await axios.get(API_HOST + GET_LISTING, {
            headers: {
                Authorization: auth.getToken() //the token is a variable which holds the token
            },
            params: {
                user_id: auth.getId(),
                myListings : 'false'
            }
        });
        setListingData(response?.data?.result);
    }
    return (
        <div>
            <Navbar auth={auth} />
            <ListingTabs allListingTab={true} />

            <div className="flex flex-wrap mt-10 items-center justify-center">
                {listingData && listingData.map((obj, index) => (
                    <div
                        key={index}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-4 mr-2 ml-2"
                    >
                        <ListingCard _id={obj._id} imgSrc={obj.photos[0]} address={obj.address} rent={obj.price} auth={auth} />
                    </div>
                ))}
            </div>

        </div>
    )
}