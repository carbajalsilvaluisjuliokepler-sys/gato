var turno = 1;
var nTurnoM = 1;
var x = [];

function evaluar(me){
	//console.log(me);
	//console.log(me.id);
	var id = me.id;
	console.log(id);
	console.log(me.innerHTML);
	console.log(me.classList);

	me.classList.remove('btn-outline-dark');

	if(turno == 1){
		me.innerHTML = "<i class='fa fa-cog fa-4x' aria-hidden='true'></i>";
		me.classList.add('btn-outline-danger');
	}	

	me.classList.add('disabled');

	var w = hasWinner();
	despliegaInfo(w);

	turno = (turno+1) % 2;

	if(turno == 0){
		var es = turnoMaquina();
		console.log(es);
		document.getElementById(es).innerHTML = "<i class='fa fa-check-circle fa-4x' aria-hidden='true'></i>";
		document.getElementById(es).classList.remove('btn-outline-dark');
		document.getElementById(es).classList.add('btn-outline-success', 'disabled');
		var v = hasWinner();
		despliegaInfo(v);
		turno = (turno+1) % 2;
	}
}

function despliegaInfo(w){
	var inf;
	if(w == 0)
		inf = "Aun no hay un ganador";
	else if(w == 1)
		inf = "Gano la IA :(";
	else if(w == 2)
		inf = "Felicidades, eres el ganador!";

	document.getElementById("info").innerHTML = inf;
}


function hasWinner(){
	var cont = 0;

	for(var i=0; i<3; i++){
		x[i] = [];
		for(var j=0; j<3; j++){
			//No ha sido usado aun
			if(document.getElementById(cont).classList.contains('btn-outline-dark')){
				x[i][j] = 0;
			}
			//Ya lo escogio el jugador 1
			else if(document.getElementById(cont).classList.contains('btn-outline-success')){
				x[i][j] = 1;
			}
			//Ya lo escogio el jugador 2
			else if(document.getElementById(cont).classList.contains('btn-outline-danger')){
				x[i][j] = 2;
			}

			console.log("["+i+"]["+j+"]="+ x[i][j]);
			cont++;
		}
	}

	var winner = 0; //No hay ganador
	//Diagonal de arriba hacia abajo
	if(x[0][0]==x[1][1] && x[0][0]==x[2][2])
		return x[0][0];
	//Diagonal de abajo hacia arriba
	else if(x[0][2]==x[1][1] && x[0][2]==x[2][0])
		return x[0][2];
	else{
		//Columnas
		for(var i=0; i<3; i++){
			if(x[0][i]==x[1][i] && x[0][i]==x[2][i])
				return x[0][i];
		}

		//Filas
		for(var i=0; i<3; i++){
			if(x[i][0]==x[i][1] && x[i][0]==x[i][2])
				return x[i][0];
		}
	}

	return winner;
}


function turnoMaquina(){
	var cont = 0;
	var escogido;
	var ocupado = true;
	var x = [];

	for(var i=0; i<3; i++){
		x[i] = [];
		for(var j=0; j<3; j++){
			//No ha sido usado aun
			if(document.getElementById(cont).classList.contains('btn-outline-dark')){
				x[i][j] = 0;
			}
			//Ya lo escogio el jugador 1
			else if(document.getElementById(cont).classList.contains('btn-outline-success')){
				x[i][j] = 1;
			}
			//Ya lo escogio el jugador 2
			else if(document.getElementById(cont).classList.contains('btn-outline-danger')){
				x[i][j] = 2;
			}

			cont++;
		}
	}

	if(nTurnoM == 1){
		while(ocupado == true){
			escogido = Math.floor(Math.random() * (9 - 1)) + 1;
			ocupado = isOcupado(escogido, x);
		}
		nTurnoM++;
		ocupado = true;
		return escogido;
	}else if(nTurnoM == 2){
		escogido = escogePos(x);
		ocupado = isOcupado(escogido, x);
		while(ocupado == true){
			escogido = Math.floor(Math.random() * (9 - 1)) + 1;
			ocupado = isOcupado(escogido, x);
		}
		nTurnoM ++;
		ocupado = true;
		return escogido;
	}
	else if(nTurnoM == 3){
		escogido = escogePos(x);
		ocupado = isOcupado(escogido, x);
		while(ocupado == true){
			escogido = Math.floor(Math.random() * (9 - 1)) + 1;
			ocupado = isOcupado(escogido, x);
		}
		nTurnoM ++;
		ocupado = true;
		return escogido;
	}
	else if(nTurnoM == 4){
		while(ocupado == true){
			escogido = Math.floor(Math.random() * (9-1)) + 1;
			ocupado = isOcupado(escogido, x);
		}
		nTurnoM ++;
		ocupado = true;
		return escogido;
	}
}

function isOcupado(n, x){
	var k = 0;
	for(var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			if(n==k && x[i][j]==0)
				return false;
			k++;
		}
	}
	return true;
}

function escogePos(x){
	//Diagonal de arriba hacia abajo
	//No se toma en cuenta la pos 0 por que el juego siempre empieza ahi
	if(x[0][0]==2 && x[1][1]==2){
		return 8;
	}else if(x[0][0]==2 && x[2][2]==2)
		return 4;

	//Diagonal de abajo hacia arriba
	if(x[0][2]==2 && x[1][1]==2)
		return 6;
	if(x[0][2]==2 && x[2][0]==2)
		return 4;
	if(x[1][1]==2 && x[2][0]==2)
		return 2;

	//Columnas y filas
	for(var i=0; i<3; i++){
		//Filas de hasta abajo
		if(x[0][i]==2 && x[1][i]==2)
			return i+6;
		//Filas de en medio
		if(x[0][i]==2 && x[2][i]==2)
			return i+3;
		//Filas de arriba
		if(x[1][i]==2 && x[2][i]==2)
			return i;
		//Columas de la derecha
		if(x[i][0]==2 && x[i][1]==2)
			return (i*2) + (i+2);
		//Columnas de en medio
		if(x[i][0]==2 && x[i][2]==2)
			return (i*1) + (i+(i+1));
		//Columnas de la izquierda
		if(x[i][1]==2 && x[i][2]==2)
			return (2*i) + i;
	}
	//Caso omiso
	return Math.floor(Math.random() * (9-1)) + 1;
}