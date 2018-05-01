/**
MyTerrain Constructor
*/

class MyTerrain extends Plane
{
	constructor(scene)
	{
		super(scene);

		this.terrain = new Plane(this.scene,0,5,0,5,50);

		this.terrainAppearance = new CGFappearance(this.scene);
		this.terrainAppearance.setTextureWrap("REPEAT","REPEAT");
		this.terrainAppearance.loadTexture("../resources/images/terrain.png");
		
	};

	display()
	{
		this.scene.pushMatrix();
			this.scene.translate(7.5, 0, 7.5);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.scene.scale(50, 50, 0.2);
			this.terrainAppearance.apply();
			this.terrain.display();
		this.scene.popMatrix();
	}
};