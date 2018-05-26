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
		
		//Textura Flame
		this.pneuAppearance = new CGFappearance(this.scene);
		this.pneuAppearance.setAmbient(1,1,1,1);
		this.pneuAppearance.setDiffuse(1,1,1,1);
		this.pneuAppearance.setSpecular(1,1,1,1);
		this.pneuAppearance.setShininess(0);
		this.pneuAppearance.loadTexture("../resources/images/pneu.png");


		this.janteAppearance = new CGFappearance(this.scene);
		this.janteAppearance.setAmbient(1,1,1,1);
		this.janteAppearance.setDiffuse(1,1,1,1);
		this.janteAppearance.setSpecular(1,1,1,1);
		this.janteAppearance.setShininess(0);
		this.janteAppearance.loadTexture("../resources/images/jante.png");
		//End textura flame

		//Textura Rusty
		this.janteRusty = new CGFappearance(this.scene);
		this.janteRusty.setAmbient(1,1,1,1);
		this.janteRusty.setDiffuse(1,1,1,1);
		this.janteRusty.setSpecular(1,1,1,1);
		this.janteRusty.setShininess(0);
		this.janteRusty.loadTexture("../resources/images/rustyWheel.png");
		//End textura rusty

		//Textura Murica
		this.janteMurica = new CGFappearance(this.scene);
		this.janteMurica.setAmbient(1,1,1,1);
		this.janteMurica.setDiffuse(1,1,1,1);
		this.janteMurica.setSpecular(1,1,1,1);
		this.janteMurica.setShininess(0);
		this.janteMurica.loadTexture("../resources/images/muricaWheel.png");
		//End textura Murica

	};

	display() 
	{

		this.scene.pushMatrix();
 			this.pneuAppearance.apply();
			this.roda.display();
		this.scene.popMatrix();

		// Jantes Esquerda
		this.scene.pushMatrix();
			this.scene.translate(0,0,1);
			
			if(this.scene.currVehicleAppearance == 'Camo' || this.scene.currVehicleAppearance == 0) this.janteAppearance.apply();
			
			if(this.scene.currVehicleAppearance == 'Flames') this.janteAppearance.apply();
			
			if(this.scene.currVehicleAppearance == 'Rusty')	this.janteRusty.apply();
			
			if(this.scene.currVehicleAppearance == 'Murica') this.janteMurica.apply();

			this.jante.display();
		this.scene.popMatrix();

		// Jantes Direita
		this.scene.pushMatrix();
			
			this.scene.rotate(Math.PI, 0,1,0);
			
			if(this.scene.currVehicleAppearance == 'Camo' || this.scene.currVehicleAppearance == 0) this.janteAppearance.apply();
			
			if(this.scene.currVehicleAppearance == 'Flames') this.janteAppearance.apply();
			
			if(this.scene.currVehicleAppearance == 'Rusty')	this.janteRusty.apply();
			
			if(this.scene.currVehicleAppearance == 'Murica') this.janteMurica.apply();

			this.jante.display();
		this.scene.popMatrix();


	};

		update(currTime, w, s) {
		if (w)
		{
			this.x += 0.1;
			this.rotZ += 0.1;	
		}

		if (s)
		{
			this.x -= 0.1;
			this.rotZ -= 0.1;
		}
 };


};
