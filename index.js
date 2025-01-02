let gemset=[];
let startset=[];
let btns = ["red","bule","green","yellow"];
let start=false;
let level=0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
       if(start== false){

              console.log("Game sarted");
              start=true;
       }
       levelUp();

});

function btnflash(btn){
btn.classList.add("flash");
  setTimeout(function(){
       btn.classList.remove("flash");

  }, 1000);
}

function levelUp(){
       level++;
       h2.innerText=`Level 1${level}`;

       let randIdx= Math.floor(Math.random()*3);
       let randClr= btns[randIdx];
       let randbtn= document.querySelector(`.${randClr}`);
       console.log(randbtn);
       console.log(randClr);
       console.log(randIdx);
       //randon btn falsh
   btnflash(randbtn);
}