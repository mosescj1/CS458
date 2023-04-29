import React from "react";
import Web3 from "web3";

import "./App.css";

import CasinoInterface from "./build/contracts/Casino.json";

const ABI = CasinoInterface.abi;

const INFURA_KEY = "90fdbe962cf8460daf4489bafc13e2b7";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.contractAddress = "0x17c9aC0Cd1721958Ffd730Cf53c23A1568D33DfB"; //contract address here;

    //swap values to what you want
    this.validBets = ["Heads", "Tails"];
    this.state = {
      winningChoice: 0,
      numOfBets: 0,
      minBet: 0,
      totalBets: 0,
      currentBet: 0,
    };
  }

  async componentDidMount() {
    await this.mountedComponent();
  }

  async activateWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.log("Access Denied");
      }
    }

    if (typeof Web3 !== "undefined") {
      console.log("Using Web3 detected from external source");
      this.web3 = new Web3(window.ethereum);
    } else {
      console.log("No Web3 detected. Returning to HTTPS");
      this.web3 = new Web3(
        new Web3.providers.HttpProvider(
          `https://sepolia.infura.io/v3/${INFURA_KEY}`
        )
      );
    }

    const contract = new this.web3.eth.Contract(ABI, this.contractAddress);
    this.contractInstance = contract;
  }

  async mountedComponent() {
    try {
      await this.activateWeb3();
      await this.updateState();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async updateState() {
    try {
      const minBet = await this.contractInstance.methods.minBet().call();
      this.setState({
        minBet: parseFloat(Web3.utils.fromWei(minBet, "ether")),
      });

      let winningChoice = await this.contractInstance.methods
        .winningChoice()
        .call();
      this.setState({
        winningChoice: winningChoice,
      });

      let numOfBets = await this.contractInstance.methods.numOfBets().call();
      this.setState({
        numOfBets: numOfBets,
      });

      let totalBets = await this.contractInstance.methods.totalBets().call();
      this.setState({
        totalBets: parseFloat(Web3.utils.fromWei(totalBets, "ether")),
      });

      if (
        numOfBets !== this.state.numOfBets ||
        winningChoice !== this.state.winningChoice
        ){
        window.location.reload();
      } else {
        this.setState({
          winningChoice: winningChoice,
          numOfBets: numOfBets
        });
      }

    } catch (error) {
      console.log("Error:", error);
    }
  }

  async voteNumber(Word) {
    try {
      let bet = this.state.currentBet;
      let numConv;

      if (parseFloat(bet) < this.state.minBet) {
        alert("Bet more than the minimum amount.");
      } else {
        if (Word === "Heads") numConv = 0;
        if (Word === "Tails") numConv = 1;

        const result = await this.contractInstance.methods
          .bet(numConv)
          .send({
            gas: 3000000,
            from: window.ethereum.selectedAddress,
            value: Web3.utils.toWei(bet, "ether"),
          });
        console.log(result);
      }
    } catch (error) {
      console.log("Error:", error);
    }
 
  }

render() {
  return (
    <div className="main-body">
      <h1>Bet to win Ether</h1>

      <div className="main-blocks">
        <b>Last Winning Choice: </b>
        <span>
          {parseInt(this.state.winningChoice) === 0
            ? "No draws done yet"
            : this.state.winningChoice}
        </span>
      </div>

      <div className="main-blocks">
        <b>Minimum bet allowed: </b>
        <span> {this.state.minBet}</span>
      </div>

      <div className="main-blocks">
        <b>Number of bets: </b>
        <span> {this.state.numOfBets}</span>
      </div>

      <div className="main-blocks">
        <b>Total ether bet: </b>
        <span> {this.state.totalBets} ether</span>
      </div>

      <div className="main-blocks">
        <b>Your current bet: </b>
        <span> {this.state.currentBet} ether</span>
      </div>

      <br />

      <h2>Vote for the next number</h2>

      <label>
        <b>
          How much ether do you want to bet?{" "}
          <input
            className="better-input"
            ref="ether-bet"
            type="number"
            onChange={(evt) => {
              this.setState({
                currentBet: evt.target.value,
              });
            }}
            placeholder={"Enter Bet"}
          />
        </b>{" "}
        ether
        <br />
      </label>

      <ul ref="numbers">
        {this.validBets.map((bet) => {
          return (
            <li
              key={bet}
              onClick={() => {
                this.voteNumber(bet);
              }}
            >
              {bet}
            </li>
          );
        })}
      </ul>

      <br />

      <div>
        <i>Choice will be reflected once the next block is mined</i>
      </div>
      <div>
        <i>Only working in the test environment</i>
      </div>
    </div>
  );
}
}

export default App;