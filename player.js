var player = new Actor(100, 100, 50, 50);
player.health = 100;

var healthbar = new Actor(20, 600 - 40, Config.HealthBarWidth, 20);
healthbar.color = 'lime';


player.onKey(38, function(){
   player.y += -Config.PlayerSpeed;
});

player.onKey(40, function(){
   player.y += Config.PlayerSpeed;
});

player.onCollision = function(other){
   if(other.type === 'enemy'){
      player.health -= Config.EnemyDamage;
      console.log("health", player.health, other);
      if(player.health <= 0){
         console.log("GAME OVER!!!");
         Resources.Explosion.play();
         game.kill(player);
      }      
      
      game.kill(other);

      healthbar.width = Math.max(Config.HealthBarWidth * (player.health/100), 0);

   }
}

player.image = Resources.Ship;

player.lastFire = Date.now();
player.onKey(32, function(){
   var currentTime = Date.now();

   if(currentTime - player.lastFire > Config.FireThrottle){

      var center = player.getCenter();
      var bullet = new Actor(center.x+20, center.y, Config.BulletWidth, Config.BulletHeight);
      bullet.type = 'bullet';
      bullet.color = 'white';
      bullet.dx = Config.BulletSpeed;
      bullet.onExitScreen = function(){
         game.kill(bullet);
      }

      Resources.Laser.play()
      game.actors.push(bullet);
      player.lastFire = currentTime;
   }

});