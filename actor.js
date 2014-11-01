


var BoundingBox = function(left, top, bottom, right){
   var me = this;
   me.right = right || 0;
   me.left = left || 0;
   me.bottom = bottom || 0;
   me.top = top || 0;

   me.getWidth = function(){
      return me.right - me.left;
   }

   me.getHeight = function(){
      return me.bottom - me.top;
   }


   me.collides = function(other){

      var compositeBB = new BoundingBox(Math.min(me.left, other.left),
                                        Math.min(me.top, other.top),
                                        Math.max(me.bottom, other.bottom),
                                        Math.max(me.right, other.right));

      if( other.getWidth() + me.getWidth() >= compositeBB.getWidth() &&
          other.getHeight() + me.getHeight() >= compositeBB.getHeight()){
         return true;
      }

      return false;
   }

   me.debugDraw = function(ctx, delta){
      ctx.strokeStyle = 'white';
      ctx.strokeRect(me.left, me.top, me.getWidth(), me.getHeight());
   }

   return me;
}


var Actor = function(x, y, width, height){
   var me = this;
   me.x = x || 0;
   me.y = y || 0;
   me.width = width || 0;
   me.height = height || 0;

   me.type = "default"

   me.dx = 0; // px/sec
   me.dy = 0;

   me.ax = 0; // px/sec/sec
   me.ay = 0;

   me.color = 'blue';

   me.isDead = false;

   me.keys = [];
   me.keyCallbacks = {};

   me.getCenter = function(){
      return {x: me.x + me.width/2, y: me.y + me.height/2}
   }

   me.onKey = function(keyCode, callback){
      me.keys.push(keyCode);
      me.keyCallbacks[keyCode] = callback;
   }


   me.getBounds = function(){
      return new BoundingBox(me.x, me.y, me.y + me.height, me.x + me.width);
   }

   me.onExitScreen = function(){
      console.log("Off screen!");
   }

   me.onCollision = function(other){
      console.log("Collision!");
   }

   me.update = function(engine, delta){

      // check for key presses
      me.keys.forEach(function(k){
         if(engine.keys.indexOf(k)>-1){
            me.keyCallbacks[k].call(me, me);
         }
      });

      // update movement
      var seconds = delta/1000;

      me.x += (me.dx * seconds);
      me.y += (me.dy * seconds);

      me.dx += (me.ax * seconds);
      me.dy += (me.ay * seconds);

      // check for collisions
      //    if collides, fire callback

      var myBB = me.getBounds();

      var potentialColliders = engine.actors;
      for(var i = 0; i < potentialColliders.length; i++){
         (function(){
            if(me !== potentialColliders[i] && !potentialColliders[i].isDead && !me.isDead && potentialColliders[i].getBounds){
               var otherBB = potentialColliders[i].getBounds();
               if( myBB.collides(otherBB)){
                  me.onCollision.call(me, potentialColliders[i]);
               }
            }
         })();
      }


      // check if off screen

      if(me.x > engine.canvas.width ||
         me.y > engine.canvas.height ||
         me.x + me.width < 0 ||
         me.y + me.height < 0){
         me.onExitScreen.call(me);

      }

   }

   me.draw = function(ctx, delta){

      // draw current drawing (rectangle)
      if(!me.image){
         ctx.fillStyle = me.color;
         ctx.fillRect(me.x, me.y, me.width, me.height);
      }else {
         ctx.drawImage(me.image.image, 0, 0, 32, 32, me.x, me.y, me.width, me.height);
      }
   }

   return me;
}