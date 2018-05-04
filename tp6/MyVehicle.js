var degToRad = Math.PI / 180.0;

class MyVehicle extends CGFobject
{
	constructor(scene, x, y, z) 
	{
		super(scene);

		this.x = x;
		this.y = y;
		this.z = z;

		this.roda = new MyCilinder(scene, 30, 20);
		this.corpo = new MyUnitCubeQuad(scene);
		this.farol = new MyLamp(scene,20,20);
		this.jante = new MyClockImage(scene,20);
		this.tejadilho = new MyTriangPrism(scene);

		//Para já serve enquanto não alteramos muito o carro.
		this.materialDefault = new CGFappearance(this.scene);
		
		this.pneuAppearance = new CGFappearance(this.scene);
		this.pneuAppearance.loadTexture("../resources/images/pneu.png");

	};

	display() 
	{
		this.scene.pushMatrix();
		
		//Roda Esquerda de Tras
		this.scene.pushMatrix();
			this.scene.translate(-5, -4.4, -0.5);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(-0.6,-0.6,0.6);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.pneuAppearance.apply();
			this.roda.display();
		this.scene.popMatrix();

		//Roda Esquerda de Frente
		this.scene.pushMatrix();
			this.scene.translate(0, -4.4, -0.5);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(-0.6,-0.6,0.6);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.pneuAppearance.apply();
			this.roda.display();
		this.scene.popMatrix();

		//Roda Direita de Tras
		this.scene.pushMatrix();
			this.scene.translate(-5, -4.4, -3);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(-0.6,-0.6,0.6);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.pneuAppearance.apply();
			this.roda.display();
		this.scene.popMatrix();

		//Roda Direita de Frente
		this.scene.pushMatrix();
			this.scene.translate(0, -4.4, -3);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(-0.6,-0.6,0.6);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.pneuAppearance.apply();
			this.roda.display();
		this.scene.popMatrix();

		// Corpo
		this.scene.pushMatrix();
			this.scene.scale(5,1,2);
			this.scene.translate(-0.5,-4,-1);
			this.materialDefault.apply();
			this.corpo.display();
		this.scene.popMatrix();
		
		// Corpo
		this.scene.pushMatrix();
			this.scene.scale(2,1,2);
			this.scene.translate(-1.45,-3,-1);
			this.corpo.display();
		this.scene.popMatrix();

		//farol esquerdo
		this.scene.pushMatrix();
			this.scene.rotate(-90*degToRad,1,0,0);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.scene.scale(0.3,0.3,0.3)
			this.scene.translate(-12,5,-1);
			this.farol.display();
		this.scene.popMatrix();

		//farol direito
		this.scene.pushMatrix();
			this.scene.rotate(-90*degToRad,1,0,0);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.scene.scale(0.3,0.3,0.3)
			this.scene.translate(-12,8.5,-1);
			this.farol.display();
		this.scene.popMatrix();


		// Jantes Esquerda da Roda Esquerda da Frente
		this.scene.pushMatrix();
			this.scene.translate(0,-4.4,-0.5);
			this.scene.scale(0.6,0.6,0.6);
			this.jante.display();
		this.scene.popMatrix();

		// Jantes Direita da Roda Esquerda da Frente
		this.scene.pushMatrix();
			this.scene.translate(0,-4.4,-1);
			this.scene.scale(0.6,-0.6,0.6);
			this.jante.display();
		this.scene.popMatrix();

		// Jantes Esquerda da Roda Esquerda da Tras
		this.scene.pushMatrix();
			this.scene.translate(-5,-4.4,-0.5);
			this.scene.scale(0.6,0.6,0.6);
			this.jante.display();
		this.scene.popMatrix();

		// Jantes Direita da Roda Esquerda da Tras
		this.scene.pushMatrix();
			this.scene.translate(-5,-4.4,-1);
			this.scene.scale(0.6,-0.6,0.6);
			this.jante.display();
		this.scene.popMatrix();

		// Jantes Esquerda da Roda Direita da Frente
		this.scene.pushMatrix();
			this.scene.translate(0,-4.4,-3);
			this.scene.scale(0.6,0.6,0.6);
			this.jante.display();
		this.scene.popMatrix();

		// Jantes Direita da Roda Direita da Frente
		this.scene.pushMatrix();
			this.scene.translate(0,-4.4,-3.5);
			this.scene.scale(0.6,-0.6,0.6);
			this.jante.display();
		this.scene.popMatrix();

		// Jantes Esquerda da Roda Direita da Tras
		this.scene.pushMatrix();
			this.scene.translate(-5,-4.4,-3);
			this.scene.scale(0.6,0.6,0.6);
			this.jante.display();
		this.scene.popMatrix();

		// Jantes Direita da Roda Direita da Tras
		this.scene.pushMatrix();
			this.scene.translate(-5,-4.4,-3.5);
			this.scene.scale(0.6,-0.6,0.6);
			this.jante.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.tejadilho.display();
		this.scene.popMatrix();

	};

// 	update(currTime ) {
// 		if(this.x>=0.4 && this.flag == false){
// 			this.x -= 0.2;
// 			this.y += 0.05;
// 			this.lastUpdate = currTime;
// 		}
// 		else{ 
// 			this.flag = true;
// 			if(this.y>=0.45){
// 				this.isFlyingVertical = true;
// 				this.y -= 0.2;
// 				this.rotZ -= (10);
// 				this.rotX -= (10);
				
// 				}
// 			else {
// 				this.isFlyingVertical = false;
// 			}
// 		}
//  };
};
