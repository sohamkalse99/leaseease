
export const MyListingCard = ({_id, imgSrc, address, rent, handleDelete}) => {
    
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure><img src={imgSrc} alt="listing"/></figure>
        <div className="card-body">
            <h2 className="card-title">{address}</h2>
            <p>Rent : ${rent} </p>
            <div className="card-actions justify-end">
            <button className="btn btn-accent" onClick={()=>handleDelete(_id)}>Delete</button>
            </div>
        </div>
        </div>
    );
}