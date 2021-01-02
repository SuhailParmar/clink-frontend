import React from "react";
// import classes from './Deck.css';

const Deck = props => {
    //id={deck.id}
    //todo remove style={{}}
    return (
        <div className="card deck" style={{color: 'black'}}>
            <img src={props.logo} className="card-img-top" alt=""></img>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.shortDesc}</p>
                <button className="btn btn-primary">View deck details</button>
            </div>
        </div>
    )
}

export default Deck;