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

	};

	display() 
	{
		this.scene.pushMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-5, -4.4, -0.5);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(-0.6,-0.6,0.6);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.roda.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, -4.4, -0.5);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(-0.6,-0.6,0.6);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.roda.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-5, -4.4, -3);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(-0.6,-0.6,0.6);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.roda.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, -4.4, -3);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(-0.6,-0.6,0.6);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.roda.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(5,1,2);
			this.scene.translate(-0.5,-4,-1);
			this.corpo.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(3,1,2);
			this.scene.translate(-0.8,-3,-1);
			this.corpo.display();
		this.scene.popMatrix();


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
