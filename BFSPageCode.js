'use strict'
var obst = false;
var start = false;
var end = false;
var clear = false;
var grid = {rows:0,cols:0,start:[0,0],dest:[[0,0]],calculated:false};
var isdown = false;
var parents = new Map();

const gridInit = () =>{
    var i = 1;
    var siz = 25;
    var gr = document.getElementById("grid");
    
    
    for(var r=0;r<siz;r++){
        var toadd = document.getElementById("grid");
        var row = document.createElement("div");
                
        row.id="row"+(r);
        row.style.display="flex"
           
        for(var c=0;c<siz;c++){
            var cell = document.createElement("div");
            var p = document.createElement("p");
            p.style.fontSize = "8px";
            p.style.color = "black";
            p.style.textAlign = "center";
            p.style.margin = "0px";
            
            //p.innerHTML=""+i;
            p.className = "InsideCell";
            cell.id="cell"+i;
            cell.style.backgroundColor="white";
            cell.style.display="inline-block";
            cell.style.margin="0px";
            cell.style.width="15px";
            cell.style.height="13px";
            cell.style.border="1px black solid"
            cell.style.paddingTop = "2px";
            cell.onmousedown=function(){mouseDown()};
            cell.ontouchmove=function(){changeCellT(event)}
            cell.onmouserup=function(){mouseUp()};
            cell.onmouseover=function(){changeCell(this.id,this.parentElement.id)};
            cell.style.touchAction = "none";
            p.id = "p"+i;
            p.style.touchAction = "none";
            cell.appendChild(p);
            row.appendChild(cell);
            row.style.touchAction = "none";
            
            i++;
        }
        toadd.appendChild(row);
    }
    grid.rows=siz;
    grid.cols=siz;
    grid.start=[0,0];
    grid.dest[0]=[siz-1,siz-1];
    grid.calculated=false
    setStart(grid.start[0],grid.start[1],grid.cols);
    setEnd(grid.dest[0][0],grid.dest[0][1],grid.cols);}

function setStart(i,j,cols){
    var cellnum = i*cols+j+1;
    var cell= document.getElementById("cell"+cellnum);
    var p= document.getElementById("p"+cellnum);
    p.innerHTML = "S"
    cell.style.backgroundColor="red";

}
function setEnd(i,j,cols){
   
    var cellnum = i*cols+j+1;
    var cell= document.getElementById("cell"+cellnum);
    cell.style.backgroundColor="black";
    grid.dest[0]=[i,j];
    document.getElementById("p"+cellnum).innerHTML="T1";
    document.getElementById("p"+cellnum).style.color = "white";

}

function newGrid(rows,cols,grid){
    deleteGrid();
    var i = 1;
    var gr = document.getElementById("grid");
    
    
    for(var r=0;r<rows;r++){
        var toadd = document.getElementById("grid");
        var row = document.createElement("div");
          
        row.id="row"+(r);
        row.style.display="flex"
           
        for(var c=0;c<cols;c++){
            var cell = document.createElement("div");
            var p = document.createElement("p");
            p.style.fontSize = "8px";
            p.style.color = "black";
            p.style.textAlign = "center";
            p.style.margin = "0px";
            
            //p.innerHTML=""+i;
            p.className = "InsideCell";
            cell.id="cell"+i;
            cell.style.backgroundColor="white";
            cell.style.display="inline-block";
            cell.style.margin="0px";
            cell.style.width="15px";
            cell.style.height="13px";
            cell.style.border="1px black solid"
            cell.style.paddingTop = "2px";
            cell.onpointerdown=function(){mouseDown()};
            cell.ontouchmove=function(){changeCellT(event)}
            cell.onpointerup=function(){mouseUp()};
            cell.onmouseover=function(){changeCell(this.id,this.parentElement.id)};
            cell.style.touchAction = "none";
            p.id = "p"+i;
            p.style.touchAction = "none";
            row.style.touchAction = "none";
            cell.appendChild(p);
            row.appendChild(cell);
            i++;
        }
        toadd.appendChild(row);
    }
    
    grid.rows=rows;
    grid.cols=cols;
    grid.start=[0,0];
    grid.dest=[[r-1,c-1]];
    grid.calculated=false
    setEnd(grid.dest[0][0],grid.dest[0][1],grid.cols)
    setStart(grid.start[0],grid.start[1],grid.cols)
    
}
function deleteGrid(){
    var row = document.getElementById("grid");
    while(row.hasChildNodes()){
        row.removeChild(row.firstChild);
    }
    
    
}

function changeGrid(rows,cols,grid){
    var warn = document.getElementById("Warn");
    if(rows<=0 || cols<=0){
        warn.innerHTML="Rows and colummns must be greater than 0!";
        var chnggrd = document.getElementById("mat");
        chnggrd.elements["Rows"].value=25;
        chnggrd.elements["Cols"].value=25;
        
    }
    else if(rows==1 && cols ==1){
        warn.innerHTML="Either rows or colummns must be greater than 1!";
        var chnggrd = document.getElementById("mat");
        chnggrd.elements["Rows"].value=25;
        chnggrd.elements["Cols"].value=25;
    }
    else if(rows>50 || cols>50){
        warn.innerHTML="Rows and columns must be 50 or less!"
        var chnggrd = document.getElementById("mat");
        chnggrd.elements["Rows"].value=25;
        chnggrd.elements["Cols"].value=25;
    }
    else{
        warn.innerHTML="";
        if(rows!=grid.rows || cols!=grid.cols){
            newGrid(rows,cols,grid);
        }
        
        
    }
}
function setObst(){
    var c1 = document.getElementById("hinder");
    var c2 = document.getElementById("start");
    var c3 = document.getElementById("end");
    var c4 = document.getElementById("clear");
    if(c1.checked==true){
        obst = true;
        start = false;
        end = false;
        clear = false;
        c2.checked = false;
        c3.checked = false;
        c4.checked = false
    }
    else{
        obst = false;
    }
    
}
function moveStart(){
    var c1 = document.getElementById("start");
    var c2 = document.getElementById("hinder");
    var c3 = document.getElementById("end");
    var c4 = document.getElementById("clear");

    if(c1.checked==true){
        start = true;
        obst = false;
        end = false;
        clear = false;
        c2.checked = false;
        c3.checked = false;
        c4.checked = false;
    }
    else{
        start = false;
    }
    
}
function moveEnd(){
    var c1 = document.getElementById("end");
    var c2 = document.getElementById("hinder");
    var c3 = document.getElementById("start");
    var c4 = document.getElementById("clear");    
    if(c1.checked==true){
        end = true;
        start = false;
        obst = false;
        clear = false;
        c2.checked = false;
        c3.checked = false;
        c4.checked = false;
    }
    else{
        end = false;
    }
}
function clearObst(){
    var c1 = document.getElementById("clear");
    var c2 = document.getElementById("hinder");
    var c3 = document.getElementById("start");
    var c4 = document.getElementById("end");    
    if(c1.checked==true){
        clear = true;
        start = false;
        obst = false;
        end = false;
        c2.checked = false;
        c3.checked = false;
        c4.checked = false;
    }
    else{
        clear = false;
    }
}
async function changeCell(ro,co){
    if(isdown){
        var i = Number(co.substring(3,co.length));
        var j = Number(ro.substring(4,ro.length))-1-i*grid.cols;
        
        var nele = document.getElementById(ro)
        if(start&&nele.style.backgroundColor!="red"&&nele.style.backgroundColor!="black"&&nele.style.backgroundColor!="gray"){
            var oele = document.getElementById("cell"+(grid.start[0]*grid.cols+grid.start[1]+1));
            document.getElementById("p"+(i*grid.cols+j+1)).innerHTML = "S";
            document.getElementById("p"+(grid.start[0]*grid.cols+grid.start[1]+1)).innerHTML = ""//+(grid.start[0]*grid.cols+grid.start[1]+1);
            oele.style.backgroundColor="white";
            nele.style.backgroundColor="red";
            grid.start=[i,j];
            if(grid.calculated){
                QSearch(grid.start[0],grid.start[1],1);
            }
               
        }
        else if(end&&nele.style.backgroundColor!="red"&&nele.style.backgroundColor!="black"&&nele.style.backgroundColor!="gray"){
            var coor = await getClosest(i,j);
            var oele = document.getElementById("cell"+(coor[0]*grid.cols+coor[1]+1));
            var temp = document.getElementById("p"+(coor[0]*grid.cols+coor[1]+1)).innerHTML;
            document.getElementById("p"+(coor[0]*grid.cols+coor[1]+1)).innerHTML=""//+(coor[0]*grid.cols+coor[1]+1);
            //document.getElementById("p"+(coor[0]*grid.cols+coor[1]+1)).style.color="black";
            oele.style.backgroundColor="white";
            nele.style.backgroundColor="black";
            document.getElementById("p"+ro.substring(4,ro.length)).innerHTML=temp;
            document.getElementById("p"+ro.substring(4,ro.length)).style.color="white";
            grid.dest[coor[2]]=[i,j];
            if(grid.calculated){
                QSearch(grid.start[0],grid.start[1],1);
            }
             
            
        }
        else if(obst&&nele.style.backgroundColor!="red"&&nele.style.backgroundColor!="black"&&nele.style.backgroundColor!="gray"){
            nele.style.backgroundColor="gray";
            if(grid.calculated){
                QSearch(grid.start[0],grid.start[1],1);
            }
            
        }
        else if(clear&&nele.style.backgroundColor=="gray"){
            nele.style.backgroundColor="white";

            if(grid.calculated){
                QSearch(grid.start[0],grid.start[1],1);
            }
            
        }
    
    }
    
}

async function changeCellT(event){
    var nele = document.elementFromPoint(event.touches[0].clientX,event.touches[0].clientY)
    var co = nele.parentElement.id;
    var ro = nele.id;
    if(nele.id.substring(0,4)=="cell"){
        
        var i = Number(co.substring(3,co.length));
        var j = Number(ro.substring(4,ro.length))-1-i*grid.cols;
        
        
        if(start&&nele.style.backgroundColor!="red"&&nele.style.backgroundColor!="black"&&nele.style.backgroundColor!="gray"){
            var oele = document.getElementById("cell"+(grid.start[0]*grid.cols+grid.start[1]+1));
            document.getElementById("p"+(i*grid.cols+j+1)).innerHTML = "S";
            document.getElementById("p"+(grid.start[0]*grid.cols+grid.start[1]+1)).innerHTML = ""//+(grid.start[0]*grid.cols+grid.start[1]+1);
            oele.style.backgroundColor="white";
            nele.style.backgroundColor="red";
            grid.start=[i,j];
            if(grid.calculated){
                QSearch(grid.start[0],grid.start[1],1);
            }
               
        }
        else if(end&&nele.style.backgroundColor!="red"&&nele.style.backgroundColor!="black"&&nele.style.backgroundColor!="gray"){
            var coor = await getClosest(i,j);
            var oele = document.getElementById("cell"+(coor[0]*grid.cols+coor[1]+1));
            var temp = document.getElementById("p"+(coor[0]*grid.cols+coor[1]+1)).innerHTML;
            document.getElementById("p"+(coor[0]*grid.cols+coor[1]+1)).innerHTML=""//+(coor[0]*grid.cols+coor[1]+1);
            //document.getElementById("p"+(coor[0]*grid.cols+coor[1]+1)).style.color="black";
            oele.style.backgroundColor="white";
            nele.style.backgroundColor="black";
            document.getElementById("p"+ro.substring(4,ro.length)).innerHTML=temp;
            document.getElementById("p"+ro.substring(4,ro.length)).style.color="white";
            grid.dest[coor[2]]=[i,j];
            if(grid.calculated){
                QSearch(grid.start[0],grid.start[1],1);
            }
             
            
        }
        else if(obst&&nele.style.backgroundColor!="red"&&nele.style.backgroundColor!="black"&&nele.style.backgroundColor!="gray"){
            nele.style.backgroundColor="gray";
            if(grid.calculated){
                QSearch(grid.start[0],grid.start[1],1);
            }
            
        }
        else if(clear&&nele.style.backgroundColor=="gray"){
            nele.style.backgroundColor="white";

            if(grid.calculated){
                QSearch(grid.start[0],grid.start[1],1);
            }
            
        }
    
    }
    await sleep(10);
    
}


function mouseDown(){
    isdown = true;
}
function mouseUp(){
    isdown = false;
}

async function startSearch(si,sj,d){
    parents.clear();
    var inq = []
    var i=0;
    var j=0;
    var reset = [false,false,false,false];
    if(start){
        document.getElementById("start").checked=false;
        start = false;
        reset[0] = true;
    }
    if(end){
        document.getElementById("end").checked=false;
        end = false;
        reset[1] = true;
    }
    if(obst){
        document.getElementById("hinder").checked=false;
        obst = false;
        reset[2] = true;
    }
    if(clear){
        document.getElementById("clear").checked=false;
        clear = false;
        reset[3] = true;
    }
    await setButtTrue();
    
    for(i = 0;i<grid.rows;i++){
        inq.push([])
        for(j=0;j<grid.cols;j++){
            inq[i].push(false);
            var curr = document.getElementById("cell"+(i*grid.cols+j+1));
            var pcurr = document.getElementById("p"+(i*grid.cols+j+1));
            if(curr.style.backgroundColor!="red"&&pcurr.innerHTML.charAt(0)!='T'&&curr.style.backgroundColor!="gray"){
                curr.style.backgroundColor="white";
            }
            if(pcurr.innerHTML.charAt(0)=='T'){
                curr.style.backgroundColor="black";
            }
        }
    }
    
    inq[si][sj]=true;
    
    await timedbfs(si,sj,inq,d);
    start=reset[0];
    end = reset[1];
    obst = reset[2];
    clear = reset[3];
    if(start){
        document.getElementById("start").checked=true;
    }
    if(end){
        document.getElementById("end").checked=true;
    }
    if(obst){
        document.getElementById("hinder").checked=true;
    }
    if(clear){
        document.getElementById("clear").checked=true;        
    }
    await setButtFalse();
    grid.calculated=true;
    

}


async function QSearch(si,sj,d){
    parents.clear();
    var inq = []
    var i=0;
    var j=0;
    var reset = [false,false,false,false];
    if(start){
        document.getElementById("start").checked=false;
        start = false;
        reset[0] = true;
    }
    if(end){
        document.getElementById("end").checked=false;
        end = false;
        reset[1] = true;
    }
    if(obst){
        document.getElementById("hinder").checked=false;
        obst = false;
        reset[2] = true;
    }
    if(clear){
        document.getElementById("clear").checked=false;
        clear = false;
        reset[3] = true;
    }
    await setButtTrue();
    
    
    for(i = 0;i<grid.rows;i++){
        inq.push([])
        for(j=0;j<grid.cols;j++){
            inq[i].push(false);
            var curr = document.getElementById("cell"+(i*grid.cols+j+1));
            var pcurr = document.getElementById("p"+(i*grid.cols+j+1));
            if(curr.style.backgroundColor!="red"&&pcurr.innerHTML.charAt(0)!='T'&&curr.style.backgroundColor!="gray"){
                curr.style.backgroundColor="white";
            }
            if(pcurr.innerHTML.charAt(0)=='T'){
                curr.style.backgroundColor="black";
            }
        }
    }
    inq[si][sj]=true;
    await bfs(si,sj,inq,d);
    start=reset[0];
    end = reset[1];
    obst = reset[2];
    clear = reset[3];
    if(start){
        document.getElementById("start").checked=true;
    }
    if(end){
        document.getElementById("end").checked=true;
    }
    if(obst){
        document.getElementById("hinder").checked=true;
    }
    if(clear){
        document.getElementById("clear").checked=true;        
    }
    await setButtFalse();
   
    grid.calculated=true;

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function bfs(si,sj,inq,d){
    var qi = [];
    var qj = [];
    var i = si;
    var j = sj;
    var rows = grid.rows  
    var cols = grid.cols;
   
    
    if((i-1)>=0){
        if(!inq[i-1][j]&&(document.getElementById("cell"+((i-1)*cols+j+1)).style.backgroundColor!="gray")){
            document.getElementById("cell"+((i-1)*cols+j+1)).style.backgroundColor="teal";
            
            qi.push(i-1);
            qj.push(j);
            parents.set((i-1)*cols+j+1,[i,j]);
            inq[i-1][j]=true;
        
        }
    }
    if((j+1)<cols){
        if(!inq[i][j+1]&&(document.getElementById("cell"+((i)*cols+j+1+1)).style.backgroundColor!="gray")){
            document.getElementById("cell"+((i)*cols+j+1+1)).style.backgroundColor="teal";
            
            qi.push(i);
            qj.push(j+1);
            parents.set((i)*cols+j+1+1,[i,j]);
            inq[i][j+1]=true;
        
        }
    }
    if((i+1)<rows){
        if(!inq[i+1][j]&&(document.getElementById("cell"+((i+1)*cols+j+1)).style.backgroundColor!="gray")){
            document.getElementById("cell"+((i+1)*cols+j+1)).style.backgroundColor="teal";
            
            qi.push(i+1);
            qj.push(j);
            parents.set((i+1)*cols+j+1,[i,j]);
            inq[i+1][j]=true;
        
        }
    }
    if((j-1)>=0){
        if(!inq[i][j-1]&&(document.getElementById("cell"+((i)*cols+j-1+1)).style.backgroundColor!="gray")){
            document.getElementById("cell"+((i)*cols+j-1+1)).style.backgroundColor="teal";
            
            qi.push(i);
            qj.push(j-1);
            parents.set((i)*cols+j-1+1,[i,j]);
            inq[i][j-1]=true;
        
        }
    }
        
    while(qi.length!=0 && document.getElementById("p"+((i)*cols+j+1)).innerHTML!=("T"+ d)){
        
    
        i = qi.shift();
        j = qj.shift();
        
        var curr = document.getElementById("cell"+((i)*cols+j+1));
       
        if(document.getElementById("p"+((i)*cols+j+1)).innerHTML!=("T"+d)){
            
        
        curr.style.backgroundColor = "orange";
        
        
        
        if((i-1)>=0){
            if(!inq[i-1][j]&&(document.getElementById("cell"+((i-1)*cols+j+1)).style.backgroundColor!="gray")){
                document.getElementById("cell"+((i-1)*cols+j+1)).style.backgroundColor="teal";
                                
                qi.push(i-1);
                qj.push(j);
                parents.set((i-1)*cols+j+1,[i,j]);
                inq[i-1][j]=true;
            
            }
        }
        if((j+1)<cols){
            if(!inq[i][j+1]&&(document.getElementById("cell"+((i)*cols+j+1+1)).style.backgroundColor!="gray")){
                document.getElementById("cell"+((i)*cols+j+1+1)).style.backgroundColor="teal";
                
                qi.push(i);
                qj.push(j+1);
                parents.set((i)*cols+j+1+1,[i,j]);
                inq[i][j+1]=true;
            
            }
        }
        if((i+1)<rows){
            if(!inq[i+1][j]&&(document.getElementById("cell"+((i+1)*cols+j+1)).style.backgroundColor!="gray")){
                document.getElementById("cell"+((i+1)*cols+j+1)).style.backgroundColor="teal";
                
                qi.push(i+1);
                qj.push(j);
                parents.set((i+1)*cols+j+1,[i,j]);
                inq[i+1][j]=true;
            
            }
        }
        if((j-1)>=0){
            if(!inq[i][j-1]&&(document.getElementById("cell"+((i)*cols+j-1+1)).style.backgroundColor!="gray")){
                document.getElementById("cell"+((i)*cols+j-1+1)).style.backgroundColor="teal";
                
                qi.push(i);
                qj.push(j-1);
                parents.set((i)*cols+j-1+1,[i,j]);
                inq[i][j-1]=true;
            
            }
            
        }
        curr.style.backgroundColor="blue";
        
        
    }        
        
    }
    var curr = document.getElementById("cell"+((i)*cols+j+1));
    
    var pcurr = document.getElementById("p"+((i)*cols+j+1));
    if(pcurr.innerHTML==("T"+d)){
        curr.style.backgroundColor = "orange";
        var parents2 = new Map(parents);
        if(d<grid.dest.length){
            var par = parents2.get(i*cols+j+1);
        
            var pi = par[0];
            var pj = par[1];
        
            var parent = document.getElementById("cell"+((pi)*cols+pj+1));
            var parentp = document.getElementById("p"+((pi)*cols+pj+1));
            while(parentp.innerHTML !=("T"+d) && parents2.get(pi*cols+pj+1)){
                if(parent.style.backgroundColor != "red" && parent.style.backgroundColor != "black"){
                    parent.style.backgroundColor="yellow";
                }
                par = parents2.get(pi*cols+pj+1);
                pi = par[0];
                pj = par[1];
                parent = document.getElementById("cell"+((pi)*cols+pj+1));
            }
            curr.style.backgroundColor = "black";
            document.getElementById("cell"+(grid.start[0]*grid.cols+grid.start[1]+1)).style.backgroundColor="red";
            
            await QSearch(i,j,d+1);
        }
        
        var par = parents2.get(i*cols+j+1);
        
        var pi = par[0];
        var pj = par[1];
        
        var parent = document.getElementById("cell"+((pi)*cols+pj+1));
        var parentp = document.getElementById("p"+((pi)*cols+pj+1));
        while(parentp.innerHTML !=("T"+ d) && parents2.get(pi*cols+pj+1)){
            if(parent.style.backgroundColor != "red" && parent.style.backgroundColor != "black"){
                parent.style.backgroundColor="yellow";
            }
            par = parents2.get(pi*cols+pj+1);
            pi = par[0];
            pj = par[1];
            parent = document.getElementById("cell"+((pi)*cols+pj+1));
            
        }
        curr.style.backgroundColor = "black";
        document.getElementById("cell"+(grid.start[0]*grid.cols+grid.start[1]+1)).style.backgroundColor="red";
    }
    else{
        var k =0;
        var l = 0;
        for(k=0;k<grid.rows;k++){
            for(l=0;l<grid.cols;l++){
                if(document.getElementById("p"+(k*grid.cols+l+1)).innerHTML.charAt(0) == "T"){
                    document.getElementById("cell"+(k*grid.cols+l+1)).style.backgroundColor = "black";
                }
            }
        }
    }
   
}
async function timedbfs(si,sj,inq,d){
    var qi = [];
    var qj = [];
    var i = si;
    var j = sj;
    var rows = grid.rows  
    var cols = grid.cols;
    var time = document.getElementById("mat").elements["Time"].value;
    if(time<0){
        document.getElementById("mat").elements["Time"].value=15;
        time = 1; 
    }
    else if(time>1000){
        document.getElementById("mat").elements["Time"].value=75;
        time = 500; 
    }
    await sleep(time);
    if((i-1)>=0){
        if(!inq[i-1][j]&&(document.getElementById("cell"+((i-1)*cols+j+1)).style.backgroundColor!="gray")){
            document.getElementById("cell"+((i-1)*cols+j+1)).style.backgroundColor="teal";
            
            qi.push(i-1);
            qj.push(j);
            parents.set((i-1)*cols+j+1,[i,j]);
            inq[i-1][j]=true;
            await sleep(time);
        }
    }
    if((j+1)<cols){
        if(!inq[i][j+1]&&(document.getElementById("cell"+((i)*cols+j+1+1)).style.backgroundColor!="gray")){
            document.getElementById("cell"+((i)*cols+j+1+1)).style.backgroundColor="teal";
            
            qi.push(i);
            qj.push(j+1);
            parents.set((i)*cols+j+1+1,[i,j]);
            inq[i][j+1]=true;
            await sleep(time);
        }
    }
    if((i+1)<rows){
        if(!inq[i+1][j]&&(document.getElementById("cell"+((i+1)*cols+j+1)).style.backgroundColor!="gray")){
            document.getElementById("cell"+((i+1)*cols+j+1)).style.backgroundColor="teal";
            
            qi.push(i+1);
            qj.push(j);
            parents.set((i+1)*cols+j+1,[i,j]);
            inq[i+1][j]=true;
            await sleep(time);
        }
    }
    if((j-1)>=0){
        if(!inq[i][j-1]&&(document.getElementById("cell"+((i)*cols+j-1+1)).style.backgroundColor!="gray")){
            document.getElementById("cell"+((i)*cols+j-1+1)).style.backgroundColor="teal";
            
            qi.push(i);
            qj.push(j-1);
            parents.set((i)*cols+j-1+1,[i,j]);
            inq[i][j-1]=true;
            await sleep(time);
        }
    }
        
    while(qi.length!=0 && document.getElementById("p"+((i)*cols+j+1)).innerHTML!=("T"+ d)){
        
        await sleep(time);
        i = qi.shift();
        j = qj.shift();
        
        var curr = document.getElementById("cell"+((i)*cols+j+1));
       
        if(document.getElementById("p"+((i)*cols+j+1)).innerHTML!=("T"+d)){
            
        
        curr.style.backgroundColor = "orange";
        
        await sleep(time);
        
        if((i-1)>=0){
            if(!inq[i-1][j]&&(document.getElementById("cell"+((i-1)*cols+j+1)).style.backgroundColor!="gray")){
                document.getElementById("cell"+((i-1)*cols+j+1)).style.backgroundColor="teal";
                                
                qi.push(i-1);
                qj.push(j);
                parents.set((i-1)*cols+j+1,[i,j]);
                inq[i-1][j]=true;
                await sleep(time);
            }
        }
        if((j+1)<cols){
            if(!inq[i][j+1]&&(document.getElementById("cell"+((i)*cols+j+1+1)).style.backgroundColor!="gray")){
                document.getElementById("cell"+((i)*cols+j+1+1)).style.backgroundColor="teal";
                
                qi.push(i);
                qj.push(j+1);
                parents.set((i)*cols+j+1+1,[i,j]);
                inq[i][j+1]=true;
                await sleep(time);
            }
        }
        if((i+1)<rows){
            if(!inq[i+1][j]&&(document.getElementById("cell"+((i+1)*cols+j+1)).style.backgroundColor!="gray")){
                document.getElementById("cell"+((i+1)*cols+j+1)).style.backgroundColor="teal";
                
                qi.push(i+1);
                qj.push(j);
                parents.set((i+1)*cols+j+1,[i,j]);
                inq[i+1][j]=true;
                await sleep(time);
            }
        }
        if((j-1)>=0){
            if(!inq[i][j-1]&&(document.getElementById("cell"+((i)*cols+j-1+1)).style.backgroundColor!="gray")){
                document.getElementById("cell"+((i)*cols+j-1+1)).style.backgroundColor="teal";
                
                qi.push(i);
                qj.push(j-1);
                parents.set((i)*cols+j-1+1,[i,j]);
                inq[i][j-1]=true;
                await sleep(time);
            }
            
        }
        curr.style.backgroundColor="blue";
        
        
    }        
        
    }
    var curr = document.getElementById("cell"+((i)*cols+j+1));
    
    var pcurr = document.getElementById("p"+((i)*cols+j+1));
    
    if(pcurr.innerHTML==("T"+d)){
        curr.style.backgroundColor = "orange";
        var parents2 = new Map(parents);
        if(d<grid.dest.length){
            var par = parents2.get(i*cols+j+1);
        
            var pi = par[0];
            var pj = par[1];
        
            var parent = document.getElementById("cell"+((pi)*cols+pj+1));
            var parentp = document.getElementById("p"+((pi)*cols+pj+1));
            while(parentp.innerHTML !=("T"+d) && parents2.get(pi*cols+pj+1)){
                if(parent.style.backgroundColor != "red" && parent.style.backgroundColor != "black"){
                    parent.style.backgroundColor="yellow";
                }
                par = parents2.get(pi*cols+pj+1);
                pi = par[0];
                pj = par[1];
                parent = document.getElementById("cell"+((pi)*cols+pj+1));
                await sleep(time);
            }
            curr.style.backgroundColor = "black";
            document.getElementById("cell"+(grid.start[0]*grid.cols+grid.start[1]+1)).style.backgroundColor="red";
            await sleep(1500);
            await startSearch(i,j,d+1);
        }
        
        var par = parents2.get(i*cols+j+1);
        
        var pi = par[0];
        var pj = par[1];
        
        var parent = document.getElementById("cell"+((pi)*cols+pj+1));
        var parentp = document.getElementById("p"+((pi)*cols+pj+1));
        while(parentp.innerHTML !=("T"+ d) && parents2.get(pi*cols+pj+1)){
            if(parent.style.backgroundColor != "red" && parent.style.backgroundColor != "black"){
                parent.style.backgroundColor="yellow";
            }
            par = parents2.get(pi*cols+pj+1);
            pi = par[0];
            pj = par[1];
            parent = document.getElementById("cell"+((pi)*cols+pj+1));
            await sleep(time);
        }
        curr.style.backgroundColor = "black";
        document.getElementById("cell"+(grid.start[0]*grid.cols+grid.start[1]+1)).style.backgroundColor="red";
    }
    else{
        var k =0;
        var l = 0;
        for(k=0;k<grid.rows;k++){
            for(l=0;l<grid.cols;l++){
                if(document.getElementById("p"+(k*grid.cols+l+1)).innerHTML.charAt(0) == "T"){
                    document.getElementById("cell"+(k*grid.cols+l+1)).style.backgroundColor = "black";
                }
            }
        }
    }
    await sleep(1500);
       
}

function addTarg(){
    if(grid.dest.length==3){
        document.getElementById("Warn").innerHTML="3 targets is the max!!";
        
    }
    else{
        var work = addEnd();
        if(work<0){
            document.getElementById("warn").innerHTML="Nowhere to add a target";
        }
        else{
            document.getElementById("Warn").innerHTML = "";
            var mess = document.getElementById("dests").innerHTML;
            document.getElementById("dests").innerHTML = mess.substring(0,mess.length-1)+(Number(mess.substring(mess.length-1,mess.length))+1);
            if(grid.calculated){
                QSearch(grid.start[0],grid.start[1],1);
            }
        }
    }
}
function subTarg(){
    if(grid.dest.length==1){
        document.getElementById("Warn").innerHTML="At least 1 target is required!!";
    }
    else{
        document.getElementById("Warn").innerHTML = "";
        var mess = document.getElementById("dests").innerHTML;
        document.getElementById("dests").innerHTML = mess.substring(0,mess.length-1)+(Number(mess.substring(mess.length-1,mess.length))-1);
        subDest();
        if(grid.calculated){
            QSearch(grid.start[0],grid.start[1],1);
        }
    }
}

function addEnd(){
    var found = false;
    var i = 1;
    while(i<(grid.rows*grid.cols)&&!found){
        var curr = document.getElementById("cell"+i);
        if(curr.style.backgroundColor!="red"&&curr.style.backgroundColor!="black"&&curr.style.backgroundColor!="gray"){
            curr.style.backgroundColor = "black";
            var r = Number(curr.parentNode.id.substring(3,curr.parentNode.id.length));
            var c = Number(curr.id.substring(4,curr.id.length))-r*grid.cols-1;
           
            grid.dest.push([r,c]);
            document.getElementById("p"+i).innerHTML="T"+grid.dest.length;
            document.getElementById("p"+i).style.color="white";
            found = true;
        }
        i++;
    }
    if(!found){
        return -1;
    }
    return 1;
}
function subDest(){
    var rem = grid.dest.pop();
    
    var i = rem[0];
    var j = rem[1];
    var cell = document.getElementById("cell"+(i*grid.cols+j+1));
    var p = document.getElementById("p"+(i*grid.cols+j+1));
    cell.style.backgroundColor = "white";
    p.innerHTML = "";
    p.style.color="black";
}
function getClosest(r,c){
    var dist = 10000;
    var index;
    var i = 0;
    for(i;i<grid.dest.length;i++){
        if(Math.sqrt(Math.pow((r-grid.dest[i][0]),2)+Math.pow((c-grid.dest[i][1]),2)<dist)){
            index = i;
            dist = Math.sqrt(Math.pow(r-grid.dest[i][0],2)+Math.pow(c-grid.dest[i][1],2));
        }
    }
    var ans = [];
    ans.push(grid.dest[index][0]);
    ans.push(grid.dest[index][1]);
    ans.push(index);   
    return ans
}
function clearGrid(){
    var i = 1;
    for(i=1;i<=(grid.cols*grid.rows);i++){
        var curr = document.getElementById("cell"+i);
        if(curr.style.backgroundColor!="red"&&curr.style.backgroundColor!="gray"&&curr.style.backgroundColor!="black"){
            curr.style.backgroundColor = "white"
        }
    }
    grid.calculated = false;
}
function clearQ(){
    var q = document.getElementById("Q");
    while(q.hasChildNodes()){
        q.removeChild(q.firstChild);
    }
    var cell = document.getElementById("ccell");
    cell.style.backgroundColor = "white"
    document.getElementById("cur").innerHTML="";

}
function setButtFalse(){
    document.getElementById("GridChange").disabled=false;
    document.getElementById("hinder").disabled=false;
    document.getElementById("start").disabled=false;
    document.getElementById("end").disabled=false;
    document.getElementById("clear").disabled=false;
    document.getElementById("Search").disabled=false;
    document.getElementById("QSearch").disabled=false;
    document.getElementById("AddDest").disabled=false;
    document.getElementById("SubDest").disabled=false;
    document.getElementById("clears").disabled=false;
    document.getElementById("clrg").disabled=false;
}
function setButtTrue(){
    document.getElementById("GridChange").disabled=true;
    document.getElementById("hinder").disabled=true;
    document.getElementById("start").disabled=true;
    document.getElementById("end").disabled=true;
    document.getElementById("clear").disabled=true;
    document.getElementById("Search").disabled=true;
    document.getElementById("QSearch").disabled=true;
    document.getElementById("AddDest").disabled=true;
    document.getElementById("SubDest").disabled=true;
    document.getElementById("clears").disabled=true;
    document.getElementById("clrg").disabled=true;
}
function clearObstacles(){
    var i = 1;
    for(i=1;i<(grid.cols*grid.rows);i++){
        var curr = document.getElementById("cell"+i);
        if(curr.style.backgroundColor=="gray"){
            curr.style.backgroundColor = "white"
        }
    }
    clearGrid();
}
gridInit();


var chnggrd = document.getElementById("mat");
chnggrd.elements["Rows"].value=25;
chnggrd.elements["Cols"].value=25;
chnggrd.elements["Time"].value = 10;
document.getElementById("GridChange").onclick =async function() {changeGrid(Math.floor(chnggrd.elements["Rows"].value),Math.floor(chnggrd.elements["Cols"].value),grid)};
document.getElementById("hinder").onclick = async function(){setObst()};
document.getElementById("start").onclick = async function(){moveStart()};
document.getElementById("end").onclick = async function(){moveEnd()};
document.getElementById("clear").onclick = async function(){clearObst()};
document.getElementById("Search").onclick = async function(){startSearch(grid.start[0],grid.start[1],1)}
document.getElementById("QSearch").onclick = async function(){QSearch(grid.start[0],grid.start[1],1)}
document.getElementById("AddDest").onclick = async function(){addTarg()}
document.getElementById("SubDest").onclick = async function(){subTarg()}
document.getElementById("clears").onclick = function(){clearGrid()}
document.getElementById("clrg").onclick = function(){clearObstacles()}
document.getElementById("contexplanations").style.paddingLeft = Math.floor(window.innerWidth/4)+"px";
document.getElementById("gridholder").style.touchAction = "none";
window.onmousedown = function() {mouseDown()};
window.onmouseup = function(){mouseUp()};
