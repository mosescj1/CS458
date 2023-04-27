pragma solidity ^0.8.19;


contract Casino {

    address  public owner;
    uint minBet = 100;
    uint totalBets = 0;
    address[] public players ;
    uint totalWinners = 0;
    uint payout = 0;

    struct Player{
        uint bet;
        uint choice;
        bool winnerFlag;
    }

    mapping(address => Player) public playerInputs;
    
    constructor() {
        owner = msg.sender;
    }

    function bet(uint choice) public payable{
        require(msg.value >= minBet);
        playerInputs[msg.sender].bet = msg.value;
        playerInputs[msg.sender].choice = choice;
        playerInputs[msg.sender].winnerFlag = false;
        totalBets += msg.value;
        players.push(msg.sender);
    }

    function winner(uint choice)public {
        for(uint i = 0; i < players.length; i++){
            
            if(playerInputs[players[i]].choice == choice){
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
    function falllback() public payable{}
}
