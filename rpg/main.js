let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
const gridLength = 200;
var sources = {
    Mountain: "rpg/images/material.png",
    Enemy: "rpg/images/Enemy.png"
};
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}
// initial / start / beginning
$(function () {
    //0-可走/1-障礙/2-終點/3-敵人
    mapArray = [
        [0, 1, 1, 1, 2, 3],
        [0, 0, 0, 0, 0, 1],
        [3, 1, 2, 2, 3, 1]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");
    imgMain = new Image();
    imgMain.src = "rpg/images/spriteSheet.png";
    currentImgMain = {
        "x": 0,
        "y": 0
    };

    //主角繪製至畫面上 - 怕圖片物件還沒載入完成
    imgMain.onload = function () {
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    };
    // imgMountain = new Image();
    // imgMountain.src = "images/material.png";
    // imgEnemy = new Image();
    // imgEnemy.src = "images/Enemy.png";
    loadImages(sources, function (images) {
        for (var x in mapArray) {
            for (var y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    //Draw Mountain
                    ctx.drawImage(images.Mountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 3) {
                    //Draw Enemy
                    ctx.drawImage(images.Enemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
    });
    // imgMountain.onload = function(){
    //     imgEnemy.onload = function(){
    //         for(var x in mapArray){
    //             for(var y in mapArray[x]){
    //                 if(mapArray[x][y]==1){
    //                     //Draw Mountain
    //                     ctx.drawImage(imgMountain, 32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
    //                 }else if(mapArray[x][y]==3){
    //                     //Draw Enemy
    //                     ctx.drawImage(imgEnemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
    //                 }
    //             }
    //         }
    //     };
    // };

});
// user interaction / event trigger
$(document).on("keydown", function (event) {
    debugger;
    let targetImg, targetBlock, cutImagePositionX;
    //1.先判斷使用者按了什麼
    //2.判斷目標位置那一格是什麼
    //3.決定要做的事情(只是轉頭/可以過去/..)
    targetImg = { //Canvas(x,y)
        "x": -1,
        "y": -1
    };
    targetBlock = { //Data 2D array
        "x": -1,
        "y": -1
    }

    event.preventDefault();

    switch (event.code) {
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;//臉朝左
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;//臉朝上
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;//臉朝右
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;//臉朝下
            break;
        default://其他案件不處理
            return;
    }
    if (targetImg.x <= 1000 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;

    } else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    //清空主角原本所在的位置
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength)

    if (targetBlock.x != -1 && targetBlock.y != -1) {
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0://一般道路可移動
                $("#talkbox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1://有障礙物不可移動
                $("#talkbox").text("有山");
                break;
            case 2://終點可移動
                $("#talkbox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3://敵人不可移動
                $("#talkbox").text("hi");
                break;


        }
    } else {
        $("#talkbox").text("邊界");
    }
    //重新繪製主角
    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength)

});