import React, { useState } from "react";

import "./ShowHighScores.css"
import axios from "axios";

function ShowHighScores() {
    const [scores, setScores] = useState([]);
    axios.get('http://localhost:5000').then(function(res){
        if(res.data.length !== scores.length){
            setScores(res.data);
        }
    }).catch(function(error){
        console.log(error);
    })

    if (scores.length > 0) {
        var results = scores.map(function (score) {
            return (
                <tr key={score.id}>
                    <td>{score.player}</td>
                    <td>{score.time}</td>
                </tr>
            );
        });
    }

    /*     Browsers need the <tbody> tag. If it is not in your code, then the browser will automatically insert it. This will work fine on first render, but when the table gets updated, then the DOM tree is different from what React expects. This can give strange bugs, therefore React warns you to insert the <tbody>. It is a really helpful warning.
     */
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Time Taken</th>
                    </tr>
                    {results}
                </tbody>
            </table>
        </div>
    );
}

export default ShowHighScores;