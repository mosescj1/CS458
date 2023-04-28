pragma solidity ^0.8.19;


contract Casino {

    address public owner;
    uint constant minBet = 100;
    uint totalBets = 0;
    address[] public players ;
    uint payout = 0;
    uint numOfBets = 0;
    string winningChoice;

    struct Player{
        uint bet;
        uint choice;
        bool winnerFlag;
    }

    mapping(address => Player) public playerInputs;
    
    constructor () {
        owner = msg.sender;
    }

    function bet(uint choice) public payable{
        require(msg.value >= minBet);
        playerInputs[msg.sender].bet = msg.value;
        playerInputs[msg.sender].choice = choice;
        playerInputs[msg.sender].winnerFlag = false;
        totalBets += msg.value;
        numOfBets ++;
        players.push(msg.sender);
        if(numOfBets >= 3) generateRandom();
    }

    function winner(uint winningNum)public {
        uint totalWinners = 0;
        for(uint i = 0; i < players.length; i++){
            
            if(playerInputs[players[i]].choice == winningNum){
                playerInputs[players[i]].winnerFlag = true;
                totalWinners++;
            }
        }
        payout = totalBets/totalWinners;
        address payable playerAddr;
        for(uint i = 0; i < players.length; i++){
            if(playerInputs[players[i]].winnerFlag && players[i] != address(0))
                playerAddr = payable(players[i]);
                playerAddr.transfer(payout);
        }
        for(uint i = 0; i < players.length; i++){
            delete playerInputs[players[i]];
        }
        delete players;
    }   

    function generateRandom() private {
        uint256 win= (block.number %10 * block.timestamp%5) %2;
        if(win == 0) winningChoice = "Heads";
        if(win == 1) winningChoice = "Tails";
        winner(win);
    }

    function falllback() public payable{}
}
