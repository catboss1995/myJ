//排序前
let sortBefore = document.getElementById("sortBefore")
//排序後
let sortAfter = document.getElementById("sortAfter")
//第二區
let secNo = document.getElementById("secNo")

// "威力彩"
function lott1(){
    //第1區.1-38取6
    //建立存放號碼的空陣列
    let lott = [];

    //while

    while(1){
        //檢查是否有6個號碼
        if(lott.length == 6){
            break;
        }

        //取亂數
        let lottNo = Math.floor(Math.random() * 38) +1;
        //檢查是否重複
        if(lott.includes(lottNo)==false){ //沒有重複
        lott.push(lottNo); //增加號碼到陣列中
    }
    
    }
    // 未排序
    sortBefore.textContent = "排序前號碼:" +lott;
    // 排序
    lott.sort((a,b)=>{
        return a-b;
    })
    sortAfter.textContent = "排序後號碼:" +lott;
    // 第2區.8取1
    secNo.textContent = "第二區號碼:" +(Math.floor(Math.random()*8)+1);

}
// "樂透彩"
function lott2(){
    //第1區.1-49取6
    //建立存放號碼的空陣列
    let lott = [];

    // while

    while(1){
        //檢查是否己經有6個號碼
        if(lott.length == 7){
            break;
        }
        //取亂數
        let lottNo = Math.floor(Math.random() * 49) + 1;
        //檢查是否重複
        //如果沒有重複
        if(lott.includes(lottNo)){
            lott.push(lottNo); //增加號碼到陣列中
        }
    }
    // 取出陣列最後一個值,並移除
    secNo.textContent = "特別號:" + lott.pop();
    // 未排序
    sortBefore.textContent = "排序前號碼:" + lott;
    // 排序
    lott.sort((a,b)=>a-b);
    sortAfter.textContent = "排序後號碼:" + lott;
    
}

// "今彩539"
function lott3(){
    //第1區.1-39取5
    //建立存放號碼的空陣列
    let lott = [];

    //while

    while(1){
        //檢查是否有5個號碼
        if(lott.length == 5){
            break;
        }
        //取亂數
        let lottNo = Math.floor(Math.random() * 39) + 1;
        //檢查是否重複
        //如果沒有重複
        if(lott.includes(lottNo)=== false){
            lott.push(lottNo); //增加號碼到陣列中
        }
    }

    // 未排序
    sortBefore.textContent = "排序前號碼:" + lott;
    // 排序
    lott.sort((a,b)=>a-b);
    sortAfter.textContent = "排序後號碼:" + lott;
    // 第二區沒有號碼,清除
    secNo.textContent = "";
}

/*
    //威力彩第1個號碼for寫法
    let lottNo = Math.floor(Math.random() * 38) +1;
    lott.push(lottNo);
    // 第2個號碼後，每個都要檢查是否重複
    // 因為還須5個號碼
    for (let i= 1; i<=5 ; i++){
        //取亂數
        lottNo = Math.floor(Math.random() * 38) +1;
        //檢查是否重複
        if(lott.includes(lottNo)==false){
            lott.push(lottNo);//增加號碼到陣列中
        }else{
            i=i-1;
        }
    }
*/