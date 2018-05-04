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

		// Prism Esquerdo
			this.scene.pushMatrix();
			this.scene.scale(0.5,1.3,2);
			this.scene.translate(-3.3,-2.8,-1.5);
			this.prism.display();
		this.scene.popMatrix();

		// Prisma Direito
		this.scene.pushMatrix();
			this.scene.scale(-0.5,1.3,-2);
			this.scene.translate(8.3,-2.8,0.5);
			this.prism.display();
		this.scene.popMatrix();

		// Triangulo

		this.scene.pushMatrix();
			this.scene.scale(0.5,1.3,0.5)
			this.scene.translate(6.5,-2.7,0);
			//this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.5,1.3,0.5);
			this.scene.rotate(Math.PI,0,0,1);
			this.scene.translate(-1.5,2.7,0);
			//this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(-0.5,1.3,0.5)
			this.scene.translate(-1.5,-2.7,-10);
			//this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(-0.5,1.3,0.5);
			this.scene.rotate(Math.PI,0,0,1);
			this.scene.translate(6.5,2.7,-10);
			//this.triangle.display();
		this.scene.popMatrix();

	};
};
