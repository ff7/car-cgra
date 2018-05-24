var degToRad = Math.PI / 180.0;

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
		
		//GUI

		//GUI textures
		this.vehicleAppearances = [];
		this.currVehicleAppearance = 0;
		this.vehicleAppearancesList = ['Camo', 'Flames','NoText'];

		this.terrainAppearances = [];
		this.currTerrainAppearance = 0;
		this.terrainAppearancesList = ['Dirt', 'Sand'];
		//END GUI textures

		//Axis section
		this.showAxis=true;

		//Lights section
		this.light_0=true;
		this.light_1=true;
		this.light_2=true;
		this.light_3=true;

		this.speed=3;

		this.altimetry= [[ 50.0 , 50.0 , 5.0, 7.0, 5.5, 2.4, 2.3, 1.3, 1.0],
						 [ 50.0 , 50.0 , 5.0, 7.0, 10.5, 6.4, 4.3, 1.3, 1.0],
						 [ 11.0 , 9.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 22.0, 20.0, 0.0],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 2.4, 18.0, 16.0, 0.0],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 2.4, 18.0, 19.0, 0.0],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 6.0, 3.0],
						 [ 12.0 , 20.0 , 16.0, 16.0, 5.5, 2.4, 2.3, 1.3, 10.0]
						];


		//END GUI

		// Scene elements
		this.floor = new MyQuad(this, 0, 10, 0, 12);
		this.car = new MyVehicle(this);
		this.terrain = new MyTerrain(this, 8, this.altimetry);
		this.crane = new MyCrane(this,0,0,0);
		this.skyDome = new MySkyDome(this, 20, 20);
		this.crane = new MyCrane(this);
		this.spot = new MyQuad(this,0,10,0,12);
		this.keepMoving = false;

		// Flags
		this.isCarPlaced = false;

		// Textures
		this.arrival = new CGFappearance(this);
		this.arrival.setTextureWrap("REPEAT","REPEAT");
		this.arrival.loadTexture("../resources/images/arrival.png");
		

		this.departure = new CGFappearance(this);
		this.departure.setTextureWrap("REPEAT","REPEAT");
		this.departure.loadTexture("../resources/images/departure.png");

		// Scene elements end

		// Materials and appearances
		this.materialDefault = new CGFappearance(this);

		this.skyAppearance = new CGFappearance(this);
		this.skyAppearance.setAmbient(1,1,1,1);
		this.skyAppearance.setDiffuse(1,1,1,1);
		this.skyAppearance.setSpecular(1,1,1,1);
		this.skyAppearance.setShininess(0);
		this.skyAppearance.loadTexture("../resources/images/skydome8.png");

		// Materials end

		this.setUpdatePeriod(1000/60);
	};

	initCameras()
	{//estava 35 35 35
		//this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(100, 100, 100), vec3.fromValues(0, 0, 0));
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(90, 90, 90), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0.4, 0.4, 0.4, 1.0);

		this.lights[0].setPosition(4, 6, 1, 1);
		//this.lights[0].setVisible(true);

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		//this.lights[1].setPosition(true);

		//Farol esquerdo
		this.lights[2].setPosition(7.8, 1.5, 4.9);
		//this.lights[2].setVisible(true);

		//Farol direito
		this.lights[3].setPosition(7.8, 1.5, 6);
		//this.lights[3].setVisible(true);

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		//Farol esquerdo
	  	this.lights[2].setAmbient(0.3, 0.3, 0.3, 1);
		this.lights[2].setDiffuse(1, 1, 1, 1);
		this.lights[2].enable();

		//Farol direito
	  	this.lights[3].setAmbient(0.2, 0.2, 0.2, 1.0);
		this.lights[3].setDiffuse(0.8, 0.8, 0.8, 1.0);
		this.lights[3].enable();
	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();

		if(this.light_0 == true)
			this.lights[0].enable();
		else this.lights[0].disable();
	

		if(this.light_1 == true)
			this.lights[1].enable();
		else this.lights[1].disable();
		

		if(this.light_2 == true)
			this.lights[2].enable();
		else this.lights[2].disable();

		if(this.light_3 == true)
			this.lights[3].enable();
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
		if(this.showAxis == true){
			this.axis.display();
		}

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// Terrain
		this.pushMatrix();
			this.scale(2,2,2);
			this.terrain.display();
		this.popMatrix();

		// Car
		this.pushMatrix();
		this.translate(this.car.posX,5.1,this.car.posZ);
		this.rotate(this.car.rotation * degToRad, 0,1,0);
		if (this.crane.drawCar == true)
			this.car.display();
// 			else {
// 				this.car.posX = -2;
// 				this.car.posZ = 3;
// 			}
		this.popMatrix();

		//SkyDome
		this.pushMatrix();
			this.rotate(-Math.PI/2,1,0,0);
			this.translate(0,0,-30);
			this.scale(100,100,100);
			this.skyAppearance.apply();
			this.skyDome.display();
		this.popMatrix();

		this.pushMatrix();
			this.rotate(Math.PI/2,1,0,0);
			this.translate(0,0,-30);
			this.scale(100,100,100);
			this.skyAppearance.apply();
			this.skyDome.display();
		this.popMatrix();

		//Crane
		this.pushMatrix();
			this.crane.display();
		this.popMatrix();

		//Spot no chao para o guindaste apanhar o carro
		this.pushMatrix();
			this.translate(19.5,0.1,-0.5);
			this.scale(7,1,-4);
			this.rotate(Math.PI/2,1,0,0);
			this.departure.apply();
			this.spot.display();
		this.popMatrix();

		//Spot no chao para o guindaste deixar o carro
		this.pushMatrix();
			this.translate(-3,0.1,15);
			this.scale(-4,1,7);
			this.rotate(Math.PI/2,1,0,0);
			this.spot.display();
		this.popMatrix();
	};

	reDrawCar(x, z)
	{
		if(this.car.posX > 22 && this.car.posX < 24 && this.car.posZ > 1 && this.car.posZ < 2){
			this.car.posX = x;
			this.car.posZ = z;
			this.car.rotation = 270;
		}
	};

	update(currTime) {

		let w = false, s = false, d = false, a = false;

		if (this.gui.isKeyPressed("KeyW"))
			w = true;
		else
			w = false;

		if (this.gui.isKeyPressed("KeyS"))
			s = true;
		else
			s = false;
		if (this.gui.isKeyPressed("KeyD"))
		{
			d = true;
		}
		else
			d = false;
		if (this.gui.isKeyPressed("KeyA"))
		{
			a = true;
		}
		else
			a = false;


		this.lastTime = this.lastTime || 0;
		this.deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;

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
		}
		else if(this.crane.drawCar == false) // Quando o carro ja esta preso ao guindaste
		{
			this.crane.update(this.deltaTime);
			this.keepMoving = true;
			this.reDrawCar(-5,17.5);
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
		
		if (this.gui.isKeyPressed("KeyW"))
		{
		
		text+=" W ";
		
		keysPressed=true;
		
		}
		
		if (this.gui.isKeyPressed("KeyS"))
		{
		
		text+=" S ";
		keysPressed=true;
		
		}

		if (this.gui.isKeyPressed("KeyD"))
		{

		text+=" D ";
		keysPressed=true;

		}

		if (this.gui.isKeyPressed("KeyA"))
		{

		text+=" A ";
		keysPressed=true;

		}
		
		if (keysPressed)
		console.log(text);
	}

};