var player = new Actor(100, 100, 50, 50);
player.health = 100;

player.reset = function() {
   player.health = 100;
   player.x = 100;
   player.y = 100;
   player.isDead = false;
};

var healthbar = new Actor(20, 600 - 40, Config.HealthBarWidth, 20);
healthbar.color = 'lime';

player.onKey(37, function() {
   if (player.x > 0) {
      player.x += -Config.PlayerSpeed;
   }
});

player.onKey(39, function() {
   if (player.x + player.width < game.canvas.width) {
      player.x += Config.PlayerSpeed;
   }
});

player.onKey(38, function(){
   if (player.y > 0) {
      player.y += -Config.PlayerSpeed;
   }
});

player.onKey(40, function(){
   if (player.y + player.height < game.canvas.height) {
      player.y += Config.PlayerSpeed;
   }
});

player.onCollision = function(other){
   if(other.type === 'enemy'){
      player.health -= Config.EnemyDamage;
      if(player.health <= 0){
         console.log("GAME OVER!!!");
         Resources.Explosion.play();
         game.kill(player);
         game.canvas.style.opacity = .5;
         game.end();
      }
      
      game.kill(other);

      healthbar.width = Math.max(Config.HealthBarWidth * (player.health/100), 0);

   }
};

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
      };

      Resources.Laser.play();
      game.actors.push(bullet);
      player.lastFire = currentTime;
   }

});