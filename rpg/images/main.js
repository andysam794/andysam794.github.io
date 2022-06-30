let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
const gridLength = 200;
$(function(){
    // 0可走,1障礙,2終點,3敵人
    mapArray=[
        [0,1,1],
        [0,0,0],
        [3,1,2],
    ]
    currentImgMain={
        "x":0,
        "y":0
    }
    ctx=$("#myCanvas")[0].getContext("2d");

    imgMain=new Image();
    imgMain.src="images/spriteSheet.png"
    // 將主角繪製桌面上，但怕圖片物件還沒載入完成
    imgMain.onload=function(){
        ctx.drawImage(imgMain, 0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    }
    imgMountain=new Image();
    imgMountain.src="images/material.png";
    imgEnemy=new Image();
    imgEnemy.src="images/Enemy.png";
    imgMountain.onload=function(){
        imgEnemy.onload=function(){
            for (let x in mapArray){
                for (let y in mapArray[x]){
                    if (mapArray[x][y]==1){
                        //Draw mountain
                        ctx.drawImage(imgMountain, 32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                    }else if (mapArray[x][y]==3){
                        //Draw enemy
                        ctx.drawImage(imgEnemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                }
            }
        }
    }
});

$(document).on("keydown",function(event){
    // debugger;  
    let targetImg, targetBlock, cutImagePositionX;
    // 判斷使用者按什麼鍵
    // 判斷目標位置那一格是什麼
    // 決定要做的事情
    // cutImagePositionX 決定主角臉朝哪裡
    targetImg={//主角的目標座標canvas(x,y)
        "x":-1,
        "y":-1
    };
    targetBlock={//data 2D Array
        "x":-1,
        "y":-1
    }
    event.preventDefault();
    //避免鍵盤預設行為發生 ex捲動/放大/換頁...

})