var degToRad = Math.PI / 180.0;
var frameRate = 60;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.enableTextures(true);

		this.gl.clearColor(0.7, 0.9, 1.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);
		
		//GUI textures
		this.vehicleAppearances = [];
		this.currVehicleAppearance = 0;
		this.vehicleAppearancesList = ['Camo', 'Flames','Rusty', 'Murica'];

		this.terrainAppearances = [];
		this.currTerrainAppearance = 0;
		this.terrainAppearancesList = ['Dirt', 'Sand'];
		//END GUI textures

		//Axis section
		this.showAxis=true;

		//Polyhedrons sextion
		this.showPolyhedrons=false;

		//Lights section
		this.light_0=true;
		this.light_1=true;
		this.light_2=true;
		this.light_3=true;
		//End Lights section

		this.speed=1;

		this.altimetry= [[ 20.0 , 20.0 , 10.0, 10.0, 10.0, 5.0, 0.0, 0.0,0],
						 [ 20.0 , 5.0 , 5.0, 0.0, 0.0, 0.0, 0.0, 0.0,0],
						 [ 10.0 , 5.0 , 5.0, 0.0, 5.0, 0.0, 0.0, 0.0,0],
						 [ 5.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0],
						 [ 5.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0],
						 [ 2.0 , 5.0 , 5.0, 0.0, 0.0, 0.0, 0.0, 0.0,0],
						 [ 2.50 , 5.0 , 5.0, 0.0, 0.0, 0.0, 0.0, 0.12,0],
						 [ 1.25 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0]
						];

		this.nrDivs = this.altimetry.length - 1;

		// Scene elements
		this.car = new MyVehicle(this);
		this.crane = new MyCrane(this);
		this.spot = new MyQuad(this);

		this.terrain = new MyTerrain(this, this.nrDivs, this.altimetry);
		this.skyDome = new MySkyDome(this, 20, 20);

		this.cube = new MyUnitCubeQuad(this);
		this.cilinder = new MyCilinder(this, 16, 20);
		this.trapezoid = new MyRoof(this);
		this.semisphere = new MyLamp(this, 8, 20);
		// Scene elements end

		// Flags
		this.isCarPlaced = false;
		this.keepMoving = false;
		//Flags End

		// Materials and appearances
		this.materialDefault = new CGFappearance(this);

		this.skyAppearance = new CGFappearance(this);
		this.skyAppearance.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.skyAppearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.skyAppearance.setSpecular(1.0, 1.0, 1.0, 1.0);
		this.skyAppearance.setShininess(0.0);
		this.skyAppearance.loadTexture("../resources/images/skydome8.png");

		this.spotDepart = new CGFappearance(this);
		this.spotDepart.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.spotDepart.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.spotDepart.setSpecular(1.0, 1.0, 1.0, 1.0);
		this.spotDepart.setShininess(0.0);
		this.spotDepart.loadTexture("../resources/images/departure.png");

		this.spotArrival = new CGFappearance(this);
		this.spotArrival.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.spotArrival.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.spotArrival.setSpecular(1.0, 1.0, 1.0, 1.0);
		this.spotArrival.setShininess(0.0);
		this.spotArrival.loadTexture("../resources/images/arrival.png");

		this.americaFlag = new CGFappearance(this);
		this.americaFlag.loadTexture("../resources/images/muricaFlag.png");
		// Materials end

		this.setUpdatePeriod(1000/frameRate);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0.4, 0.4, 0.4, 1.0);

		this.lights[0].setPosition(4.0, 6.0, 1.0, 1.0);
		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[2].setPosition(7.8, 1.5, 4.9);
		this.lights[3].setPosition(7.8, 1.5, 6.0);

		this.lights[0].setAmbient(0.0, 0.0, 0.0, 1.0);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	
		this.lights[1].setAmbient(0.0, 0.0, 0.0, 1.0);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);

	  	this.lights[2].setAmbient(0.3, 0.3, 0.3, 1.0);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);

	  	this.lights[3].setAmbient(0.2, 0.2, 0.2, 1.0);
		this.lights[3].setDiffuse(0.8, 0.8, 0.8, 1.0);

	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();

		if(this.light_0) this.lights[0].enable();
		else this.lights[0].disable();
	
		if(this.light_1) this.lights[1].enable();
		else this.lights[1].disable();
		
		if(this.light_2) this.lights[2].enable();
		else this.lights[2].disable();

		if(this.light_3) this.lights[3].enable();
		else this.lights[3].disable();
	}


	display()
	{
		// ---- BEGIN Background, camera and axis setup
		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if(this.showAxis) this.axis.display();

		//In case of no textures
		this.materialDefault.apply();
		// ---- END Background, camera and axis setup

		// Terrain
		this.pushMatrix();
			if(!this.showPolyhedrons) this.terrain.display();
		this.popMatrix();
		// End terrain

		// Car
		this.pushMatrix();
			this.translate(this.car.posX, 5.1, this.car.posZ);
			this.rotate(this.car.rotation * degToRad, 0, 1, 0);
			if(!this.showPolyhedrons)
				if (this.crane.drawCar) this.car.display();
		this.popMatrix();
		// End car

		// Sky
		this.pushMatrix();
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.scale(50, 50, 50);
			this.skyAppearance.apply();
			if(!this.showPolyhedrons) this.skyDome.display();
		this.popMatrix();

		this.pushMatrix();
			this.rotate(Math.PI/2, 1, 0, 0);
			this.scale(50, 50, 50);
			this.skyAppearance.apply();
			if(!this.showPolyhedrons) this.skyDome.display();
		this.popMatrix();
		// End sky

		// Crane
		this.pushMatrix();
			if(!this.showPolyhedrons) this.crane.display();
		this.popMatrix();
		// End crane

		//Spot no chão para o guindaste apanhar o carro
		this.pushMatrix();
			this.translate(19.5, 0.1, -0.5);
			this.scale(7, 1, -4);
			this.rotate(Math.PI/2, 1, 0, 0);
			this.spotDepart.apply();
			if(!this.showPolyhedrons) this.spot.display();
		this.popMatrix();

		//Spot no chão para o guindaste deixar o carro
		this.pushMatrix();
			this.translate(-3, 0.1, 17);
			this.scale(7, 1, -4);
			this.rotate(Math.PI/2, 1, 0, 0);
			this.rotate(Math.PI/2, 0, 0, 1);
			this.scale(2, 0.6, 1);
			this.spotArrival.apply();
			if(!this.showPolyhedrons) this.spot.display();
		this.popMatrix();

		//Poliedros
		this.pushMatrix();
			this.translate(6,0,0);
			this.americaFlag.apply();
			if(this.showPolyhedrons) this.cilinder.display();
		this.popMatrix();

		this.pushMatrix();
			this.translate(2,0,0);
			if(this.showPolyhedrons) this.trapezoid.display();
		this.popMatrix();

		this.pushMatrix();
			this.translate(10,0,0);
			if(this.showPolyhedrons) this.semisphere.display();
		this.popMatrix();

	};

	//Função responsável por redesenhar o carro na posição em que o guindaste o coloca
	reDrawCar(x, z)
	{
		if(this.car.posX > 22 && this.car.posX < 24 && this.car.posZ > 1 && this.car.posZ < 2){
			this.car.posX = x;
			this.car.posZ = z;
			this.car.rotation = 270;
		}
	};

	resetFlags()
	{
		this.keepMoving = false;
		this.isCarPlaced = false;
		this.crane.resetFlags();
	};

	update(currTime) {

		let w = false, s = false, d = false, a = false;

		if (this.gui.isKeyPressed("KeyW")) w = true;
		else w = false;

		if (this.gui.isKeyPressed("KeyS")) s = true;
		else s = false;
		
		if (this.gui.isKeyPressed("KeyD")) d = true;
		else d = false;
		
		if (this.gui.isKeyPressed("KeyA")) a = true;	
		else a = false;

		this.lastTime = this.lastTime || 0;
		this.deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;

		//Condicões que verificam se o carro está no spot de "Partida"
		if(this.car.posX > 22 && this.car.posX < 24 && this.car.posZ > 1 && this.car.posZ < 2)
			this.isCarPlaced = true;
		else
			this.isCarPlaced = false;
		

		if (this.isCarPlaced == false && this.crane.drawCar == true) // Mexe o carro se nao estiver no spot
		{
			this.car.update(this.deltaTime, w, s, d, a);

			if (this.keepMoving == true) // Quando o carro ja esta no chao mas o guindaste ainda esta a mexer
			{
				this.crane.update(this.deltaTime);
			}
		}

		else if(this.isCarPlaced == true && this.crane.drawCar == true) // Quando o carro ja esta preso ao guindaste
		{
			this.crane.update(this.deltaTime);
				if(this.keepMoving == true){
					this.resetFlags();
				}
		}
		else if(this.crane.drawCar == false) // Quando o carro ja esta preso ao guindaste
		{
			this.crane.update(this.deltaTime);
			this.keepMoving = true;
			this.reDrawCar(-5, 19.5);
		}
	};

	doSomething()
	{
		console.log("Doing something. . .");
	};

	checkKeys()
	{

		var text="Keys pressed: ";

		var keysPressed=false;
		
		if (this.gui.isKeyPressed("KeyW")){

			text += " W ";	
			keysPressed = true;
		}
		
		if (this.gui.isKeyPressed("KeyS")){
		
			text += " S ";
			keysPressed = true;
		}

		if (this.gui.isKeyPressed("KeyD")){

			text += " D ";
			keysPressed = true;
		}

		if (this.gui.isKeyPressed("KeyA")){

			text += " A ";
			keysPressed = true;
		}
		
	}

};