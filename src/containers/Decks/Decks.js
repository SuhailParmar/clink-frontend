import React from "react";
import Deck from '../../components/Deck/Deck'

const Decks = props => {
    let decks = [
        {name: 'a', id: '1', logo: '', shortDesc: 'Deck a'}, 
        {name: 'b', id: '2', logo: '', shortDesc: 'Deck b'}, 
        {name: 'c', id: '3', logo: '', shortDesc: 'Deck c'}, 
        {name: 'd', id: '4', logo: '', shortDesc: 'Deck d'}, 
        {name: 'e', id: '5', logo: '', shortDesc: 'Deck e'},
        {name: 'f', id: '6', logo: '', shortDesc: 'Deck f'},
    ]; //todo get from backend
    let rows = []; //2D, contains col arrays
    let cols = []; //1D, contains decks
    let rowLength = 3;
    //break deck into rows of rowLength by populating rows[]
    decks.map((deck, idx) => {
        cols.push(deck);
        if((idx + 1) % rowLength === 0) { 
            rows.push(cols);
            cols = [];
        }
        return null;
    })
    //todo populate last row with blank columns
    //todo fix no row end

    let deckList = rows.map((columns, idx) => (
        <div className="row" key={idx}>
            {
                columns.map((deck, idx) => (
                    <div className="col" key={idx}>
                        <Deck
                            name={deck.name}
                            id={deck.id}
                            logo={deck.logo}
                            shortDesc={deck.shortDesc}
                        />
                    </div>
                ))
            }
        </div>
    ))
    return deckList;
}

export default Decks