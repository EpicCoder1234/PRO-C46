class Player{
    constructor(){
        this.name = null;
        this.xpos = 0;
        this.ypos = 0;
        this.index = null;
    }
    getPlayerCount(){
        database.ref("playerCount").on("value",function(data){
            playerCount = data.val();
        });
        return playerCount
    }
    updatePlayerCount(data){
        console.log(data);
        database.ref('/').update({
            playerCount:data,
        });
    }
    updateName(){
        this.index = playerCount;
        var playerIndex = "players/player"+playerCount
        database.ref(playerIndex).set({
            name:this.name,
            xpos:this.xpos,
            ypos:this.ypos
        });
    }
    static getPlayerInfo(){
        database.ref("players").on("value",function(data){
            allPlayers = data.val();
        });
    }
}