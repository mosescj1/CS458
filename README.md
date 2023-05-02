# CS458
This is the repository for decentralized CNT Casino

# How to use

# Required Dependencies
    * "@testing-library/jest-dom ^5.16.5",
    * "@testing-library/react ^13.4.0",
    * "@testing-library/user-event ^13.5.0",
    * "react ^18.2.0",
    * "react-dom ^18.2.0",
    * "react-scripts 5.0.1",
    * "truffle ^5.8.4",
    * "web-vitals ^2.1.4",
    * "web3 ^1.9.0"
    
# About the authors
 * Hi my name is Nicholas Korte. I am a third year computer science student at Colorado State with an interest in the blockchain and its applications.
 * Hi my name is Thomas Wittich currently a senior in computer science at Colorado State University.
 * 
 
# Purpose

The purpose of this project is to create a working web API and smart contract that allows users to place bets anonymously online using Ethereum. The main goal was to allow users to keep their information private while still being able to partake in the fun of some free-spirited gambling.

# Setup

For the most part this repo is entirely ready to run and allow users to interact with the contract.

First step - Clone the repository to a local dev environment. I recommend vscode.

Second step - There are certain things that you will need to download before you can run this code. If you do not have node.js installed on your computer please do so. You can check by running the npm -v command in your terminal.

Third step - once you have Node.js installed you should be able to run the code. in your terminal in your IDE cd into my-app. once you have done that run npm install. This will download all of the dependencies required to run the website.

Fourth step - run npm start. If it fails or says that you are missing dependencies try running npm audit fix --force. this will force your computer to install all of the dependencies. You may have to run this in sudo mode if it says you do not have permission. sudo su.

Fifth step - if npm start is still giving you errors try running npm install *what the error message says you are missing*. If it compiles properly it will open up a new window that has the website.

Sixth step - link your metamask account. If you don't have the browser extension please add it. Our contract is on the sepolia testnet so you will need sepolia eth. You can request this from several faucets. Just google sepolia eth faucet.

Seventh step - once you have done all this and you have sepolia eth in your account you should be able to bet eth. Change the amount your betting click what you're betting on and hit confirm on the metamask popup and voila you just bet some eth!


# Sources

* https://github.com/maxme/truffle-export-abi
* https://github.com/facebook/create-react-app
* https://github.com/bethanyuo/casino-dApp
* https://gist.github.com/robdodson/7915c77e05a293c1a4033da5619dfc54
* The ultimate end-to-end tutorial to create and deploy a fully decentralized Dapp in ethereum | by Merunas Grincalaitis | Ethereum Developers | Medium
