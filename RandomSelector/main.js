$(function () {
    // console.log("hi")
    let numOfListItem = $("#choices > li").length;
    let numString = [];//將吃過的東西存到這裡
    $("input").on("click", function () {
        // alert("hi")
        // debugger;
        let randomChildNumber = Math.floor(Math.random() * numOfListItem);
        if (numString.length == numOfListItem) {
            $("h1").text("都吃過了")
            $("img").attr("src", "");
        }
        else if (numString.indexOf(randomChildNumber) >= 0) {//有找到重複的indexOf會>=0
            for (x=1;x <= numString.length+1;x++) {//重抽，最多要抽numString.length+1次
                randomChildNumber = Math.floor(Math.random() * numOfListItem);
                if (numString.indexOf(randomChildNumber) < 0) {//抽到沒有重複的再執行
                    $("img").attr("src", "");//清空圖片
                    $("h1").text($("#choices > li").eq(randomChildNumber).text());
                    $("img").attr("src", imageArray[randomChildNumber]);
                    $("#choices > li").eq(randomChildNumber).css("color", "#F0F0F0");
                    numString.push(randomChildNumber);
                    break;
                }else{//抽到重複的x要減掉這次
                    x--;
                }
            }
        } else {//
            $("img").attr("src", "");
            $("h1").text($("#choices > li").eq(randomChildNumber).text());
            //相當於html <img src="">
            $("img").attr("src", imageArray[randomChildNumber]);
            $("#choices > li").eq(randomChildNumber).css("color", "#F0F0F0")//吃過的變顏色
            numString.push(randomChildNumber);//將吃過的存起來
        }
    })
})
imageArray = [
    "https://image-resizer.cwg.tw/resize/uri/https%3A%2F%2Fstorage.googleapis.com%2Fwww-cw-com-tw%2Farticle%2F202101%2Farticle-5ff76e12dff12.jpg/?w=1260&format=webp",
    "https://lordcat.tw/wp-content/uploads/2021/09/1631538408-378fce845ce05de4c29be3e870b50e13.jpg",
    "https://shopping.udn.com/blog/public/uploads/edImages/20210423062930967.jpg"
];
