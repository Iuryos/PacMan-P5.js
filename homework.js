var life=3,T=0,score=0,dif=0,difficulty="supimpa",rx=1,dead=false,marg=100,tam=30,mov=false,mob=false,ta=0,tg=0,anim=false,lock=false;
var ex=(8*tam)+(tam/2),ey=5.5*tam+marg,ed=1,px,py,pd=1,vel=4,vele=4,enemy=0,stat="menu",totcomida=0,mouthx=-0.2,mouthy=0.2,openmouth=true,stopmouth=true;
var lockR=false,lockU=false,lockL=false,lockD=false;
//Tamanho = tam;Margem = marg;Velocidade = vel;Velocidade do inimigo = vele; Tempo Geral = tg; Tempo de jogo = T;
//Posição do pacman: x->px y->py direção->pd;
//Posição do inimigo: x->ex y->ey direção->ed;
/*Direção(pd/ed):
0=Parado, virado para direita
1=Direita
2=Cima
3=Esquerda
4=Baixo*/
var lab,supimpa,facilimo,facil,normal,dificil;
supimpa = [
['X','V','V','V','V','V','V','X'],
['>','s','s','f','f','s','s','<'],
['>','s','s','f','f','s','s','<'],
['>','s','@','@','@','@','s','<'],
['>','s','s','f','f','s','s','<'],
['>','s','s','f','f','s','s','<'],
['X','A','A','A','A','A','A','X']
];
facilimo = [
['X','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','X'],
['>','f','f','f','f','@','f','f','f','f','f','f','f','f','@','f','f','f','f','<'],
['>','f','@','@','s','@','s','@','@','@','@','@','@','s','@','s','@','@','f','<'],
['>','f','@','s','s','s','s','s','s','s','s','s','s','s','s','s','s','@','f','<'],
['>','f','@','s','@','@','s','@','@','f','f','@','@','s','@','@','s','@','f','<'],
['>','f','s','s','s','s','s','@','e','f','f','e','@','s','s','s','s','s','f','<'],
['>','f','@','s','@','@','s','@','@','@','@','@','@','s','@','@','s','@','f','<'],
['>','f','@','s','s','s','s','s','s','v','v','s','s','s','s','s','s','@','f','<'],
['>','f','@','@','s','@','s','@','@','@','@','@','@','s','@','s','@','@','f','<'],
['>','f','f','f','f','@','f','f','f','f','f','f','f','f','@','f','f','f','f','<'],
['X','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','X']
];
facil = [
['X','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','X'],
['>','f','s','s','s','@','s','f','f','f','f','f','f','s','@','s','s','s','f','<'],
['>','s','@','@','s','@','s','@','@','@','@','@','@','s','@','s','@','@','s','<'],
['>','s','@','s','s','s','s','f','f','f','f','f','f','s','s','s','s','@','s','<'],
['>','s','@','s','@','@','s','@','@','v','v','@','@','s','@','@','s','@','s','<'],
['>','s','s','s','s','s','s','@','e','f','f','e','@','s','s','s','s','s','s','<'],
['>','s','@','s','@','@','s','@','@','@','@','@','@','s','@','@','s','@','s','<'],
['>','s','@','s','s','s','s','s','s','v','v','s','s','s','s','s','s','@','s','<'],
['>','s','@','@','s','@','s','@','@','@','@','@','@','s','@','s','@','@','s','<'],
['>','f','s','s','s','@','s','s','s','s','s','s','s','s','@','s','s','s','f','<'],
['X','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','X']
];
normal = [
['X','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','X'],
['>','f','s','s','s','@','s','s','s','s','s','s','s','s','@','s','s','s','f','<'],
['>','s','@','@','s','@','s','@','@','@','@','@','@','s','@','s','@','@','s','<'],
['>','s','@','s','f','s','s','s','s','f','f','s','s','s','s','f','s','@','s','<'],
['>','s','@','s','@','@','s','@','@','v','v','@','@','s','@','@','s','@','s','<'],
['>','s','s','s','s','s','s','@','e','f','f','e','@','s','s','s','s','s','s','<'],
['>','s','@','s','@','@','s','@','@','@','@','@','@','s','@','@','s','@','s','<'],
['>','s','@','s','f','s','s','s','s','v','v','s','s','s','s','f','s','@','s','<'],
['>','s','@','@','s','@','s','@','@','@','@','@','@','s','@','s','@','@','s','<'],
['>','f','s','s','s','@','s','s','s','s','s','s','s','s','@','s','s','s','f','<'],
['X','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','X']
];
dificil = [
['X','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','V','X'],
['>','f','s','s','s','@','s','s','s','s','s','s','s','s','@','s','s','s','f','<'],
['>','s','@','@','s','@','s','@','@','@','@','@','@','s','@','s','@','@','s','<'],
['>','s','@','s','s','s','s','s','s','s','s','s','s','s','s','s','s','@','s','<'],
['>','s','@','s','@','@','s','@','@','v','v','@','@','s','@','@','s','@','s','<'],
['>','s','s','s','s','s','s','@','e','e','e','e','@','s','s','s','s','s','s','<'],
['>','s','@','s','@','@','s','@','@','@','@','@','@','s','@','@','s','@','s','<'],
['>','s','@','s','s','s','s','s','s','v','v','s','s','s','s','s','s','@','s','<'],
['>','s','@','@','s','@','s','@','@','@','@','@','@','s','@','s','@','@','s','<'],
['>','f','s','s','s','@','s','s','s','s','s','s','s','s','@','s','s','s','f','<'],
['X','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','X']
];

function setup(){
	createCanvas(600,500);
	background(0);
	frameRate(30);
}
function katiau(){
	//Quadrado que se move em cima da tela:
	fill(0,70,140);
	rect(rx,15,15,15);
	if(rx>=600){
		rx=-15
	}
	rx+=4;
}
function cen(){
	//Cenário:
	totcomida=0;
	for (i=0; i <lab.length; i++) {
		for (j=0;j<lab[0].length;j++) {
			//Blocos(paredes):
			if(lab[i][j]=="@"||lab[i][j]==">"||lab[i][j]=="<"||lab[i][j]=="V"||lab[i][j]=="A"||lab[i][j]=="X"){
				stroke(0,30,100);
				fill(0,100,255);
				rect(j*tam,i*tam+marg,tam,tam);
			}
			//Comidas:
			if(lab[i][j]=="s"){
				//Comidas pequenas:
				noStroke();
				fill(240,240,0);
				ellipse(j*tam+(tam/2),i*tam+(tam/2)+marg,tam/5,tam/5);
				totcomida++;
			}
			if(lab[i][j]=="f"){
				//Comidas grandes:
				noStroke();
				fill(0,200,0);
				ellipse(j*tam+(tam/2),i*tam+(tam/2)+marg,tam/2,tam/2);
				totcomida++;
			}
		}
	}
	if(totcomida<1){
			stat = "proxnivel"
	}
}
function colision(){
	//Colisão:
	for (i=0; i <lab.length; i++) {
		for (j=0;j<lab[0].length;j++) {
			if(lab[i][j]=="@"){
				//Com as paredes:
				if(dist(j*tam+(tam/2),i*tam+marg+(tam/2),px,py)<=tam/1.5&&mov){
					mov=false;
					mob=false;
					if(pd===1){
						if(!lock){
							px-=8;
							lock=true;
						}
						lockR=true;
					}
					if(pd===2){
						if(!lock){
							py+=8;
							lock=true;
						}
						lockU=true;
					}
					if(pd===3){
						if(!lock){
							px+=8;
							lock=true;
						}
						lockL=true;
					}
					if(pd===4){
						if(!lock){
							py-=8;
							lock=true;
						}
						lockD=true;
					}
				}
				//Mecanismo Anti-Bug:
				if(dist(j*tam+(tam/2),i*tam+marg+(tam/2),px,py)<=tam/2){
					if(pd===1){
							px+=16;
							lockR=false;
							lockU=false;
							lockL=false;
							lockD=false;
							lock=false;
							mov=false;
					}
					if(pd===2){
							py-=16;
							lockR=false;
							lockU=false;
							lockL=false;
							lockD=false;
							lock=false;
							mov=false;
					}
					if(pd===3){
							px-=16;
							lockR=false;
							lockU=false;
							lockL=false;
							lockD=false;
							lock=false;
							mov=false;
					}
					if(pd===4){
							py+=16;
							lockR=false;
							lockU=false;
							lockL=false;
							lockD=false;
							lock=false;
							mov=false;
					}
				}
			}
			//Paredes unidirecionais:
			if(lab[i][j]==">"){
				if(dist(j*tam+(tam/2),i*tam+marg+(tam/2),px,py)<=tam/1.5&&mov){
					mov=false;
					mob=false;
					if(!lock){
						px+=8;
						lock=true;
					}		
				}								
			}
			if(lab[i][j]=="<"){
				if(dist(j*tam+(tam/2),i*tam+marg+(tam/2),px,py)<=tam/1.5&&mov){
					mov=false;
					mob=false;
					if(!lock){
						px-=8;
						lock=true;
					}
				}													
			}
			if(lab[i][j]=="V"){
				if(dist(j*tam+(tam/2),i*tam+marg+(tam/2),px,py)<=tam/1.5&&mov){
					mov=false;
					mob=false;
					if(!lock){
						py+=8;
						lock=true;
					}
				}		
			}
			if(lab[i][j]=="A"){
				if(dist(j*tam+(tam/2),i*tam+marg+(tam/2),px,py)<=tam/1.5&&mov){
					mov=false;
					mob=false;
					if(!lock){
						py-=8;
						lock=true;
					}
				}	
			}
			if(lab[i][j]=='s'&&dist(j*tam+(tam/2),i*tam+(tam/2)+marg,px,py)<=tam/2.8){
				//Com as comidas pequenas:
				lab[i][j]='v';
				score++;
				stopmouth=false;
			}
			if(lab[i][j]=='f'&&dist(j*tam+(tam/2),i*tam+(tam/2)+marg,px,py)<=tam/2){
				//Com as comidas grandes:
				lab[i][j]='v';
				score+=5;
				stopmouth=false;
			}
		}
	}
}
function paqman(){
	//Cor:
	noStroke();
	fill(255,255,0);
	//Animação:
	if(!stopmouth){
		if(openmouth){
			mouthx-=0.06;
			mouthy+=0.06;
		}
		if(mouthx<-1.0000000000000001){
			openmouth=false;
		}
		else if(mouthx>-0.2){
			openmouth=true;
			stopmouth=true;
		}
		if(!openmouth){
			mouthx+=0.06;
			mouthy-=0.06;	
		}
	}
	//Direção:
		if(pd==1){
			arc(px,py,tam-8,tam-8,QUARTER_PI+mouthx+0.2,PI+PI-QUARTER_PI+mouthy-0.2,PIE);
			fill(0);
			ellipse(px,py-4,4,4);
			if(mov){
				px+=vel;
			}
		}
		else if(pd==2){
			arc(px,py,tam-8,tam-8,TWO_PI-QUARTER_PI+mouthx+0.2,PI+QUARTER_PI+mouthy-0.2,PIE);
			fill(0);
			ellipse(px-4,py,4,4);
			if(mov){
				py-=vel;
			}
		}
		else if(pd==3){
			arc(px,py,tam-8,tam-8,PI+QUARTER_PI+mouthx+0.2,HALF_PI+QUARTER_PI+mouthy-0.2,PIE);
			fill(0);
			ellipse(px,py-4,4,4);
			if(mov){
				px-=vel;
			}
		}
		else if(pd==4){
			arc(px,py,tam-8,tam-8,QUARTER_PI+HALF_PI+mouthx+0.2,QUARTER_PI+mouthy-0.2,PIE);
			fill(0);
			ellipse(px+4,py,4,4);
			if(mov){
				py+=vel;
			}
		}
		//Movimentação:
		if(keyIsDown(RIGHT_ARROW)&&!lockR){
			pd=1;
			mov=true;
			lockR=false;
			lockU=false;
			lockL=false;
			lockD=false;
			lock=false;
		}	
		else if(keyIsDown(UP_ARROW)&&!lockU){
			pd=2;
			mov=true;
			lockR=false;
			lockU=false;
			lockL=false;
			lockD=false;
			lock=false;
		}
		else if(keyIsDown(LEFT_ARROW)&&!lockL){
			pd=3;
			mov=true;
			lockR=false;
			lockU=false;
			lockL=false;
			lockD=false;
			lock=false;
		}
		else if(keyIsDown(DOWN_ARROW)&&!lockD){
			pd=4;
			mov=true;
			lockR=false;
			lockU=false;
			lockL=false;
			lockD=false;
			lock=false;
		}
}
function simpleenemy(){
	//Paqman vermelho:
	noStroke();
	fill(255,0,0);
	//Verificar direção:
	if(ed==1){
		arc(ex,ey,tam-5,tam-5,QUARTER_PI,PI+PI-QUARTER_PI,PIE);
	}
	else if(ed==3){
		arc(ex,ey,tam-5,tam-5,PI+QUARTER_PI,HALF_PI+QUARTER_PI,PIE);
	}
	if(dist(px,py,ex,ey)<=tam/1.2){
		px=-tam-5;
		py=-tam-5;
		life-=1;
		dead=true;
	}
	if(dead){
		px=10*tam;
		py=8*tam+marg-(tam/2);
		dead=false;
		pd=1;
		mov=false;
	}
	if(life<1){
		stat="game over";
	}
	if(ex<(8*tam)+(tam/2)){
		vele=-vele;
		ed=1;
	}
	if(ex>(11*tam)+(tam/2)){
		vele=-vele;
		ed=3;
	}
	ex+=vele;
}
function draw(){
	fill(0)
	rect(-1,-1,802,702);
	//Telas do jogo:
	if(stat=="menu"){
		fill(255,255,0)
		arc(300,80,100,100,QUARTER_PI,PI+PI-QUARTER_PI,PIE);
		textStyle(BOLD);
		textFont("Verdana",40);
		stroke(250,250,0);
		if(ta<50){
			anim=false;
		}
		else if(ta==50){
			anim=true;
		}
		else if(ta>100){
			ta=0;
		}
		fill(50,50,200);
		if(anim){
			stroke(50,50,200);
			fill(250,250,0);
		}
		strokeWeight(5);
		text("Paq Man",205,180);
		noStroke();
		fill(50,50,200);
		//if(anim){
		//	fill(250,250,0);
		//}
		rect(195,196,220,5);
		rect(410,181,5,20);
		textFont("Arial",30);
		fill(255);
		text("Pressione D para jogar",140,300);
		if(keyIsDown(68)){
			stat = "pregame";
		}
	}
	if(stat=="pregame"){
		fill(250,250,255);
		textStyle(BOLD);
		textFont("Courier",25);
		text("Pressione a dificuldade:",50,120);
		text("1 - Supimpa\n2 - Facilimo\n3 - Facil\n4 - Normal\n5 - Dificil",70,150);
		if(keyIsPressed){	
			if(keyIsDown(49)){
				dif=1;
				lab=supimpa;
				difficulty="supimpa";
				enemy=0;
				px=2*tam+(tam/2);
				py=2*tam+(tam/2)+marg;
				vel = 2;
				stat="game";
				life=5
			}
			else if(keyIsDown(50)){
				dif=2;
				lab=facilimo;
				difficulty="facilimo";
				enemy=0;
				px=10*tam+(tam/2);
				py=8*tam+marg-(tam/2);
				vel = 3;
				vele=1;
				stat="game";
				life=4
			}
			else if(keyIsDown(51)){
				dif=3;
				lab=facil;
				difficulty="facil";
				enemy=0;
				px=10*tam+(tam/2);
				py=8*tam+marg-(tam/2);
				vel = 4;
				vele=2;
				stat="game";
				life=3
			}
			else if(keyIsDown(52)){
				dif=4;
				lab=normal;
				difficulty="normal";
				enemy=1;
				px=10*tam+(tam/2);
				py=8*tam+marg-(tam/2);
				vel=4;
				vele=3;
				stat="game";
				life=2
			}
			else if(keyIsDown(53)){
				dif=5;
				lab=dificil;
				difficulty="dificil";
				enemy=2;
				px=10*tam+(tam/2);
				py=8*tam+marg-(tam/2);
				vel=6;
				vele=4;
				stat="game";
				life=1
			}
		}
	}
	if(stat=="game"){
		fill(255);
		textStyle(BOLD);
		textFont("Monospace",15);
		text("Dificuldade: "+difficulty,380,480);
		text("Vidas: "+life,55,50);
		text("Tempo: "+Math.floor(T/30),230,50);
		text("Pontos: "+score,460,50);
		cen();
		colision();
		paqman();
		katiau();
		fill(0,0,255);
		rect(600,300,90,90);
		if(dif!==1){
			simpleenemy();
		}
		//Contador do tempo:
		T++;
	}
	if(stat=="proxnivel"){
			pd=1;
			mov=false;
			if(difficulty=="supimpa"){
				dif=2;
				lab=facilimo;
				difficulty="facilimo";
				enemy=0;
				px=10*tam+(tam/2);
				py=8*tam+marg-(tam/2);
				vel = 3;
				vele=1;
				stat="game";
			}
			else if(difficulty=="facilimo"){
				dif=3;
				lab=facil;
				difficulty="facil";
				enemy=0;
				px=10*tam+(tam/2);
				py=8*tam+marg-(tam/2);
				vel = 4;
				vele=2;
				stat="game";
			}
			else if(difficulty=="facil"){
				dif=4;
				lab=normal;
				difficulty="normal";
				enemy=1;
				px=10*tam+(tam/2);
				py=8*tam+marg-(tam/2);
				vel=4;
				vele=3;
				stat="game";
			}
			else if(difficulty=="normal"){
				dif=5;
				lab=dificil;
				difficulty="dificil";
				enemy=2;
				px=10*tam+(tam/2);
				py=8*tam+marg-(tam/2);
				vel=6;
				vele=4;
				stat="game";
			}
			else if(difficulty=="dificil"){
				stat="endgame";
			}
	}
	if(stat=="game over"){
		fill(255);
		textStyle(BOLD);
		textFont("Verdana",40);
		text("Fim de jogo :c",50,400);
		fill(170);
		textFont("Arial",20);
		text("Aperte S para jogar novamente",200,450);
		if(keyIsDown(83)){
			stat = "menu";
		}
	}
	if(stat=="endgame"){
		var tend,pend,lend;
		lend=life;
		pend=score;
		tend=Math.floor(T/30);
		fill(255);
		textStyle(BOLD);
		textFont("Verdana",40);
		text("Jogo completado!\nParabens!",50,100);
		fill(170);
		textFont("Arial",20);
		text("Vidas restantes: "+lend+"\nPontos finais: "+pend+"\nTempo total: "+tend,100,250);
		text("Aperte D para jogar novamente",200,450);
		if(keyIsDown(68)){
			stat = "menu";
		}
	}
	ta++;
	tg++;

}
