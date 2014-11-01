
var Star = function(x, y, speed){
   var me = this;
   me.x = x || 0;
   me.y = y || 0;
   me.speed = speed || 0;
   return me;
}


var StarField = function(number){

   var me = this;
   me.minSpeed = 100;
   me.maxSpeed = 200;

   me.stars = [];
   for(var i = 0; i< number; i++){
      me.stars.push(new Star(Math.random()*800, Math.random()*600,  Math.random()*(me.maxSpeed - me.minSpeed) + me.minSpeed))
   }


   me.update = function(engine, delta){
      var seconds = delta/1000;
      me.stars.forEach(function(s){
         s.x -= (s.speed*seconds) ;
         if(s.x < 0){
            s.x = 800+s.speed;
         }
      });


   }

   me.draw = function(ctx, delta){
      ctx.fillStyle = 'white';
      me.stars.forEach(function(s){
         ctx.fillRect(s.x, s.y, 2, 2);
      });
   }

   return me;

}