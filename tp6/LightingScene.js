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
		this.vehicleAppearancesList = ['Red', 'NoText'];

		this.terrainAppearances = [];
		this.currTerrainAppearance = 0;
		this.terrainAppearancesList = ['Dirt', 'Sand'];
		//END GUI textures

		//Axis section
		this.showAxis=true;

		//Lights section
		this.dayTime=true;
		this.light_1=true;
		this.light_2=true;

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
		this.spot = new MyQuad(this,0,0,1,1);

		// Scene elements end

		// Materials
		this.materialDefault = new CGFappearance(this);
		// Materials end

		this.setUpdatePeriod(1000/60);
	};

	initCameras()
	{//estava 35 35 35
		//this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(5, 5, 5), vec3.fromValues(0, 0, 0));
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 50, 50), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);

		//Farol esquerdo
		this.lights[2].setPosition(7.8, 1.5, 4.9);
		this.lights[2].setVisible(true);

		//Farol direito
		this.lights[3].setPosition(7.8, 1.5, 6);
		this.lights[3].setVisible(true);

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 0, 1);

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		//Farol esquerdo
	  	this.lights[2].setAmbient(0.2, 0.2, 0.2, 1.0);
		this.lights[2].setDiffuse(0.8, 0.8, 0.8, 1.0);
		this.lights[2].setSpecular(0.5, 0.5, 0.5, 1);

		//Farol direito
	  	this.lights[3].setAmbient(0.2, 0.2, 0.2, 1.0);
		this.lights[3].setDiffuse(0.8, 0.8, 0.8, 1.0);
		this.lights[3].setSpecular(0.5, 0.5, 0.5, 1);
	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();

		if(this.dayTime == true){
			this.lights[0].enable();
		}else{
			this.lights[0].disable();
		}

		if(this.light_1 == true){
			this.lights[2].enable();
		}else{
			this.lights[2].disable();
		}

		if(this.light_2 == true){
			this.lights[3].enable();
		}else{
			this.lights[3].disable();
		}
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
			this.terrain.display();
		this.popMatrix();

		// Car
		this.pushMatrix();
			this.translate(this.car.posX,5.1,this.car.posZ);
			this.rotate(this.car.rotation * degToRad, 0,1,0);
			this.car.display();
		this.popMatrix();

		//SkyDome
		this.pushMatrix();
			this.rotate(-Math.PI/2,1,0,0);
			//this.scale(100,100,100);
			//this.translate(0,0,5);
			//this.skyDome.display();
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
			this.spot.display();
		this.popMatrix();
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
		this.car.update(this.deltaTime, w, s, d, a);
		this.crane.update(this.deltaTime);
		//this.checkKeys();

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