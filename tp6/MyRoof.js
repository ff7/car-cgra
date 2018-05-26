class MyRoof extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.trapeze = new MyTrapezoid(this.scene);
		this.quad = new MyQuad(this.scene);

		this.initBuffers();
	}

	display()
	{
		//Laterais
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.trapeze.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 0, 1);
			this.trapeze.display();
		this.scene.popMatrix();

		//Topo
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.scene.translate(0, -0.5, 0.5);
			this.scene.scale(2, 1, 1);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.translate(-0.5, 0, 1.25);
			this.scene.rotate(-Math.PI/6.7, 1, 0, 0);
			this.scene.scale(1, 1.12, 1);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.scene.translate(0.5, 0, 1.25);
			this.scene.rotate(-Math.PI/6.7, 1, 0, 0);
			this.scene.scale(1, 1.12, 1);
			this.quad.display();
		this.scene.popMatrix();

		//Face de baixo
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 1, 0, 0);
			this.scene.translate(0, 0.5, 0.5);
			this.scene.scale(3, 1, 1);
			this.quad.display();
		this.scene.popMatrix();
	}

};