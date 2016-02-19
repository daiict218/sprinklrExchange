var answerbtn = document.getElementsByClassName('question__vav__btn question__vav__btn--color')[0];
var c=answerbtn.childNodes[1].childNodes[0];
console.log(answerbtn);
var n=answerbtn.childNodes[3];
if(parseInt(c.textContent)==0) {
    c.className = 'x';
    n.className= 'name'
    answerbtn.style.background='white';
}
else
    answerbtn.style.background='orange';