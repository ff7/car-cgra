var degToRad = Math.PI / 180.0;

class MyVehicle extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.posX = 10;//7;
		this.posY = 0;
		this.posZ = 10;//3;

		this.acceleration = 0;
		
		this.rotation = 0;
		this.rotZ = 0;
		this.rotY = 0;

		this.corpo = new MyUnitCubeQuad(scene);
		this.farol = new MyLamp(scene,20,20);
		this.tejadilho = new MyRoof(scene);
		this.wheel = new MyWheel(scene, 0,0,0);

		//Para já serve enquanto não alteramos muito o carro.
		this.materialDefault = new CGFappearance(this.scene);

		this.lightAppearance = new CGFappearance(this.scene);
		this.lightAppearance.loadTexture("../resources/images/light.png");

		this.glass = new CGFappearance(this.scene);
		this.glass.setAmbient(1,1,1,1);
		this.glass.setDiffuse(1,1,1,1);
		this.glass.setSpecular(1,1,1,1);
		this.glass.setShininess(0);
		this.glass.loadTexture("../resources/images/glass.jpg");

		this.brokenGlass = new CGFappearance(this.scene);
		this.brokenGlass.setAmbient(1,1,1,1);
		this.brokenGlass.setDiffuse(1,1,1,1);
		this.brokenGlass.setSpecular(1,1,1,1);
		this.brokenGlass.setShininess(0);
		this.brokenGlass.loadTexture("../resources/images/brokeGlass.jpg");

	};

	display() 
	{
		this.scene.pushMatrix();
		
		// Tejadilho
		this.scene.pushMatrix();
			this.scene.scale(1,1,1.5);
			this.scene.translate(-3,-3,-1.85);
		if(this.scene.currVehicleAppearance == 'Camo' || this.scene.currVehicleAppearance == 0){
			this.glass.apply();
		}
		if(this.scene.currVehicleAppearance == 'Flames'){
			this.glass.apply();
		}
		if(this.scene.currVehicleAppearance == 'Rusty'){
			this.brokenGlass.apply();
		}
		if(this.scene.currVehicleAppearance == 'Murica'){
			this.glass.apply();
		}
			this.tejadilho.display();
		this.scene.popMatrix();

		// Corpo
		this.scene.pushMatrix();
			this.scene.scale(5,1,2);
			this.scene.translate(-0.5,-4,-1);
			this.corpo.display();
		this.scene.popMatrix();
		

		//farol esquerdo
		this.scene.pushMatrix();
			this.scene.rotate(-90*degToRad,1,0,0);
			this.scene.rotate(90*degToRad,0,1,0);
			this.scene.scale(0.3,0.3,0.3)
			this.scene.translate(13,5.4,0);
			this.lightAppearance.apply();
			this.farol.display();
		this.scene.popMatrix();

		//farol direito
		this.scene.pushMatrix();
			this.scene.rotate(-90*degToRad,1,0,0);
			this.scene.rotate(90*degToRad,0,1,0);
			this.scene.scale(0.3,0.3,0.3)
			this.scene.translate(13,8.5,0);
			this.lightAppearance.apply();
			this.farol.display();
		this.scene.popMatrix();

		// Roda Esquerda de Tras
		this.scene.pushMatrix();
			this.scene.translate(-5,-4.4,6.8 -8);
			this.scene.scale(0.6,0.6,0.6);
			this.scene.rotate(-this.rotZ*Math.PI/2,0,0,1);
			this.wheel.display();
		this.scene.popMatrix();

		// Roda Direita de Tras
		this.scene.pushMatrix();
			this.scene.translate(-5,-4.4,6.8-2.5 - 7.8);
			this.scene.scale(0.6,0.6,0.6);
			this.scene.rotate(-this.rotZ*Math.PI/2,0,0,1);
			this.wheel.display();
		this.scene.popMatrix();

		// Roda Esquerda de Frente
		this.scene.pushMatrix();
			this.scene.translate(0,-4.4,6.8 -8);
			this.scene.scale(0.6,0.6,0.6);
			this.scene.rotate(this.rotY*Math.PI/2, 0,1, 0);
			this.scene.rotate(-this.rotZ*Math.PI/2,0,0,1);
			this.wheel.display();
		this.scene.popMatrix();

		// Roda Direita de Frente
		this.scene.pushMatrix();
			this.scene.translate(0,-4.4,6.8-2.5 - 7.8);
			this.scene.scale(0.6,0.6,0.6);
			this.scene.rotate(this.rotY*Math.PI/2, 0,1, 0);
			this.scene.rotate(-this.rotZ*Math.PI/2,0,0,1);
			//this.scene.translate(5,0,-2.5);			
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.popMatrix();

	};

	update(currTime, w, s, d, a) {
		if (w == true)
		{
			this.posX += Math.cos(this.rotation * degToRad) * this.scene.speed*currTime*1/50;
			this.posZ -= Math.sin(this.rotation * degToRad) * this.scene.speed*currTime*1/50;
			this.rotZ += 0.3;	

			if (a == true)
			{
				if (this.rotY < 0.2)
					this.rotY += currTime * 3/1000;
				this.rotation += this.scene.speed * currTime * 1/10;
			
			}

			if (d == true)
			{	
				if (this.rotY > -0.2)
					this.rotY -= currTime * 3/1000;
				this.rotation -= this.scene.speed * currTime * 1/10;
			
			}
		}

		if (s == true)
		{
			this.rotZ -= 0.3;
			this.posX -= Math.cos(this.rotation * degToRad) * this.scene.speed*currTime*1/50;
			this.posZ += Math.sin(this.rotation * degToRad) * this.scene.speed*currTime*1/50;
			
			if (a == true)
			{
				if (this.rotY < 0.2)
					this.rotY += currTime * 3/1000;
				this.rotation -= this.scene.speed * currTime * 1/10;
			}

			if (d == true)
			{	
				if (this.rotY > -0.2)
					this.rotY -= currTime * 3/1000;
				this.rotation += this.scene.speed * currTime * 1/10;
			}
		}
 };
};
