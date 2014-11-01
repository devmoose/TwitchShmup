var Texture = function(path){
   var me = this;

   me.image = new Image();
   me.image.src = path;
   
   return me;
}

var Sprite = function(image, sx, sy, sw, sh){
    var me = this;
    me.image = image;
    me.draw = function(ctx, x, y){
        ctx.drawImage(me.image, sx, sy, sw, sh, x, y, sw, sh);
    };
};

var Animation = function(spritesheet, columns, rows, sw, sh){
    var me = this;
    var image = new Image();
    image.src = spritesheet;    
    var sprites = new Array(columns * rows);
    var currIndex = 0;

    me._currentTime = 0;
    me.speed = 100;
    
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < columns; j++){
            sprites[j+i*columns] = new Sprite(image, j*sw, i*sh, sw, sh);
        }
    }
    
    var tick = function(){
        currIndex = (currIndex + 1) % sprites.length;
    };
    
    me.draw = function(ctx, x, y){
        tick();
        sprites[currIndex].draw(ctx, x, y);
    };
    return me;
};