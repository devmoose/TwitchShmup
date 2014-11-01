
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
      };

      return bullet;
   };

   var buildEnemey = function(type){
      // @TODO: Enemy-specific dimensions
      var enemy = new Actor(engine.canvas.width,
          Math.random()*(engine.canvas.height - Config.EnemyHeight),
          Config.EnemyWidth,
          Config.EnemyHeight);
      if(type === 'basic'){
         enemy.type = 'enemy';
         enemy.dx = Config.Enemy.basic.Speed;
         enemy.color = 'red';
         enemy.image = Resources.Enemy.basic;
         enemy.onExitScreen = function(){
            if(enemy.x < 0){
               clearTimeout(enemy.intervalHandle);
               me.engine.kill(enemy);
               game.enemies--;
            }
         };

         enemy.onCollision = function(other){
            if(other.type === 'bullet'){
               clearTimeout(enemy.intervalHandle);
               Resources.Explosion.play();
               me.engine.kill(enemy);
               me.engine.kill(other);
               game.enemies--;
            }
         };

         enemy.fireBullet = function() {
            var center = enemy.getCenter();
            var bullet = buildBullet(center.x, center.y);
            me.engine.actors.push(bullet);
            Resources.Laser.play();
            enemy.intervalHandle = setTimeout(enemy.fireBullet, Math.random()*(Config.FireMaxInterval - Config.FireMinInterval) + Config.FireMinInterval);
         };

         enemy.intervalHandle = setTimeout(enemy.fireBullet, Config.FireMinInterval);
      }

      return enemy;
   };


   me.update = function(engine, delta){
      // maybe need this?
   };

   me.spawn = function(numberOfUnits, type){
      for(var i = 0; i < numberOfUnits && i+game.enemies <= Config.MaxEnemy; i++){
         game.actors.push(buildEnemey(type));
         game.enemies++;
      }
   };

   return me;
};