const canvas=document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext("2d");
var gravity=1;
var coefficientOfRestitution= 0.8;
const colors=["#ebebeb","#f5a25d","#fa7f72","#389393"];
window.addEventListener("resize",function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
})
document.addEventListener("click",function(){
    init();
})
function Ball(x,y,dx,dy,radius)
{
    this.x=x;
    this.y=y;
    this.dy=dy;
    this.dx=dx;
    this.radius=radius;
    this.color=colors[Math.floor(Math.random()*4)];
    this.draw=function()
    {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        c.fillStyle=this.color;
        c.fill();
    }
    this.update=function()
    {
        if(this.y + this.radius + this.dy> canvas.height)
        {
            this.dy*=(-1);
            this.dy*=(coefficientOfRestitution);
        }
        else{
            this.dy+=gravity;
        }
        if(this.x + this.radius +this. dx > canvas.width || this.x - this.radius + this.dx < 0)
        {
            this.dx*=(-1);
        }
        this.y+=this.dy;
        this.x+=this.dx;
        this.draw();
    }
}

var circles=[];
function init()
{
    circles=[];
    for(let i=0;i<100;i++)
    {   
        var radius=Math.floor(Math.random()*30);
        var x= Math.floor(Math.random()*(canvas.width - 2*radius)) + radius;
        var y= innerHeight/2 - Math.floor(Math.random()*canvas.height/2 - radius);
        var dx=Math.floor(Math.random()*11)-5;
        var dy=0;
        circles.push(new Ball(x,y,dx,dy,radius));
    }
}
function animate()
{
    c.clearRect(0,0,innerWidth,innerHeight);
    for(let i=0;i<circles.length;i++)
    {
        circles[i].update();
    }
    requestAnimationFrame(animate);
}
init();
animate();