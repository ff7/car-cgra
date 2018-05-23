/**
 * MyLamp
 * @constructor
 */
class MyLamp extends CGFobject
{
	constructor(scene,slices,stacks) 
	{
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	};
 
	initBuffers() 
	{	
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		//this.texCoords = [];
		var i,j;

		var ang1 = 2*Math.PI/this.slices;
		let ang_slices = 0;
		var ang2 = Math.PI/this.stacks;
		let ang_stacks = 0; 
		var x1,y1,z1;
		var nX, nY, nZ;

		for(j = 0; j < this.stacks ; j++){

			for(i = 0; i < this.slices; i++){
					
					x1 = Math.cos(ang_stacks) * Math.cos(ang_slices);
					y1 = Math.cos(ang_stacks) * Math.sin(ang_slices);
					z1 = Math.sin(ang_stacks);

					nX = Math.cos(ang_stacks) * Math.cos(ang_slices);
					nY = Math.cos(ang_stacks) * Math.sin(ang_slices);
					nZ = Math.sin(ang_stacks);

					this.vertices.push(x1,y1,z1);
					this.normals.push(nX,nY,nZ);
					//this.texCoords.push(i * 1/this.slices, j * 1/this.stacks);

					if(j == this.stacks-1){
						this.indices.push(i%this.slices + j*this.slices);
						this.indices.push((i+1)%this.slices + j*this.slices);
						this.indices.push(this.stacks * this.slices);
					}else{
						this.indices.push(i % this.slices + j*this.slices);
						this.indices.push((i+1)%this.slices + (j+1)*this.slices);
						this.indices.push(i%this.slices + (j+1)*this.slices);

						this.indices.push(i % this.slices + j*this.slices);
						this.indices.push((i+1)%this.slices + j*this.slices);
						this.indices.push((i+1)%this.slices + (j+1)*this.slices);	
					}

					ang_slices += ang1;
					
			}	
			ang_stacks += ang2;
		}

		this.vertices.push(0,0,1);
		this.normals.push(0,0,1);

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
