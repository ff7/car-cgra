var degToRad = Math.PI / 180.0;

class MyCrane extends CGFobject
{
	constructor(scene, x, y, z) 
	{
		super(scene);
		this.cylinder = new MyWheel(scene,0,0,0);
		this.prism = new MyPrism(scene,4,1);
	};

	display() 
	{
		this.scene.pushMatrix();
			this.prism.display();
			this.cylinder.display();
		// 
		this.scene.popMatrix();

	};

	update(currTime, w, s, d, a) {

 };
};
