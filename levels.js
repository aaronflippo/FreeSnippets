var gen_levels = function()
{
  var l;
  var e;
  var i;

  gg.levels = [];

  //DEFINE LEVELS

  //<<<<<<<<<<<
  // To create a new level, copy everything between (&including) the //<<<<<< and the //>>>>>>>,
  // and paste it right immediately below the //>>>>>>. Then, edit.

  //LEVEL 0
  l = new level();
  l.i = gg.levels.length;
  //win type
  l.win = WIN_SURVIVE; //last winp turns
  //l.win = WIN_KILL; //kill all enemies
  //l.win = WIN_KILLN; //kill winp enemies
  l.winp = 10; //win parameter- "survive 10 turns"
  l.n_tiles = 19; //"large"

  //DEFINE ENEMIES
  //
  e = new enemy();
  e.type = ENEMY_TYPE_STATIC;       //enemy type
  //e.type = ENEMY_TYPE_PASSIVE;    //wanders if able (won't kill 'allies')
  //e.type = ENEMY_TYPE_ACTIVE;     //wanders regardless (will kill 'allies' randomly)
  //e.type = ENEMY_TYPE_AGGRESSIVE; //wanders aggressively (will kill 'ally' if able)
  //e.type = ENEMY_TYPE_PATROL;     //bounces between 2 tiles
  //e.type = ENEMY_TYPE_BOMB;       //ticks down until kill surrounding tiles //NOT IMPLEMENTED
  e.level = 1; //its number
  e.wait_len = 0; //turns between each move
  e.telegraph = 2; //turns before it takes over spawned-on tile
  l.enemy_templates.push(e);
  //
  e = new enemy();
  e.type = ENEMY_TYPE_STATIC;
  e.level = 2;
  e.wait_len = 0;
  e.telegraph = 2;
  l.enemy_templates.push(e);

  //DEFINE INSTRUCTIONS
  //
  i = new instruction();
  i.type = INST_LABEL; //create label instruction, can be jumped-to
  i.args[0] = "SPAWN_ALLYS"; //the label
  //i.type = INST_JUMP; //jump to labeled instruction
  //i.args[0] = "SPAWN_ALLYS"; //label to jump to
  //i.type = INST_REPEAT; //repeat the next instruction n times
  //i.args[0] = [1,2,3]; //list from which to randomly choose a parameter (for no randomization, use single-length array [n])
  //i.type = INST_END; //end program
  //i.type = INST_WAIT; //wait n rests before executing next instruction
  //i.args[0] = [1,2,3]; //list from which to randomly choose a parameter (for no randomization, use single-length array [n])
  //i.type = INST_SPAWN_ALLY; //spawn an ally at level n
  //i.args[0] = [1,2,3]; //list from which to randomly choose a parameter (for no randomization, use single-length array [n])
  //i.type = INST_SPAWN_ENEMY; //spawn an enemy n (corresponding to the enemy parameters defined above)
  //i.args[0] = [1,2,3]; //list from which to randomly choose a parameter (for no randomization, use single-length array [n])
  l.instructions.push(i);
  //
  i = new instruction();
  i.type = INST_SPAWN_ALLY;
  i.args[0] = [1];
  l.instructions.push(i);
  //
  i = new instruction();
  i.type = INST_LABEL;
  i.args[0] = "SPAWN_ENEMYS";
  l.instructions.push(i);
  //
  i = new instruction();
  i.type = INST_SPAWN_ENEMY;
  i.args[0] = [0];
  l.instructions.push(i);
  //
  i = new instruction();
  i.type = INST_LABEL;
  i.args[0] = "GAMEPLAY";
  l.instructions.push(i);
  //
  i = new instruction();
  i.type = INST_WAIT;
  i.args[0] = [3];
  l.instructions.push(i);
  //
  i = new instruction();
  i.type = INST_SPAWN_ENEMY;
  i.args[0] = [0];
  l.instructions.push(i);
  //
  i = new instruction();
  i.type = INST_JUMP;
  i.args[0] = "GAMEPLAY";
  l.instructions.push(i);
  //
  i = new instruction();
  i.type = INST_END;
  l.instructions.push(i);

  gg.levels.push(l);
  //>>>>>>>>>>>




}

