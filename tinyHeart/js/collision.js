//判断大鱼和果实的距离
function momFruitsCollosion(){
	if(!data.gameOver){
		for (var i = 0; i<fruit.num;i++) {
		 if(fruit.alive[i]){
		 	var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y)
		 	if(l<500){
		 		//fruit eaten
		 		fruit.dead(i);
		 		data.fruitNum++;
		 		
		 		mom.bigBodyCount++;
		 		if(mom.bigBodyCount > 7){
		 			mom.bigBodyCount = 7;
		 		}
		 		if(fruit.fruitType[i] == "bule"){
		 			data.double = 2;
		 		}
		 	}
		 }
		}
	}
	
}
 function momBabyCollision(){
 	if(data.fruitNum > 0&& !data.gameOver){
 		var l = calLength2(mom.x,mom.y,baby.x,baby.y);
	 		if(l < 900){
	 		baby.babyBodyCount = 0;
	 		//data => 0 
	 		//data.reset();
	 		mom.bigBodyCount = 0;
	 		// score update
	 		data.addScore();
	 	}
 	}
 	
 }
