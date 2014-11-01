var Config = {
   PlayerSpeed : 8,
   HealthBarWidth : 760,
   FireThrottle : 300,
   BulletWidth : 10,
   BulletHeight : 2,
   BulletSpeed : 200,

   EnemyWidth : 50,
   EnemyHeight : 50,
   EnemySpeed : -100,
   EnemyDamage : 20,
   MaxEnemy: 4,

   FireInterval : 2000,
   FireMinInterval : 1000,
   FireMaxInterval : 2000,

   Enemy : {
      basic : {
         Speed : -100,
         Health : 10,
         Damage : 20,
         Points : 100,
         FireMinInterval : 1000,
         FireMaxInterval : 2000
      },
      advanced : {
         Speed: -75,
         Health : 50,
         Damage : 40,
         Points : 250,
         FireMinInterval : 1500,
         FireMaxInterval : 2500
      }
   },

   Levels : [
      {
         enemies: {
            basic: {count: 40}
         }
      },
      {
         enemies : {
            basic : {count : 40},
            advanced : {count : 4}
         }
      }
   ]
};