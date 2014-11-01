window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               window.msRequestAnimationFrame;


var Game = function(canvasId){
   var me = this;

   var canvas = document.getElementById(canvasId);
   var ctx = canvas.getContext('2d');

   me.canvas = canvas;

   me.background = 'black';

   me.running = false;
   me.isDebug = true;

   me.actors = [];   

   me._killed = [];

   me.keys = [];

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
   }

   me.clear = function(){
      ctx.fillStyle = me.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   me.update = function(delta){
      me.actors.forEach(function(a){
         if(a.update){
            a.update(me, delta);
         }
      });
   }

   me.draw = function(delta){
      me.actors.forEach(function(a){
         if(a.draw){
            a.draw(ctx,delta);
         }
      });
   }

   me.debugDraw = function(delta){
      me.actors.forEach(function(a){
         if(a.debugDraw){
            a.debugDraw(ctx,delta);
         }
      });

      var currentX = 200;
      var widthKey = 60;
      ctx.fillStyle = 'lime';
      ctx.font = '20pt Consolas';
      me.keys.forEach(function(key){
         ctx.fillText(key, currentX, 20);
         currentX+=widthKey;
      });
   }

   me.drawFps = function(delta){
      var seconds = delta/1000;
      var fps = 1/seconds;

      ctx.fillStyle = 'lime';
      ctx.font = '20pt Consolas';
      ctx.fillText(fps.toFixed(1), 20, 20);
   }

   me.start = function(){
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
         me.debugDraw(elapsed);

         if(me.isDebug){
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
   }

   return me;
}