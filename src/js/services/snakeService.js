app.factory('$snake',function(){

    const service = {
        snake:null,
        NodeSize:0,
    };

    const directions={
        left:39,
        right:37,
        up:38,
        down:40
    };

    service.init = function (){
        service.snake = {
            Nodes:[{X:0,Y:0},{X:1,Y:0},{X:2,Y:0}],
            Direction:directions.left,
            NextDirection:directions.left
        };
        service.NodeSize = 3;
    };

    service.isInBody = function (location){
        for(let index=0;index < service.NodeSize;index++){
            if(service.snake.Nodes[index].X===location.X && service.snake.Nodes[index].Y===location.Y){
                return true;
            }
        }
        return false;
    };

    service.addNewNode = function (){
        var node = angular.copy(service.snake.Nodes[service.NodeSize-1]);
        service.snake.Nodes.push(node);
        service.NodeSize ++ ;
    };

    service.removeBeginNode = function(){
        service.snake.Nodes.shift();
        service.NodeSize -- ;
    };

    service.addNewHead = function (Head){
        service.snake.Nodes.push(Head);
        service.NodeSize ++ ;
    };

    service.getNewHeadNode = function(){
        let node = angular.copy(service.snake.Nodes[service.NodeSize-1]);
       
        if(service.snake.NextDirection===directions.left){
            node.X++;
        }
        else if(service.snake.NextDirection===directions.right){
            node.X--;
        }
        else if(service.snake.NextDirection===directions.up){
            node.Y--;
        }
        else if(service.snake.NextDirection===directions.down){
            node.Y++;
        }
        return node;
    };

    service.getXpx = function (index){
        return service.snake.Nodes[index].X*20 +'px'
    };

    service.getYpx = function (index){
        return service.snake.Nodes[index].Y*20 +'px'
    };


    return service;
});