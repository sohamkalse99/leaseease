import { useEffect, useState } from "react";
import axios from "axios";
import { API_HOST, GET_LISTING_TRIVIA } from "../constants";

export const ListingCard = ({ _id, imgSrc, address, rent, auth }) => {
    const [listingTrivia, setListingTrivia] = useState(null);
    useEffect(() => {
        if (!listingTrivia) {
            fetchListingTrivia()
        }
    })
    const fetchListingTrivia = async () => {
        let response = await axios.get(API_HOST + GET_LISTING_TRIVIA, {
            headers: {
                Authorization: auth.getToken() //the token is a variable which holds the token
            },
            params: {
                id: _id
            }
        })
        setListingTrivia(response?.data?.result);
    }
    return (
        <div>
            <div className="card w-68 glass">
                <figure><img src={imgSrc} alt="listing" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{address}</h2>
                    <p>Rent : ${rent}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => document.getElementById('listing_modal_'+_id).showModal()}>Learn more about the place!</button>
                        <button className="btn btn-warning" onClick={() => document.getElementById('trivia_modal_'+_id).showModal()}>Trivia</button>
                    </div>
                </div>
            </div>

            <dialog id={"listing_modal_" + _id} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {listingTrivia ? (
                        <div>
                            <h3 className="font-bold text-lg">Address : {listingTrivia.property_addr}</h3>
                            <p className="py-4">Owner : {listingTrivia.owner} </p>
                            <p className="py-4"><b>Tenants : {listingTrivia.tenants}</b></p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <progress className="progress w-56"></progress>
                    )
                    }
                </div>
            </dialog>
            <dialog id={"trivia_modal_" + _id} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {listingTrivia ? (
                        <div>
                            <h3 className="font-bold text-lg">Trivia!</h3>
                            <h4 className="font-bold text-md">Restautants around here:</h4>
                            {listingTrivia.restaurant_places && listingTrivia.restaurant_places.map((name, index) => {
                                return (<div key={index}><div className="badge badge-outline badge-primary badge-sm"><p className="py-4">{name}</p></div><br/></div>)
                            })}
                            <h4 className="font-bold text-md">Grocery outlets around here:</h4>
                            {listingTrivia.grocery && listingTrivia.grocery.map((name, index) => {
                                return (<div key={index}><div className="badge badge-outline badge-secondary badge-sm"><p className="py-4">{name}</p></div><br/></div>)
                            })}
                            <h4 className="font-bold text-md">Tourist around here:</h4>
                            {listingTrivia.tourist_places && listingTrivia.tourist_places.map((name, index) => {
                                return (<div key={index}><div className="badge badge-outline badge-accent badge-sm"><p className="py-4">{name}</p></div><br/></div>)
                            })}
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <progress className="progress w-56"></progress>
                    )
                    }
                </div>
            </dialog>
        </div>

    );
}