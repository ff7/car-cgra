var degToRad = Math.PI / 180.0;

class MyCraneCilinder extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.roda = new MyCilinder(scene, 30, 20);
		this.jante = new MyClockImage(scene,20);
		
		this.bodyAppearance = new CGFappearance(this.scene);
		this.bodyAppearance.loadTexture("../resources/images/darkRed.png");
	};

	display() 
	{
		
		this.scene.pushMatrix();
 			this.bodyAppearance.apply();
			this.roda.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 0, 1);
			this.bodyAppearance.apply();
			this.jante.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.bodyAppearance.apply();
			this.jante.display();
		this.scene.popMatrix();

	};

};
