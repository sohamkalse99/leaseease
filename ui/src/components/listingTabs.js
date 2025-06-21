import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const ListingTabs = ({allListingTab=false, myListingTab=false}) =>{
    const [allListingClass, setAllListingClass] = useState('tab tab-active');    
    const [myListingClass, setMyListingClass] = useState('tab');
    let navigate = useNavigate();
    useEffect(()=>{
        if(myListingTab){
            setAllListingClass('tab');
            setMyListingClass('tab tab-active');
        } else{
            setAllListingClass('tab tab-active');
            setMyListingClass('tab');
        }
    });

    const handleTabClick = (index) =>{
        if(index){
            setAllListingClass('tab');
            setMyListingClass('tab tab-active');
            navigate('/myListings')
        } else{
            setAllListingClass('tab tab-active');
            setMyListingClass('tab');
            navigate('/allListings')
        }
    }
    return (
        <div className="flex flex-cols justify-center items-center">
            <div role="tablist" className="tabs tabs-lifted tabs-lg w-1/2">
                <button role="tab" className={allListingClass} onClick={(e)=>{handleTabClick(0)}}>All Listings</button>
                <button role="tab" className={myListingClass} onClick={(e)=>{handleTabClick(1)}}>My Listings</button>
            </div>
        </div>
    );
}