pragma solidity ^0.5.16;


contract Casino {

    address public owner;
    uint constant public minBet = 1 finney;
    uint public totalBets = 0;
    address[] public players ;
    uint payout = 0;
    uint public numOfBets = 0;
    string public winningChoice;




    struct Player{
        uint bet;
        uint choice;
        bool winnerFlag;
    }

    mapping(address => Player) public playerInputs;
    
    constructor () public {
        owner = msg.sender;
    }

    function kill() public {
      if(msg.sender == owner) 
        selfdestruct(msg.sender);
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
                playerAddr = address(uint160(players[i]));
                playerAddr.transfer(payout);
        }
        for(uint i = 0; i < players.length; i++){
            delete playerInputs[players[i]];
        }
        players.length = 0;
        totalBets = 0;
        numOfBets = 0;
    
    }   

    function generateRandom() public {
        uint256 win= block.number %2;
        if(win == 0) winningChoice = "Heads";
        else if(win == 1) winningChoice = "Tails";
        winner(win);
    }

    function() external payable {}
}