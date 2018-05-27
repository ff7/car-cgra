 
class MyInterface extends CGFinterface {

	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}
	
	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		//  http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();

		// add a button:
		// the first parameter is the object that is being controlled (in this case the scene)
		// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
		// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

		this.gui.add(this.scene, 'doSomething');	

		// add a group of controls (and open/expand by defult)

		var group=this.gui.addFolder("Axis");
		group.add(this.scene, 'showAxis');

		var group=this.gui.addFolder("Polyhedrons");
		group.add(this.scene, 'showPolyhedrons');

		//GRUPO DE LUZES
		var groupLights=this.gui.addFolder("Lights");

		//Options for all the lights in the scene
		groupLights.add(this.scene, 'light_0');
		groupLights.add(this.scene, 'light_1');
		groupLights.add(this.scene, 'light_2');
		groupLights.add(this.scene, 'light_3');

		//GRUPO DE TEXTURAS
		var groupTexture=this.gui.addFolder("Texture");

		groupTexture.add(this.scene, 'currVehicleAppearance', this.scene.vehicleAppearancesList);
		groupTexture.add(this.scene, 'currTerrainAppearance', this.scene.terrainAppearancesList);
	
		this.gui.add(this.scene, 'speed', 0, 5);

		this.initKeys();
		
		return true;
	};

	/**
	 * processKeyboard
	 * @param event {Event}
	 */
// 	processKeyboard(event) {
// 		// call CGFinterface default code (omit if you want to override)
// 		super.processKeyboard(event);

// 		// Check key codes e.g. here: http://www.asciitable.com/
// 		// or use String.fromCharCode(event.keyCode) to compare chars

// 		// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
// 		switch (event.keyCode)
// 		{
// 			case (65):	// only works for capital 'A', as it is
// 				console.log("Key 'A' pressed");
// 		};
// 	};

	initKeys() {
		this.scene.gui=this;
		this.processKeyboard=function(){};
		this.activeKeys={};
	}
	processKeyDown(event) {
		this.activeKeys[event.code]=true;
	};
	processKeyUp(event) {
		this.activeKeys[event.code]=false;
	};
	processKeyLeft(event) {
		this.activeKeys[event.code]=false;
	};
	processKeyRight(event) {
		this.activeKeys[event.code]=false;
	}
	
	isKeyPressed(keyCode) {
		return this.activeKeys[keyCode] || false;
	}
};