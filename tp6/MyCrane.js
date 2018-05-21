var degToRad = Math.PI / 180.0;

class MyCrane extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cylinder = new MyCraneCilinder(scene,0,0,0);

		this.rotBase = 1;
		this.rotArticulacao = 1;

		this.bodyAppearance = new CGFappearance(this.scene);
		this.bodyAppearance.loadTexture("../resources/images/darkRed.png");
	};

	display() 
	{
		//Base
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,1,0,0);
			this.scene.scale(2,2,0.8);
			this.scene.translate(0,0,-1);
			//this.bodyAppearance.apply();
			this.cylinder.display();
		this.scene.popMatrix();

		//Corpo 1
		this.scene.pushMatrix();
			this.scene.rotate(this.rotBase * Math.PI/2,0,1,0);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.rotate(-Math.PI/3,1,0,0);
			this.scene.scale(0.5,0.5,15);
			this.scene.translate(0,0,0.02);
			//this.bodyAppearance.apply();
			this.cylinder.display();
		this.scene.popMatrix();

		//Roda
		this.scene.pushMatrix();
			this.scene.rotate(this.rotBase * Math.PI/2,0,1,0);
			this.scene.translate(8,14,-0.5);
			//this.scene.rotate(this.rotArticulacao * Math.PI/2,0,0,1);
			this.cylinder.display();
		this.scene.popMatrix();

		//Corpo 2
		this.scene.pushMatrix();
 			this.scene.rotate(this.rotBase * Math.PI/2,0,1,0);
			this.scene.translate(8,14,0);
			this.scene.rotate(-1* this.rotArticulacao * Math.PI/2,0,0,1);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.scale(0.5,0.5,12);
			//this.scene.translate(0,28,0.65);
			this.cylinder.display();
		this.scene.popMatrix();

		//Fio do íman
		this.scene.pushMatrix();
		this.scene.rotate(this.rotBase * Math.PI/2,0,1,0);
			//this.scene.translate(-Math.cos(this.rotArticulacao), -Math.sin(this.rotArticulacao), 0);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.scene.scale(0.1,0.1,5);
			this.scene.translate(195,0,-2.8);
			this.cylinder.display();
		this.scene.popMatrix();

		//Iman
		this.scene.pushMatrix();
		this.scene.rotate(this.rotBase * Math.PI/2,0,1,0);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.scene.scale(2,2,0.8);
			this.scene.translate(9.75,0,-12);
			this.cylinder.display();
		this.scene.popMatrix();

	};

	update(currTime)
	{
		this.rotBase = 0;
		this.rotArticulacao = 0.5;
		//this.rotBase +=0.1;
		//this.rotArticulacao += 0.1;

		
	};

};
