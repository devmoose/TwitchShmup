
var EnemyDispatcher = function(engine){
   var me = this;
   me.enemies = [];
   me.engine = engine;

   var buildBullet = function(x, y){
      var bullet = new Actor(x, y, Config.BulletWidth, Config.BulletHeight);
      bullet.type = 'enemy';
      bullet.dx = -Config.BulletSpeed;
      bullet.color = 'orange';
      bullet.onExitScreen = function(){
         if(bullet.x < 0){
            me.engine.kill(bullet);
         }
      }

      return bullet;
   }

   var buildEnemey = function(type){
      var enemy = new Actor(engine.canvas.width, 
         Math.random()*engine.canvas.height, 
         Config.EnemyWidth, 
         Config.EnemyHeight);
      if(type === 'basic'){
         enemy.type = 'enemy';
         enemy.dx = Config.EnemySpeed;
         enemy.color = 'red';
         enemy.image = Resources.Enemy;
         enemy.onExitScreen = function(){
            if(enemy.x < 0){
               me.engine.kill(enemy);
            }
         }

         enemy.onCollision = function(other){
            if(other.type === 'bullet'){
               Resources.Explosion.play();
               me.engine.kill(enemy);
               clearInterval(enemy.intervalHandle);
            }
         }

         enemy.intervalHandle = setInterval(function(){
            var center = enemy.getCenter();
            var bullet = buildBullet(center.x, center.y);
            me.engine.actors.push(bullet);
            Resources.Laser.play();
         }, Config.FireInterval);
      }

      return enemy;
   }  


   me.update = function(engine, delta){
      // maybe need this?
   }

   me.spawn = function(numberOfUnits, type){
      for(var i = 0; i < numberOfUnits; i++){
         game.actors.push(buildEnemey(type));
      }
   }

   return me;
}