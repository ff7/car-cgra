/**
 * MyUnitCubeQuad
 * @constructor
 */
class MyUnitCubeQuad extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		//Textura camo
		this.camoAppearance = new CGFappearance(this.scene);
		this.camoAppearance.setAmbient(1,1,1,1);
		this.camoAppearance.setDiffuse(1,1,1,1);
		this.camoAppearance.setSpecular(1,1,1,1);
		this.camoAppearance.setShininess(0);
		this.camoAppearance.loadTexture("../resources/images/camo.png");
		//End textura camo

		//Textura Flame
		this.flameAppearance = new CGFappearance(this.scene);
		this.flameAppearance.setAmbient(1,1,1,1);
		this.flameAppearance.setDiffuse(1,1,1,1);
		this.flameAppearance.setSpecular(1,1,1,1);
		this.flameAppearance.setShininess(0);
		this.flameAppearance.loadTexture("../resources/images/flames.png");

		this.flameAppearance2 = new CGFappearance(this.scene);
		this.flameAppearance2.loadTexture("../resources/images/black.png");
		//End textura flame

		//Textura Rusty
		this.rustyAppearance = new CGFappearance(this.scene);
		this.rustyAppearance.setAmbient(1,1,1,1);
		this.rustyAppearance.setDiffuse(1,1,1,1);
		this.rustyAppearance.setSpecular(1,1,1,1);
		this.rustyAppearance.setShininess(0);
		this.rustyAppearance.loadTexture("../resources/images/rustyBody.jpg");
		//End textura rusty

		//Textura Murica
		//1
		this.muricaAppearance = new CGFappearance(this.scene);
		this.muricaAppearance.setAmbient(1,1,1,1);
		this.muricaAppearance.setDiffuse(1,1,1,1);
		this.muricaAppearance.setSpecular(1,1,1,1);
		this.muricaAppearance.setShininess(0);
		this.muricaAppearance.loadTexture("../resources/images/muricaBody.png");

		//2
		this.muricaAppearance2 = new CGFappearance(this.scene);
		this.muricaAppearance2.setAmbient(1,1,1,1);
		this.muricaAppearance2.setDiffuse(1,1,1,1);
		this.muricaAppearance2.setSpecular(1,1,1,1);
		this.muricaAppearance2.setShininess(0);
		this.muricaAppearance2.loadTexture("../resources/images/muricaFlag.png");
		//End textura Murica

		this.quad = new MyQuad(this.scene);
	};

	display() 
	{
		// front face
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		if(this.scene.currVehicleAppearance == 'Camo' || this.scene.currVehicleAppearance == 0) this.camoAppearance.apply();
		
		if(this.scene.currVehicleAppearance == 'Flames') this.flameAppearance.apply();

		if(this.scene.currVehicleAppearance == 'Rusty') this.rustyAppearance.apply();
		
		if(this.scene.currVehicleAppearance == 'Murica') this.muricaAppearance.apply();
		
		this.quad.display();

		this.scene.popMatrix();

		// back face
		this.scene.pushMatrix();
			this.scene.rotate(180 * degToRad, 0, 1, 0);
			this.scene.translate(0, 0, 0.5);
			
			if(this.scene.currVehicleAppearance == 'Camo' || this.scene.currVehicleAppearance == 0) this.camoAppearance.apply();

			if(this.scene.currVehicleAppearance == 'Flames') this.flameAppearance.apply();
		
			if(this.scene.currVehicleAppearance == 'Rusty') this.rustyAppearance.apply();
		
			if(this.scene.currVehicleAppearance == 'Murica') this.muricaAppearance.apply();
		
			this.quad.display();
		this.scene.popMatrix();

		// top face
		this.scene.pushMatrix();
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.scene.translate(0, 0, 0.5);

			if(this.scene.currVehicleAppearance == 'Camo' || this.scene.currVehicleAppearance == 0) this.camoAppearance.apply();
		
			if(this.scene.currVehicleAppearance == 'Flames') this.flameAppearance2.apply();
		
			if(this.scene.currVehicleAppearance == 'Rusty') this.rustyAppearance.apply();
			
			if(this.scene.currVehicleAppearance == 'Murica') this.muricaAppearance2.apply();
		
			this.quad.display();
		this.scene.popMatrix();

		// back face
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.scene.translate(0, 0, 0.5);
			this.flameAppearance2.apply();
			this.quad.display();
		this.scene.popMatrix();

		// right face
		this.scene.pushMatrix();
			this.scene.rotate(-90 * degToRad, 0, 1, 0);
			this.scene.translate(0, 0, 0.5);

			if(this.scene.currVehicleAppearance == 'Camo' || this.scene.currVehicleAppearance == 0) this.camoAppearance.apply();
	
			if(this.scene.currVehicleAppearance == 'Flames') this.flameAppearance.apply();
		
			if(this.scene.currVehicleAppearance == 'Rusty') this.rustyAppearance.apply();
		
			if(this.scene.currVehicleAppearance == 'Murica') this.muricaAppearance.apply();
			
			this.quad.display();
		this.scene.popMatrix();

		// left face
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 0, 1, 0);
			this.scene.translate(0, 0, 0.5);
		
			if(this.scene.currVehicleAppearance == 'Camo' || this.scene.currVehicleAppearance == 0) this.camoAppearance.apply();
		
			if(this.scene.currVehicleAppearance == 'Flames') this.flameAppearance.apply();
		
			if(this.scene.currVehicleAppearance == 'Rusty') this.rustyAppearance.apply();
		
			if(this.scene.currVehicleAppearance == 'Murica') this.muricaAppearance2.apply();
		
			this.quad.display();
		this.scene.popMatrix();
	};
};
