import * as PIXI from 'pixi.js'

class Mountain{
    constructor(xCoord,yCoord,spacing,callback){
    this.xCoord= xCoord
    this.yCoord = yCoord
    this.callback = callback
    this.spacing = spacing
    this.draw = this.draw.bind(this)
    this.graphics = new PIXI.Graphics()
    this.graphics.interactive = true
    this.graphics.on('click',this.onClick.bind(this))
    this.neighbors=[]
    this.cost = 2
    this.initialize = this.initialize.bind(this)
    // rivers, neighbors, and paths all function on the assumption that the 0 index item is straight north,
    // and all subsequent indexes move clockwise around the point. IE index 1 is northeast, index 2 is southeast, etc.
    this.rivers = [0,0,0,0,0,0]
    this.neighbors = ['','','','','','']
    this.paths=['','','','','','']
    this.color=0xffffff
    }
    initialize(){
        //Calculate where all neighbors are and store them as strings. In the main program, these strings will be the keys that represent 
        //each point. We can access them using the strings stored in this.neighbors
        this.neighbors[0] = this.xCoord + ',' + (this.yCoord - 2 * this.spacing)
        this.neighbors[1] = this.xCoord + this.spacing + ',' + (this.yCoord - this.spacing/2)
        this.neighbors[2] = this.xCoord + this.spacing + ',' + (this.yCoord + this.spacing/2)
        this.neighbors[3] = this.xCoord + ',' + (this.yCoord + 2 * this.spacing)
        this.neighbors[4] = this.xCoord - this.spacing + ',' + (this.yCoord + this.spacing/2)
        this.neighbors[5] = this.xCoord - this.spacing + ',' + (this.yCoord - this.spacing/2)

        this.draw()
    }
    onClick(){
        console.log("Click")
        this.color=this.color===0xffffff?0x000000:0xffffff
        this.draw()
        this.callback(this.xCoord,this.yCoord)
    }
    draw(){
        this.graphics.beginFill(this.color)
        this.graphics.drawCircle(this.xCoord,this.yCoord,8)
        this.graphics.endFill()
    }


}

export default Mountain