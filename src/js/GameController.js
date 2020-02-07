app.controller('GameController',function($scope,$timeout, $window,$selfPlay,$snake,$forage){

    const directions={
        left:39,
        right:37,
        up:38,
        down:40
    };
    const boardSize=25;
    
    var speed;
    var timer;

    $scope.score = 0;

    $scope.checkPost = function(){
        $selfPlay.SaveTrainData();
    }

    $scope.init = function(){
        $snake.init();
        $forage.init();

        $scope.score=0;
        speed=200;
        if(timer!=null){
            $timeout.cancel(timer);
        }

        generateForage();
    };

    $scope.over = function(){
        $timeout.cancel(timer);
        $selfPlay.SaveTrainData();
        alert("Game Over Your Score is "+$scope.score);
    };

    
    $scope.startGame=function(){
        $scope.init();
        Move();
    };

    function Move(){
        let headNode = $snake.getNewHeadNode();

        if($snake.isInBody(headNode)){
            $scope.over();
            return;
        }

        if(isInWallBody(headNode)){
            $scope.over();
            return;
        }

        $snake.addNewHead(headNode);
        
        if($forage.isInBody(headNode)){
            eatForage();
        }

        $snake.removeBeginNode();

        $snake.snake.Direction =  $snake.snake.NextDirection;
   
        timer = $timeout(Move,speed);
    }

    function isInWallBody(location) {
        return location.X < 0 || location.Y < 0 || location.X >= boardSize || location.Y >= boardSize;
    };

    function eatForage(){
        $snake.addNewNode();
        if(speed>20){
            speed-=10;
        }
        $scope.score+=10;
        generateForage();
    };

    function generateForage(){
        $forage.init();

        if($snake.isInBody($forage.forage)){
            generateForage();
        }
    };

    //ui control
    $scope.getforageX = function(){
        return $forage.getXpx();
    }; 
    $scope.getforageY =function(){
        return $forage.getYpx();
    }; 
    
    $scope.getXmove = function(index){
        return $snake.getXpx(index);
    } 
    $scope.getYmove = function(index){
        return $snake.getYpx(index);
    } 

    $scope.getSnakLength = function(){
        return new Array($snake.NodeSize);
    };

    $window.addEventListener("keydown", function (e) 
    {
        var keyCode = e.keyCode;
        if (keyCode === directions.left && $snake.snake.Direction !== directions.right) {
            $snake.snake.NextDirection = directions.left;
        } else if (keyCode === directions.right && $snake.snake.Direction !== directions.left) {
            $snake.snake.NextDirection = directions.right;
        } else if (keyCode === directions.up && $snake.snake.Direction !== directions.down) {
            $snake.snake.NextDirection = directions.up;
        } else if (keyCode === directions.down && $snake.snake.Direction !== directions.up) {
            $snake.snake.NextDirection = directions.down;
        } else {
            
        }
    });


    //self playing
    function setSelfPlayingObject(){
        $selfPlay.setSnake($snake.snake.Nodes[$snake.NodeSize-1],$snake.snake.Direction);
        $selfPlay.setForage($forage.forage);
    }

    $scope.startSelfPlaying = function(){
        if(timer!=null){
            $timeout.cancel(timer);
        }
        $scope.score = 0;
        speed = 200;
        $scope.init();
        generateForage();
        selfPlaying();
        Move();
    };

    function selfPlaying()
    {
        setSelfPlayingObject();
        var keyCode = $selfPlay.generateDirection();
        if (keyCode === directions.left && $snake.snake.Direction !== directions.right) {
            $snake.snake.NextDirection = directions.left;
        } else if (keyCode === directions.right && $snake.snake.Direction !== directions.left) {
            $snake.snake.NextDirection = directions.right;
        } else if (keyCode === directions.up && $snake.snake.Direction !== directions.down) {
            $snake.snake.NextDirection = directions.up;
        } else if (keyCode === directions.down && $snake.snake.Direction !== directions.up) {
            $snake.snake.NextDirection = directions.down;
        } else {
            
        }
        $timeout(selfPlaying,10);
    };


    $scope.init();
});