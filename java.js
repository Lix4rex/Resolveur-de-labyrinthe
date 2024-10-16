var matrice;

matrice=[1,1,1,1,1,1,1,1,1,1,
		 1,0,1,0,0,0,0,0,0,1,
		 1,0,0,1,1,0,1,1,0,0,
		 1,0,1,0,1,1,0,0,0,1,
		 1,0,0,0,1,0,0,1,1,1,
		 1,0,1,0,0,0,1,1,0,1,
		 1,0,0,0,1,0,1,0,0,1,
		 1,0,1,1,1,0,1,1,0,1,
		 0,0,0,0,1,0,0,0,0,1,
		 1,1,1,1,1,1,1,1,1,1]

var matriceExemple;
			 
let id=["case1","case2","case3","case4","case5","case6","case7","case8","case9","case10",
		"case11","case12","case13","case14","case15","case16","case17","case18","case19","case20",
		"case21","case22","case23","case24","case25","case26","case27","case28","case29","case30",
		"case31","case32","case33","case34","case35","case36","case37","case38","case39","case40",
		"case41","case42","case43","case44","case45","case46","case47","case48","case49","case50",
		"case51","case52","case53","case54","case55","case56","case57","case58","case59","case60",
		"case61","case62","case63","case64","case65","case66","case67","case68","case69","case70",
		"case71","case72","case73","case74","case75","case76","case77","case78","case79","case80",
		"case81","case82","case83","case84","case85","case86","case87","case88","case89","case90",
		"case91","case92","case93","case94","case95","case96","case97","case98","case99","case100"]


var choixDepartArrive = new Boolean(false);

var nbChoix=0;

var jeu = new Boolean(false);

let a = 1

function poseDecorExemple(){
	
	viderAll();
	matriceExemple=[1,1,1,1,1,1,1,1,1,1,
					1,0,1,0,0,0,0,0,0,1,
					1,0,0,1,1,0,1,1,0,0,
					1,0,1,0,1,1,0,0,0,1,
					1,0,0,0,1,0,0,1,1,1,
					1,0,1,0,0,0,1,1,0,1,
					1,0,0,0,1,0,1,0,0,1,
					1,1,0,1,1,0,1,1,0,1,
					1,0,0,0,1,0,0,0,0,1,
					1,1,1,1,1,1,1,1,1,1]
	
	var elts=document.getElementsByName("case");
	
	for (let i=0; i<matriceExemple.length; i++) 
	{
		if (matriceExemple[i]==1)
		{
			elts[i].style.background="red";
		}
	
    }
}

function poseDecor(matrice){
	var elts=document.getElementsByName("case");
	
	for (let i=0; i<matrice.length; i++) 
	{
		if (matrice[i]==1)
		{
			elts[i].style.background="red";
		}
		else if (matrice[i]==2)
		{
			elts[i].style.background="green";
		}
		else if (matrice[i]==3)
		{
			elts[i].style.background="orange";
		}
		else
		{
			elts[i].style.background="yellow";
		}
    }
}

function resolveGame(){
	document.getElementById("resolveGame").value="I DIDN'T DO THAT YET";
}


function generate(){
	jeu = new Boolean(false);
	var elts=document.getElementsByName("case");
	for (let i=0; i<100; i++)
	{
		if (elts[i].style.background=="red")
		{
			matrice[i]=1;
		}
		else
		{
			matrice[i]=0;
		}
	}
	poseDecor(matrice);
	
	choixDepartArrive = new Boolean(true);
	var elts=document.getElementsByName("case");
	
	alert("Please check your Start and End by clicking on the case");
}

function remplirAll(){
	
	var elts=document.getElementsByName("case");
	
	for (let i=0; i<100; i++) 
	{
		elts[i].style.background="red";
	}
	
}

function viderAll(){
	
	var elts=document.getElementsByName("case");
	
	for (let i=0; i<100; i++) 
	{
		elts[i].style.background="yellow";
	}
	
}


function changeFond(nombreCase){
	if (jeu==false)
	{
		var elts=document.getElementsByName("case");
		if (choixDepartArrive==false)
		{
			if (elts[nombreCase].style.background=="yellow")
			{
				elts[nombreCase].style.background="red";
			}
			else
			{
				elts[nombreCase].style.background="yellow";
			}
		}
		else
		{
			if (elts[nombreCase].style.background=="yellow")
			{
				nbChoix+=1;
				
				if(nbChoix==1){elts[nombreCase].style.background="green";matrice[nombreCase]=2;}
			
				if (nbChoix>=2)
				{
					matrice[nombreCase]=3;
					elts[nombreCase].style.background="orange";
					
					choixDepartArrive=new Boolean(false);
					poseDecor(matrice);
					
					jeu=new Boolean(true);
					const perso = new Robot();
	
					var elts=document.getElementsByName("case");
					for (let i=0; i<100; i++) 
					{	
						if(elts[i].style.background=="green")
						{
							perso.y=i.toString().split("")[0];
							perso.x=i.toString().split("")[1];
							matrice[i]=0;
						}
						if(elts[i].style.background=="orange")
						{
							perso.yFin=i.toString().split("")[0];
							perso.xFin=i.toString().split("")[1];
						}
					}
					
					perso.dessiner();
					
					setInterval(() => {
						let minutes = parseInt(a / 60, 10)
						let secondes = parseInt(a % 60, 10)
						
						minutes = minutes < 10 ? "0" + minutes : minutes
						secondes = secondes < 10 ? "0" + secondes : secondes

						document.getElementById("timerTest").innerText = `${minutes}:${secondes}`
						a =  a + 1
					}, 1000);
					
					setInterval(() => {
						if(jeu==true)
						{			
							if (perso.direction=="est")
							{
								if (matrice[parseInt((parseInt(perso.y)-1).toString() + perso.x.toString())]==0)
								{
									perso.direction="nord";
									document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
									perso.avancer();
								}
								else if (matrice[parseInt((parseInt(perso.y)-1).toString() + perso.x.toString())]==3)
								{
									perso.direction="nord";
									document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
									perso.avancer();
									
									jeu=new Boolean(false);
									alert("LABYRINTHE RESOLU");
								}
								else
								{
									if (matrice[parseInt(perso.y.toString() + (parseInt(perso.x)+1).toString())]==0)
									{
										document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
										perso.avancer();
									}
									else if (matrice[parseInt(perso.y.toString() + (parseInt(perso.x)+1).toString())]==3)
									{
										document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
										perso.avancer();
										
										jeu=new Boolean(false);
										alert("LABYRINTHE RESOLU");
									}
									else
									{
										perso.tourner();
									}
								}
							}
							
							else if (perso.direction=="ouest")
							{
								if (matrice[parseInt((parseInt(perso.y)+1).toString() + perso.x.toString())]==0)
								{
									perso.direction="sud";
									document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
									perso.avancer();
								}
								else if (matrice[parseInt((parseInt(perso.y)+1).toString() + perso.x.toString())]==3)
								{
									perso.direction="sud";
									document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
									perso.avancer();
									
									jeu=new Boolean(false);
									alert("LABYRINTHE RESOLU");
								}
								else
								{
									if (matrice[parseInt(perso.y.toString() + (parseInt(perso.x)-1).toString())]==0)
									{
										document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
										perso.avancer();
									}
									else if (matrice[parseInt(perso.y.toString() + (parseInt(perso.x)-1).toString())]==3)
									{
										document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
										perso.avancer();
										
										jeu=new Boolean(false);
										alert("LABYRINTHE RESOLU");
									}
									else
									{
										perso.tourner();
									}
								}
							}
							
							else if (perso.direction=="nord")
							{
								if (matrice[parseInt(perso.y.toString() + (parseInt(perso.x)-1).toString())]==0)
								{
									perso.direction="ouest";
									document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
									perso.avancer();
								}
								else if (matrice[parseInt(perso.y.toString() + (parseInt(perso.x)-1).toString())]==3)
								{
									perso.direction="ouest";
									document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
									perso.avancer();
									
									jeu=new Boolean(false);
									alert("LABYRINTHE RESOLU");
								}
								else
								{
									if (matrice[parseInt((parseInt(perso.y)-1).toString() + perso.x.toString())]==0)
									{
										document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
										perso.avancer();
									}
									else if (matrice[parseInt((parseInt(perso.y)-1).toString() + perso.x.toString())]==3)
									{
										document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
										perso.avancer();
										
										jeu=new Boolean(false);
										alert("LABYRINTHE RESOLU");
									}
									else
									{
										perso.tourner();
									}
								}
							}
							
							else if (perso.direction=="sud")
							{
								if (matrice[parseInt(perso.y.toString() + (parseInt(perso.x)+1).toString())]==0)
								{
									perso.direction="est";
									document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
									perso.avancer();
								}
								else if (matrice[parseInt(perso.y.toString() + (parseInt(perso.x)+1).toString())]==3)
								{
									perso.direction="est";
									document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
									perso.avancer();
									
									jeu=new Boolean(false);
									alert("LABYRINTHE RESOLU");
								}
								else
								{
									if (matrice[parseInt((parseInt(perso.y)+1).toString() + perso.x.toString())]==0)
									{
										document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
										perso.avancer();
									}
									else if (matrice[parseInt((parseInt(perso.y)+1).toString() + perso.x.toString())]==3)
									{
										document.getElementsByName("case")[parseInt(perso.y.toString() + perso.x.toString())].style.background="yellow";
										perso.avancer();
										
										jeu=new Boolean(false);
										alert("LABYRINTHE RESOLU");
									}
									else
									{
										perso.tourner();
									}
								}
							}
							perso.dessiner();
						}
					}, 100)
				}
			}
			else
			{
				alert("You have to click on a yellow case");
			}
		}
	}
}

class Robot{	
	constructor()
	{
		this.direction="est";
	
		this.x=0;
		this.y=0;
		
		this.xFin=1;
		this.xFin=1;
		
	}
	
	dessiner()
	{
		document.getElementsByName("case")[parseInt(this.y.toString() + this.x.toString())].style.background="black";
	}
	
	avancer()
	{
		if (this.direction=="est")
		{
			this.x++;
		}
		else if (this.direction=="ouest")
		{
			this.x--;
		}
		else if (this.direction=="nord")
		{
			this.y--;
		}
		else if (this.direction=="sud")
		{
			this.y++;
		}
	}
	
	tourner()
	{
		if (this.direction=="est"){this.direction="sud";document.getElementById("resolveGame").value="sud";}
		else if (this.direction=="ouest"){this.direction="nord";document.getElementById("resolveGame").value="nord";}
		else if (this.direction=="nord"){this.direction="est";document.getElementById("resolveGame").value="est";}
		else if (this.direction=="sud"){this.direction="ouest";document.getElementById("resolveGame").value="ouest";}
	}
}