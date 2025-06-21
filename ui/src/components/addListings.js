import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Navbar } from "./navbar";
import axios from "axios";
import { API_HOST, ADD_LISTING } from "../constants";

export const AddListings = ({ auth }) => {
    let navigate = useNavigate();
    const [leaseLink, setLeaseLink] = useState('')
    const [photosLink, setPhotosLink] = useState([])
    const [tempLinks, setTempLinks] = useState([]);
    const [uploadType, setUploadType] = useState(''); // new state variable
    const [error, setError] = useState(null);
    const [rent, setRent] = useState(0);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const myWidget = window.cloudinary.createUploadWidget({
                cloudName: process.env.REACT_APP_CLOUD_NAME,
                uploadPreset: process.env.REACT_APP_PRESET_NAME,
                folder: process.env.REACT_APP_CLOUD_FOLDER,
                sources: ['local']
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    setTempLinks(prevTempLinks => [...prevTempLinks, result.info.secure_url]);
                }
            });

            document.getElementById("upload_lease").addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                setTempLinks([]);
                setUploadType('lease'); // set upload type
                myWidget.open();
            }, false);

            document.getElementById("upload_photos").addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                setTempLinks([]);
                setUploadType('photos'); // set upload type
                myWidget.open();
            }, false);
        };
    });
    useEffect(() => {
        const uniqueLinks = [...new Set(tempLinks)]; // remove duplicates
        console.log("------->", uniqueLinks)
        if (uniqueLinks.length > 0) {
            if (uploadType === 'lease') {
                console.log('lease links')
                setLeaseLink(uniqueLinks.pop());
                console.log(leaseLink);
            } else if (uploadType === 'photos') {
                setPhotosLink(uniqueLinks);
                console.log('Photo links')
                console.log(photosLink);
            }
        }
    }, [tempLinks, uploadType]); // add uploadType to the dependency array

    const handleSubmit = async () => {
        setError(null);
        if (leaseLink === '') {
            setError('Must upload lease')
            return;
        }
        if (photosLink.length === 0) {
            setError('Must upload a photo')
            return;
        }
        if (rent < 1) {
            setError('Rent must be greater than 0');
            return;
        }
        console.log(leaseLink);
        console.log(photosLink);
        console.log(auth.getToken())
        let response = await axios.post(API_HOST + ADD_LISTING, {
            price: rent.toString(),
            photos: photosLink,
            lease_link: leaseLink,
            user_id: auth.getId()
        }, {
            headers: { Authorization: auth.getToken() }
        }
        )
        navigate('/home');

    }
    return (
        <div>
            <Navbar auth={auth}/>
            <center>
                {error && (
                    <div role="alert" className="alert alert-error w-1/3 mt-5 mb-5">
                        <span>Error! {error}</span>
                    </div>
                )}
                <div className="card w-1/2 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Add new listing!</h2>

                        <h1>Please fill the followind details</h1>
                        <div className="mt-5 mb-5 w-98">
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="number" className="grow" placeholder="Rent" onChange={(e) => setRent(e.target.value)} value={rent} />
                            </label>
                            <br />
                            <button id="upload_lease" className="cloudinary-button mr-5 w-1/3">Upload Lease</button>
                            <button id="upload_photos" className="cloudinary-button w-1/3">Upload Photos</button>
                            <br />
                            <button onClick={handleSubmit} className="btn btn-outline btn-primary mt-4 w-full">Submit</button>
                        </div>
                    </div>
                </div>
            </center>
        </div>

    )
}