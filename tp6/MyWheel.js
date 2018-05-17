var degToRad = Math.PI / 180.0;

class MyWheel extends CGFobject
{
	constructor(scene, x, y, z) 
	{
		super(scene);

		this.x = x;
		this.y = y;
		this.z = z;

		this.rotZ = 1;
		this.rotY = 0;

		this.roda = new MyCilinder(scene, 30, 20);
		this.jante = new MyClockImage(scene,20);


		//Para já serve enquanto não alteramos muito o carro.
		this.materialDefault = new CGFappearance(this.scene);
		
		this.pneuAppearance = new CGFappearance(this.scene);
		this.pneuAppearance.loadTexture("../resources/images/pneu.png");

		this.janteAppearance = new CGFappearance(this.scene);
		this.janteAppearance.loadTexture("../resources/images/jante.png");

	};

	display() 
	{
		
		//Roda Esquerda de Tras
		this.scene.pushMatrix();
 			this.pneuAppearance.apply();
			this.roda.display();
		this.scene.popMatrix();

		// Jantes Esquerda da Roda Esquerda da Tras
		this.scene.pushMatrix();
			this.scene.translate(0,0,1);
			this.janteAppearance.apply();
			this.jante.display();
		this.scene.popMatrix();

		// Jantes Direita da Roda Esquerda da Tras
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0,1,0);
			this.janteAppearance.apply();
			this.jante.display();
		this.scene.popMatrix();


	};

		update(currTime, w, s, d, a) {
		if (w == true)
		{
			this.x += 0.1;
			this.rotZ += 0.1;	
		}

		if (s == true)
		{
			this.x -= 0.1;
			this.rotZ -= 0.1;
		}
 };


};
