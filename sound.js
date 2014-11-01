var context = new window.webkitAudioContext();

var Sound = function(path){
   var me = this;
   var buffer = null;
   me.volume = .5;

   me.isLoaded = false;
   me.load = function(){
      var request = new XMLHttpRequest();
       request.open('GET', path);
       request.responseType = 'arraybuffer';
       request.onload = function(){
           context.decodeAudioData(request.response, function(decodedData){
               buffer = decodedData;
               me.isLoaded = true;
           });
       };
       request.send();

       return me;
   }


   me.play = function(){
      var sound = context.createBufferSource();
      var volume = context.createGain();
      volume.gain.value = me.volume;
      sound.buffer = buffer;

      sound.connect(volume);
      volume.connect(context.destination);

      sound.start(0);
   }

   return me;
}