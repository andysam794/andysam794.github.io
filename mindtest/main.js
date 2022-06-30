$(function () {
    //儲存目前作答到哪一題
    let currentQuiz = null;
    //按下按鈕之後要做的事
    $("#startButton").on("click",function(){
        //開始作答
        if(currentQuiz==null){
            //從第0題開始
            currentQuiz=0;
            //顯示題目
            $("#question").text(questions[0].question);
            //將選項區清空
            $("#options").empty();
            //將選項逐個加入
            questions[0].answers.forEach(function(element,index,array){
                $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`)
            });
            //將按鈕上的文字改成Next
            $("#startButton").attr("value","Next");

        }else{
            //已經開始作答
            //尋訪哪個選項有被選取
            $.each($(":radio"), function(i,val){
                if(val.checked){
                    //是否已走到最後結果(A~D)
                    if (isNaN(questions[currentQuiz].answers[i][1])) {
                        //通往最後結果
                        let finalResult=questions[currentQuiz].answers[i][1];
                        $("#question").text(finalAnswers[finalResult][0]);
                        $("#options").empty();
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz=null;
                        $("#startButton").attr('value','重新開始');
                    }else{
                    //正常跳下一題,原始資料題號從1開始要-1
                    currentQuiz=questions[currentQuiz].answers[i][1]-1;
                    //顯示新的題目
                    $("#question").text(questions[currentQuiz].question);
                    $("#options").empty();
                    questions[currentQuiz].answers.forEach(function(element,index,array){
                        $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`)
                    });
                    }
                    return false
                }
            })

        }

    })
});

