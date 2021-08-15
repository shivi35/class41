class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = 0;
    this.xPosition=0;
  }
  getRankCount(){
    var rankCountRef = database.ref("rankCount") 
    rankCountRef.on("value", (data)=>{
      rankCount = data.val();
    })
  }
  updaterankCount(rank){
database.ref('/').update({
  rankCount:rank
})
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank

    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
