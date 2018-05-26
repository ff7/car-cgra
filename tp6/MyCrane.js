var degToRad = Math.PI / 180.0;

class MyCrane extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cylinder = new MyCraneCilinder(scene);
		this.cube = new MyUnitCubeQuad(scene);
		this.car = new MyVehicle(scene);

		this.down = true;
		this.up = false;
		this.left = false;
		this.right = false;

		this.drop = true;
		this.isMoving = true;
		this.drawCar = true;

		this.rotBase = 0;
		this.rotArticulacao = 0;
	};

	display() 
	{
		//Base
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,1,0,0);
			this.scene.scale(2,2,0.8);
			this.scene.translate(0,0,-1);
			this.cylinder.display();
		this.scene.popMatrix();

		//Corpo 1
		this.scene.pushMatrix();
			this.scene.rotate(this.rotBase * Math.PI/2,0,1,0);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.rotate(-Math.PI/3,1,0,0);
			this.scene.scale(0.5,0.5,15);
			this.scene.translate(0,0,0.02);
			this.cylinder.display();
		this.scene.popMatrix();

		//Roda
		this.scene.pushMatrix();
			this.scene.rotate(this.rotBase * Math.PI/2,0,1,0);
			this.scene.translate(8,14,-0.5);
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
		 	this.scene.translate(8+11.5*Math.cos(this.rotArticulacao),14-11.5*Math.sin(this.rotArticulacao), 0);
		 	this.scene.scale(0.1,5,0.1);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.cylinder.display();
		this.scene.popMatrix();

		//Iman
		this.scene.pushMatrix();
			this.scene.rotate(this.rotBase * Math.PI/2,0,1,0);
			this.scene.translate(8+11.5*Math.cos(this.rotArticulacao),9.75-11.5*Math.sin(this.rotArticulacao), 0);
			this.scene.scale(2,0.8,2);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.cylinder.display();
		this.scene.popMatrix();

		// Carro Auxiliar
		this.scene.pushMatrix();
			this.scene.rotate(this.rotBase * Math.PI/2,0,1,0);
			this.scene.translate(11+11.5*Math.cos(this.rotArticulacao),11.5-11.5*Math.sin(this.rotArticulacao), 2);
			if (this.drawCar == false)
				this.car.display();
		this.scene.popMatrix();
 	};

 	resetFlags(){

 		this.down = true;
		this.up = false;
		this.left = false;
		this.right = false;

		this.drop = true;
		this.isMoving = true;
		this.drawCar = true;
 	
 	};

	update(move)
	{
 		if (this.down == true)
 		{
 			this.rotArticulacao += 0.01;
 			if (this.rotArticulacao > 0.58)
 			{
 				 if (this.rotBase < 1)
 					this.drawCar = false;
 				else{
 					this.drawCar = true;
 					this.drop = false;
 				}
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
 				if (this.rotBase < 1)
 					this.left = true;
 				else
 				{
 					this.right = true;
 					this.drawCar = true;
 				}

 			}
		}
		else if (this.left == true)
		{
			this.rotBase += 0.01;
			if (this.rotBase > 2.9)
			{
				this.left = false;
				this.down = true;
			}
		}
		else if (this.right == true)
		{
			this.rotBase -= 0.01;
			if (this.rotBase < 0.01)
			{
				this.right = false;
				this.isMoving = false;
			}
		}		
	};
};
