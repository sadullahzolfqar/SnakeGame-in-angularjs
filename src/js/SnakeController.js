app.controller('SnakeController',function($scope,$timeout, $window,$selfPlay){

    var directions={
        left:39,
        right:37,
        up:38,
        down:40
    }
    
    var snake,forage;

   
    var boardSize=25;
    var speed=200;
    var timer;

    $scope.score = 0;

    $scope.startGame=function(){
        if(timer!=null){
            $timeout.cancel(timer);
        }
        $scope.score=0;
        speed=200;
        initSnake();
        generateForage();
        
        //selfPlaying();
        snakeMove();
    }


    function initSnake(){
        snake={
            Nodes:[{X:0,Y:0},{X:1,Y:0},{X:2,Y:0}],
            Direction:directions.left,
            NextDirection:directions.left
        };
    }

    function isSnakeBody(location){
        for(let index=0;index < snake.Nodes.length;index++){
            if(snake.Nodes[index].X===location.X && snake.Nodes[index].Y===location.Y){
                return true;
            }
        }
        return false;
    }

    function isForageBody(location){
        return location.X==forage.X && location.Y==forage.Y;
    }

    function isWallBody(location) {
        return location.X < 0 || location.Y < 0 || location.X >= boardSize || location.Y >= boardSize;
    }

    function eatForage(){
        var node=angular.copy(snake.Nodes[snake.Nodes.length-1]);
        snake.Nodes.push(node);
        
        if(speed>20){
            speed-=10;
        }
        $scope.score+=10;
        generateForage();
    }

    function generateForage(){
        forage={
            X:Math.floor(Math.random()*boardSize),
            Y:Math.floor(Math.random()*boardSize)
        }
       
        if(isSnakeBody(forage)){
            generateForage();
        }

        return forage;
    }

    $scope.getforageX=function(){
        return forage.X*20+'px';
    }
    $scope.getforageY=function(){
        return  forage.Y*20+'px';
    }
    
    function overGame(){
        $timeout.cancel(timer);
        initSnake();
        alert("Game Over Your Score is "+$scope.score);
    }

    

    function snakeMove(){
        let headNode=newNode();

        if(isSnakeBody(headNode)){
            overGame();
            return;
        }

        if(isWallBody(headNode)){
            overGame();
            return;
        }

        snake.Nodes.push(headNode);
        
        if(isForageBody(headNode)){
            eatForage();
        }

        snake.Nodes.shift();

        snake.Direction = snake.NextDirection;
   
        timer = $timeout(snakeMove,speed);
    }

    function newNode(){
        let node = angular.copy(snake.Nodes[snake.Nodes.length-1]);
        if(snake.NextDirection===directions.left){
            node.X++;
        }
        else if(snake.NextDirection===directions.right){
            node.X--;
        }
        else if(snake.NextDirection===directions.up){
            node.Y--;
        }
        else if(snake.NextDirection===directions.down){
            node.Y++;
        }
        return node;
    }

    $scope.getXmove = function(index){
        
        return snake.Nodes[index].X*20 +'px'
    }

    $scope.getYmove=function(index){
       
        return snake.Nodes[index].Y*20 +'px'
    }

    $scope.getSnakLength=function(){
        return new Array(snake.Nodes.length);
    }

    $window.addEventListener("keydown", function (e) 
    {
        var keyCode = e.keyCode;
        if (keyCode === directions.left && snake.Direction !== directions.right) {
            snake.NextDirection = directions.left;
        } else if (keyCode === directions.right && snake.Direction !== directions.left) {
            snake.NextDirection = directions.right;
        } else if (keyCode === directions.up && snake.Direction !== directions.down) {
            snake.NextDirection = directions.up;
        } else if (keyCode === directions.down && snake.Direction !== directions.up) {
            snake.NextDirection = directions.down;
        } else {
            
        }
        console.log(keyCode);
    });

    function setSelfPlayingObject(){
        $selfPlay.setSnake(snake.Nodes[snake.Nodes.length-1],snake.Direction);
        $selfPlay.setForage(forage);
    }

    $scope.startSelfPlaying = function(){
        if(timer!=null){
            $timeout.cancel(timer);
        }
        $scope.score=0;
        speed=200;
        initSnake();
        generateForage();
        
        selfPlaying();
        snakeMove();
    };

    function selfPlaying()
    {
        setSelfPlayingObject();
        var keyCode = $selfPlay.generateDirection();
        if (keyCode === directions.left && snake.Direction !== directions.right) {
            snake.NextDirection = directions.left;
        } else if (keyCode === directions.right && snake.Direction !== directions.left) {
            snake.NextDirection = directions.right;
        } else if (keyCode === directions.up && snake.Direction !== directions.down) {
            snake.NextDirection = directions.up;
        } else if (keyCode === directions.down && snake.Direction !== directions.up) {
            snake.NextDirection = directions.down;
        } else {
            
        }
        $timeout(selfPlaying,10);
    }

});