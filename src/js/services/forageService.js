app.factory('$forage',function(){

    var service = {
        forage:{
            X:Math.floor(Math.random()*boardSize),
            Y:Math.floor(Math.random()*boardSize)
        },
    };

    var boardSize = 25;
   
    service.init = function (){
        service.forage={
            X:Math.floor(Math.random()*boardSize),
            Y:Math.floor(Math.random()*boardSize)
        };
    };


    service.isInBody = function (location){
        return location.X == service.forage.X && location.Y == service.forage.Y;
    };

    service.getXpx = function (){
        return service.forage.X*20 +'px'
    };

    service.getYpx = function (){
        return service.forage.Y*20 +'px'
    };

    return service;
});