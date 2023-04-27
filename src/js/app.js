import React from "react";
import Web3 from "web3";

import "./css/app.css";

const INFURA_KEY = "key from infura";

class app extends React.Component{
    constructor(props){
        super(props);

        this.contractAddress = "contract address once deployed";//contract address here;

        //swap values to what you want
        this.validBets = [1,2,3,4,5,6,7,8,9,10];
        this.state = {
            winningNumber: 0,
            numberOfBets: 0,
            minimumBet: 0,
            totalBet: 0,
            maxNumberOfBets: 0,
            currentBet: 0
        };
    }

async activateWeb3() {
  if (window.ethereum){
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
    } catch (error) {
      console.log("Access Denied");
    }
  }

  if (typeof Web3 != "undefined"){
    console.log("Using Web3 detected from rexternal source");
    this.web3 = new Web3(window.ethereum);
  } else {
    console.log("no Web3 detected. Returning to HTTPS");
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://ropsten.infura.io/v3/${INFURA_KEY}`
      )
    );
  }

  const contract = new this.web3.eth.Contract(
    ABI,
    this.contractAddress
  );
  this.contractInstance = contract;
}

async mountedComponent(){
  await this.activateWeb3();
  await this.updateState();
}

async updateState() {
 //this will call all of the variables used in the contract to update the information whenever someone submits a bet
 const minimumBet = await this.contractInstance.methods.minimumBet().call();
    this.setState({
      minimumBet: parseFloat(Web3.utils.fromWei(minimumBet, "ether"))
    });
}

async voteNumber(number){
//this takes in a number bet by a user and then will make sure it fits all of the conditions before it accepts the bet
}

render() {
    return (
        <div className = "main-body">
            <h1>Bet to win Ether</h1>

            <div className = "main-blocks">
                <b>Number of bets:</b>
                <span>{this.state.numberOfBets}</span>
            </div>

            <div className = "main-blocks">
                <b>Last Winning Number:</b>
                <span>{parseInt(this.state.winningNumber) === 0 ? "No draws done yet" : this.state.winningNumber}</span>
            </div>

            <div className = "main-blocks">
                <b>Total ether bet:</b>
                <span>{this.state.totalBet} ether</span>
            </div>

            <div className = "main-blocks">
                <b>Your current bet:</b>
                <span>{this.state.currentBet} ether</span>
            </div>

            <div className = "main-blocks">
                <b>Minimum bet allowed:</b>
                <span>{this.state.minimumBet}</span>
            </div>

            <div className = "main-blocks">
                <b>Max Number of bets:</b>
                <span>{this.state.maxNumberOfBets}</span>
            </div>

            <br></br>

            <h2>Vote for the next number</h2>

            <label>
                <b>
                    How much ether do you want to bet?{" "}
                    <input 
                        className="better-input"
                        ref="ether-bet"
                        type="number"
                        onChange={evt => {
                            this.setState({
                                currentBet: evt.target.value
                            });
                        }}
                        placeholder={"Enter Bet"}
                    />
                </b>{" "}
                ether
                <br />
            </label>

            <ul ref="numbers">
          {this.validBets.map(bet => {
            return (
              <li
                onClick={() => {
                  this.voteNumber(bet);
                }}
              >
                {bet}
              </li>
            );
          })}
        </ul>

        <br></br>

          <div>
            <i>Vote will be reflected once next block is mined</i>
          </div>
          <div>
            <i>Only working in test environment</i>
          </div>

        </div>
    );
}

}

export default app;