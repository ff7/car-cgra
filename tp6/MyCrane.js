var degToRad = Math.PI / 180.0;

class MyCrane extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cylinder = new MyCraneCilinder(scene,0,0,0);
		this.cube = new MyUnitCubeQuad(scene);

		this.down = true;
		this.up = false;
		this.side = false;

		this.rotBase = 0;
		this.rotArticulacao = 0;

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
			this.scene.rotate(-1* this.rotArticulacao ,0,0,1);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.scale(0.5,0.5,12);
			this.cylinder.display();
		this.scene.popMatrix();

		//Fio do íman
		this.scene.pushMatrix();
		this.scene.rotate(this.rotBase * Math.PI/2,0,1,0);
			//this.scene.translate(8,14,0);
		 	this.scene.translate(8+11.5*Math.cos(this.rotArticulacao),14-11.5*Math.sin(this.rotArticulacao), 0);
		 	this.scene.scale(0.1,5,0.1);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.cylinder.display();
		this.scene.popMatrix();

		//Iman
		this.scene.pushMatrix();
		this.scene.rotate(this.rotBase * Math.PI/2,0,1,0);
			//this.scene.translate(8,9.75,0);
			this.scene.translate(8+11.5*Math.cos(this.rotArticulacao),9.75-11.5*Math.sin(this.rotArticulacao), 0);
			this.scene.scale(2,0.8,2);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(12.5,14,-1);
			//this.cube.display();
		this.scene.popMatrix();

 	};

	update(currTime)
	{
 		if (this.down == true)
 		{
 			this.rotArticulacao += 0.01;
 			if (this.rotArticulacao > 0.58)
 			{
 				this.down = false;
 				this.up = true;
 			}
 		}
 		else if (this.up == true)
		{
			this.rotArticulacao -= 0.01;
			 if (this.rotArticulacao < 0.01)
 			{
 				this.up = false;
 				this.side = true;
 			}
		}
		else if (this.side == true)
		{
			this.rotBase += 0.01;
			if (this.rotBase > 2.7)
				this.side = false;
		}
		
	};

};
