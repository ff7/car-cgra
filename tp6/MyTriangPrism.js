var degToRad = Math.PI / 180.0;

class MyTriangPrism extends CGFobject
{
	constructor(scene, x, y, z) 
	{
		super(scene);

		this.prism = new MyPrism(scene,3,1);
		this.triangle = new MyPolygonConstructor(scene,3);


		//Para já serve enquanto não alteramos muito o carro.
		this.materialDefault = new CGFappearance(this.scene);
		
		this.pneuAppearance = new CGFappearance(this.scene);
		this.pneuAppearance.loadTexture("../resources/images/pneu.png");

	};

	display() 
	{
		this.scene.pushMatrix();

		// Prism Da Frente
			this.scene.pushMatrix();
			this.scene.scale(0.5,1.18,2);
			this.scene.translate(-3.3,-2.98,-1.5);
			this.prism.display();
		this.scene.popMatrix();

		// Prisma De Tras
		this.scene.pushMatrix();
			this.scene.scale(-0.5,1.18,-2);
			this.scene.translate(8.3,-2.98,0.5);
			this.prism.display();
		this.scene.popMatrix();

		// Triangulo

		this.scene.pushMatrix();
			this.scene.scale(0.5,1.18,0.5)
			this.scene.translate(-3.3,-2.98,-2);
			this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0,0,1);
			this.scene.scale(0.5,1.18,0.5)
			this.scene.translate(8.3,2.98,-2);
			this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0,1,0);
			this.scene.scale(0.5,1.18,0.5)
			this.scene.translate(8.3,-2.98,6);
			this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 1,0,0);
			this.scene.scale(0.5,1.18,0.5)
			this.scene.translate(-3.3,2.98,6);
			this.triangle.display();
		this.scene.popMatrix();

	};
};
