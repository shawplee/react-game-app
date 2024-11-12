import React, { useRef, useState } from "react";

import Header from "../components/Header";
import FlipCard from "../components/FlipCard";

import "./MatchCardsGame.css";
import PlayerData from "../components/PlayerData";
import axios from "axios";

/* send the data to restapi server */
var firstFlipCardIndex = null;
var stateMachine = 0;
var playerName = "";

function MatchCardsGame(props) {
    const cards = [
        { index: 0, title: '0', name: 'cat', backImage: "cat.jpg", frontImage: "card4.jpg" },
        { index: 1, title: '1', name: 'pig', backImage: "pig.jpg", frontImage: "card4.jpg" },
        { index: 2, title: '2', name: 'cat', backImage: "cat.jpg", frontImage: "card4.jpg" },
        { index: 3, title: '3', name: 'pig', backImage: "pig.jpg", frontImage: "card4.jpg" }];
    const [flips, setFlips] = useState([false, false, false, false]);
    const [gameStarted, setGameStarted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const intervalRef = useRef(null);

    function toggleOneCardFlip(idx) {
        let newFlips = [...flips];
        newFlips[idx] = !newFlips[idx];
        console.log(newFlips);
        setFlips(newFlips);
    }

    function resetFlipCards(card1Index, card2Index) {
        let newFlips = [...flips];
        newFlips[card1Index] = false;
        newFlips[card2Index] = false;
        setFlips(newFlips);
    }

    function onCardClicked(e) {
        let cardIdx = Number(e.target.title);
        toggleOneCardFlip(cardIdx);
        switch (stateMachine) {
            default:
            case 0:
                firstFlipCardIndex = cardIdx;
                stateMachine = 1;
                break;
            case 1:
                // card 1 is already flipped (=firstCardFlipIndex), now second card is flip (=cardIdx)
                if (cards[firstFlipCardIndex]['name'] === cards[cardIdx]['name']) {
                    // 2 cards names match
                    stateMachine = 2;
                }
                else {
                    stateMachine = 0;
                    setTimeout(resetFlipCards, 2000, firstFlipCardIndex, cardIdx);
                }
                firstFlipCardIndex = null;
                break;
            case 2:
                stateMachine = 3;
                break;
            case 3:
                // complete, in this example, there are only 4 card, these 2 cards must match
                clearInterval(intervalRef.current);
                setTimeout(handleGameComplete, 3000);
                break;
        }
    }

    function handleGameComplete() {
        console.log("Game completed, well done " + playerName + ".  You completed in " + ((endTime - startTime)/1000));
        axios.get('http://localhost:5000', {
            params: {
                player:playerName,
                time: ((endTime - startTime)/1000)
            }
        }).then(function(res){
            console.log(res);
        }).catch(function(error){
            console.log(error);
        }).finally(function(){
            console.log('done');
        })
        // reset to initial state
        setFlips([false, false, false, false]);
        stateMachine = 0;
        setGameStarted(false);
    }

    function handleStartClick() {
        console.log("Start the game now");
        setGameStarted(true);
        setStartTime(Date.now());
        intervalRef.current = setInterval(handleInterval, 100);
    }

    function handleInterval() {
        setEndTime(Date.now());
    }

    function SetPlayerName(name) {
        playerName = name;
    }

    return (
        <div>
            <Header />
            {!gameStarted &&
                <PlayerData setName={SetPlayerName} handleStartClick={handleStartClick} />
            }
            {gameStarted &&
                <div className="deckLayout">
                    <p>Time : {((endTime - startTime) / 1000).toFixed(1)}</p>
                    <div className="deckContent">
                        <FlipCard flip={flips[0]} config={cards[0]} handleClick={onCardClicked} />
                        <FlipCard flip={flips[1]} config={cards[1]} handleClick={onCardClicked} />
                    </div>
                    <div className="deckContent">
                        <FlipCard flip={flips[2]} config={cards[2]} handleClick={onCardClicked} />
                        <FlipCard flip={flips[3]} config={cards[3]} handleClick={onCardClicked} />
                    </div>
                </div>
            }
        </div>
    );
}

export default MatchCardsGame;