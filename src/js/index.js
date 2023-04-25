import React from 'react'
import ReactDOM from 'reaact-dom'
import Web3 from 'web3'
import './../css/index.css'
import { render } from 'express/lib/response'

class App extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            lastWinner : 0,
            timer : 0
        }
    }
    voteNumber(number){
        console.log(number)
     } render() {
        return (
            <div className="short-description">
                <h1> 
                    A Chance to Win a Ton of Money When You Place Ethereum Bets!
                </h1>
            </div>
        )
     }
}

