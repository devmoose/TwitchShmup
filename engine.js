window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               window.msRequestAnimationFrame;


var Game = function(canvasId, gameoverId){
   var me = this;

   var gameover = document.getElementById(gameoverId);
   var canvas = document.getElementById(canvasId);
   var ctx = canvas.getContext('2d');

   me.canvas = canvas;

   me.background = 'black';

   me.running = false;
   me.isDebug = false;

   me.actors = [];
   me.enemies = 0;

   me._killed = [];

   me.keys = [];

   me.score = 0;

   me.lastFpsUpdate = Date.now();
   me.fps = 60;

   window.addEventListener('keydown', function(evt){
      if(me.keys.indexOf(evt.keyCode) === -1){
         me.keys.push(evt.keyCode);
      }
   });

   window.addEventListener('keyup', function(evt){
      var index = -1;
      if((index = me.keys.indexOf(evt.keyCode)) > -1){
         me.keys.splice(index, 1);
      }
   });

   me.kill = function(actor){
      actor.isDead = true;
      me._killed.push(actor);
   };

   me.clear = function(){
      ctx.fillStyle = me.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   };

   me.update = function(delta){
      me.actors.forEach(function(a){
         if(a.update){
            a.update(me, delta);
         }
      });
   };

   me.draw = function(delta){
      me.actors.forEach(function(a){
         if(a.draw){
            a.draw(ctx,delta);
         }
      });
   };

   me.debugDraw = function(delta){
      me.actors.forEach(function(a){
         if(a.debugDraw){
            a.debugDraw(ctx,delta);
         }
      });

      var currentX = 200;
      var widthKey = 40;
      ctx.fillStyle = 'lime';
      ctx.font = '20pt Consolas';
      me.keys.forEach(function(key){
         ctx.fillText(key, currentX, 20);
         currentX+=widthKey;
      });
   };

   me.drawFps = function(delta){
      var current = Date.now();
      if (current - me.lastFpsUpdate > 500) {
         var seconds = delta/1000;
         me.fps = 1/seconds;

         ctx.fillStyle = 'lime';
         ctx.font = '20pt Consolas';

         me.lastFpsUpdate = current;
      }
      ctx.fillText(me.fps.toFixed(1), 20, 20);
   };

   me.end = function() {
      me.actors.forEach(function(a) {
         if (a.type === 'enemy') {
            me.kill(a);
         }
      });
      gameover.style.visibility = "visible";
   };

   me.init = function() {
      gameover.style.visibility = "hidden";
      var stars = new StarField(200);
      player.reset();
      healthbar.width = Math.max(Config.HealthBarWidth * (player.health/100), 0);
      me.actors.push(player);
      me.actors.push(healthbar);
      me.actors.push(stars);
      var dispatcher = new EnemyDispatcher(game);
   };

   me.drawScore = function(delta) {
      ctx.fillStyle = 'lime';
      ctx.font = '20pt Consolas';
      ctx.fillText("Score: " + me.score, 20, 540);
   };

   me.start = function(){
      me.canvas.style.opacity = 1;
      me.running = true;

      var lastTime = Date.now();
      (function mainloop(){
         if(!me.running) return;
         window.requestAnimationFrame(mainloop);

         // current time in milliseconds
         var current = Date.now();
         // time elapsed in milliseconds since the last frame
         var elapsed = current - lastTime;


         // update/draw
         me.clear();

         me.update(elapsed);
         me.draw(elapsed);
         me.drawScore(elapsed);

         if(me.isDebug){
            me.debugDraw(elapsed);
            me.drawFps(elapsed);
         }

         // remove killed actors from the game
         me._killed.forEach(function(k){
            var index = me.actors.indexOf(k);
            me.actors.splice(index, 1);            
         });
         me._killed.length = 0;

         lastTime = current;
      })();
   };

   return me;
};