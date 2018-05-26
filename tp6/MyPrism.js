
class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	};

	initBuffers() 
	{

		let angulo = (2*Math.PI)/this.slices;
		let ang = 0;
		
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		
		let v = 0;
		let stackSize = 1/this.stacks;

		for (let j = 0; j < this.stacks; j+=stackSize)
		{
			for (let i = 0; i < this.slices; i++)
			{
				this.vertices.push(Math.cos(ang), Math.sin(ang),j);
				this.vertices.push(Math.cos(ang), Math.sin(ang),j+stackSize);

				ang += angulo/2;

				let normX = Math.cos(ang);
				let normY = Math.sin(ang);

				ang += angulo/2;

				this.vertices.push(Math.cos(ang), Math.sin(ang),j);
				this.vertices.push(Math.cos(ang), Math.sin(ang),j + stackSize);

				this.normals.push(normX, normY, 0);
				this.normals.push(normX, normY, 0);
				this.normals.push(normX, normY, 0);
				this.normals.push(normX, normY, 0);

				this.indices.push(v+1,v+2,v+3);
				this.indices.push(v,v+2,v+1);

				v+=4;
			}

		}


		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	};
};
