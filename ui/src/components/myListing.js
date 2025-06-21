import { MyListingCard } from "./myListingCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_HOST, GET_LISTING, DELETE_LISTING } from "../constants";
export const MyListings = ({ auth }) => {
    const [listingData, setListingData] = useState(null);
    useEffect(() => {
        if(!listingData){
            fetchListingData();
        }
    })
    const fetchListingData = async () => {
        let response = await axios.get(API_HOST + GET_LISTING, {
            headers: {
                Authorization: auth.getToken()
            },
            params: {
                user_id: auth.getId(),
                myListings : 'true'
            }
        });
        setListingData(response?.data?.result);
    }
    const handleDelete = async (_id) => {
        let response = await axios.delete(API_HOST + DELETE_LISTING, {
            headers: {
                Authorization: auth.getToken() //the token is a variable which holds the token
            },
            params: {
                _id: _id,
            }
        })
        fetchListingData()
    }
    return (
        <main>
            <div className="flex min-h-screen flex-col items-center justify-center w-1/2">
                <div className="container mx-auto my-4 px-12 py-4">
                    <div className="overflow-x-auto">
                        {listingData && listingData.map((obj, index) => {
                            return (
                                <div key={index}>
                                    <MyListingCard imgSrc={obj.photos[0]} address={obj.address} rent={obj.price} handleDelete={handleDelete} _id={obj._id} />
                                    <br /><br />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}