class MyVehicle extends CGFobject
{
	constructor(scene, x, y, z) 
	{
		super(scene);

		this.x = x;
		this.y = y;
		this.z = z;

		this.rotZ = -10;
		this.rotX = 0;
		this.flag = false;

		this.isFlyingVertical = false;

		this.rectangle =  new MyPolygonConstructor(this.scene, 4);
		this.rectangle2 = new MyPolygonConstructor(this.scene, 4);
		this.triangle = new MyPolygonConstructor(this.scene, 3);
		this.triangle2 = new MyPolygonConstructor(this.scene, 3);
	};

	display() 
	{
		this.scene.pushMatrix();
		this.scene.translate(0,-1.2,0);
        this.scene.pushMatrix();
        	this.scene.scale(1.2,0.3,0.5);
        	this.scene.translate(-0.5,2.2,0);
			this.scene.rotate(-Math.PI/4, 0, 0, 1);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.scene.translate(0, 1, 0);
			this.scene.scale(0.5,0.5,0.5);
			this.rectangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		  	this.scene.scale(1.2,0.3,0.5);
        	this.scene.translate(-0.4,2.2,0);
			this.scene.rotate(-Math.PI/4, 0, 0, 1);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.scene.translate(0, 1, 0);
			this.scene.scale(0.5,-0.5,0.5);
			this.rectangle2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.5, 1, 0);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(-1,1,1);
			this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.5, 1, 0);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.scale(-1,-1,1);
			this.triangle.display();
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
