var game = new Game('game');

var dispatcher = new EnemyDispatcher(game);

var stars = new StarField(200);

game.actors.push(player);

game.actors.push(healthbar);

game.actors.push(stars);


game.start();


