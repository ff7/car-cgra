/**
 * MyTable
 * @constructor
 */
 class MyTable extends CGFobject
 {
	constructor(scene) 
	{
		super(scene);

		this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);
		
		this.tableAppearance = new CGFappearance(this.scene);

		this.tableAppearance.setAmbient(0.4,0.2,0,1);
		this.tableAppearance.setDiffuse(0.4,0.2,0,1);
		this.tableAppearance.setSpecular(0.1,0.1,0.1,1);
		this.tableAppearance.setShininess(120);

		this.tableAppearance.loadTexture("../resources/images/table.png");
	};

	display() 
	{

		// legs
		this.scene.pushMatrix();
		this.scene.translate(2, 3.5 / 2, 1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.tableAppearance.apply();
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2, 3.5 / 2, -1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2, 3.5 / 2, 1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2, 3.5 / 2, -1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		// table top
		this.scene.pushMatrix();
		this.scene.translate(0, 3.5, 0);
		this.scene.scale(5, 0.3, 3);
		this.tableAppearance.apply();
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();
	};
 };

