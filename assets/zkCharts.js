/*
ZKCharts ver. 1.0.5
by Zofia Kreasi
Coded by Habibie
habibieamrullah@gmail.com
*/

var zkCharts = function(elm, height){
	this.element = document.getElementById(elm);
	this.width = this.element.offsetWidth-3;
	this.height = height;
	this.canvas = this.element + "Canvas";
	this.c;
	this.ctx;
	this.initialize = function(){
		this.element.innerHTML = "<canvas id='"+this.canvas+"' width='"+this.width+"' height="+this.height+">";
		this.canvas = document.getElementById(this.canvas);
		this.ctx = this.canvas.getContext("2d");
	}
	
	//drawLineChart//
	this.drawLineChart = function(data, maxData, decimalLimit){
		if(data.length > 0){
			this.ctx.clearRect(0, 0, this.width, this.height);
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(0, 0, this.width, this.height);
			this.ctx.beginPath();
			var initI;
			var dataLength;
			if(maxData == 0){
				initI = 0;
				dataLength = data.length;
			}else if(maxData > 0){
				initI = data.length - maxData;
				dataLength = maxData;
			}
			
			var tempX = 0;
			var barWidth = this.width/(dataLength-1);
			this.ctx.moveTo(tempX - 100, this.height);
			
			var tempHighest = data[initI].y;
			var tempLowest = data[initI].y;
			for(var i = initI; i < data.length; i++){			
				if(data[i].y >= tempHighest) tempHighest = data[i].y;
				if(data[i].y <= tempLowest) tempLowest = data[i].y;
			}
			
			var newHeight;
			var tempZeroLoc;
			var tempSmallSpace;
			var tempRatio;
			
			if(tempLowest < 0) newHeight = tempHighest + (tempLowest*-1);
			else newHeight = tempHighest-tempLowest;
			
			tempSmallSpace = newHeight*.2;
			newHeight += tempSmallSpace;
			tempZeroLoc = newHeight - tempHighest;
			
			tempRatio = this.height/newHeight;
			tempZeroLoc = (this.height+((tempSmallSpace/2)*tempRatio))-(tempZeroLoc*tempRatio);
			this.ctx.fillStyle = "red";
			this.ctx.fillRect(0, tempZeroLoc, this.width, .75);
			for(var i = initI; i < data.length; i++){
				this.ctx.lineTo(tempX, tempZeroLoc-(data[i].y * tempRatio));
				this.ctx.fillStyle = "lime";
				this.ctx.fillRect(tempX - 3, tempZeroLoc-(data[i].y * tempRatio) - 3, 6, 6);
				this.ctx.textAlign = "center";
				if(i > initI && i < data.length-1) this.ctx.fillText(data[i].y.toFixed(decimalLimit), tempX, tempZeroLoc-(data[i].y * tempRatio) - 10);
				if(i < data.length-1) tempX += barWidth;
			}
			this.ctx.lineTo(tempX + 100, this.height);
			this.ctx.strokeStyle = "lime";
			this.ctx.stroke();
		}
	}
	
	//drawForexLineChart//
	this.drawForexLineChart = function(data, maxData, decimalLimit){
		if(data.length > 0){
			this.ctx.font="10px Arial";
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "middle";
			this.ctx.clearRect(0, 0, this.width, this.height);
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(0, 0, this.width, this.height);
			this.ctx.beginPath();
			var initI;
			var dataLength;
			if(maxData == 0){
				initI = 0;
				dataLength = data.length;
			}else if(maxData > 0){
				initI = data.length - maxData;
				dataLength = maxData;
			}
			
			var tempX = 0;
			var rightFreeSpace = 80;
			var barWidth = (this.width-rightFreeSpace)/(dataLength-1);
			this.ctx.moveTo(tempX - 100, this.height);
			
			var tempHighest = data[initI].y;
			var tempLowest = data[initI].y;
			for(var i = initI; i < data.length; i++){			
				if(data[i].y >= tempHighest) tempHighest = data[i].y;
				if(data[i].y <= tempLowest) tempLowest = data[i].y;
			}
			
			var newHeight;
			var tempZeroLoc;
			var tempSmallSpace;
			var tempRatio;
			
			if(tempLowest < 0) newHeight = tempHighest + (tempLowest*-1);
			else newHeight = tempHighest-tempLowest;
			
			tempSmallSpace = newHeight*.2;
			newHeight += tempSmallSpace;
			tempZeroLoc = newHeight - tempHighest;
			
			tempRatio = this.height/newHeight;
			tempZeroLoc = (this.height+((tempSmallSpace/2)*tempRatio))-(tempZeroLoc*tempRatio);
			
			//draw grids
			this.ctx.fillStyle = "grey";
			var gridSpace = 50;
			//verticals
			var pointer = 0;
			while(pointer < this.width-150){
				pointer += gridSpace;
				if(pointer < this.width-rightFreeSpace) this.ctx.fillRect(pointer, 0, .5, this.height);
			}
			//horizontals
			var pointer = 0;
			while(pointer < this.height){
				pointer += gridSpace;
				if(pointer < this.height) this.ctx.fillRect(0, pointer, this.width - rightFreeSpace, .5);
			}
			//end draw grids
			
			//draw chart elements
			this.ctx.fillStyle = "red";
			this.ctx.fillRect(0, tempZeroLoc, this.width, .75);
			for(var i = initI; i < data.length; i++){
				this.ctx.lineTo(tempX, tempZeroLoc-(data[i].y * tempRatio));
				this.ctx.fillStyle = "lime";
				//this.ctx.fillRect(tempX - 3, tempZeroLoc-(data[i].y * tempRatio) - 3, 6, 6);
				this.ctx.textAlign = "center";
				if(i > initI && i < data.length-1) if(data.length < 25){
					this.ctx.font="10px Arial";
					this.ctx.fillText(data[i].y.toFixed(decimalLimit), tempX, tempZeroLoc-(data[i].y * tempRatio) - 10);
				}
				if(i < data.length-1) tempX += barWidth;
			}
			var lastData = tempZeroLoc-(data[data.length-1].y * tempRatio);
			this.ctx.lineTo(tempX, lastData);
			this.ctx.strokeStyle = "blue";
			this.ctx.stroke();
			
			//draw vertline on rightFreeSpace
			this.ctx.fillStyle = "grey";
			this.ctx.fillRect(tempX, 0, 1, this.height);
			
			//populate prices on rightFreeSpace
			this.ctx.textAlign = "left";			
			var tempDivider = 10;
			var tempRFSY = 0;
			var tempRFSYDivider = this.height/tempDivider;
			var tempRFSYPrice = tempHighest;
			for(var i = 0; i < 20; i++){
				tempRFSY += tempRFSYDivider;
				tempRFSYPrice -= (tempHighest-tempLowest)/tempDivider;
				this.ctx.fillText(tempRFSYPrice.toFixed(5), tempX + 10, tempRFSY);
			}
			
			//bid line
			this.ctx.fillStyle = "lime";
			this.ctx.fillRect(0, lastData-.5, tempX, 1);
			this.ctx.fillRect(tempX, lastData-7.5, rightFreeSpace, 15);
			this.ctx.textAlign = "left";
			this.ctx.font="12px Arial";
			this.ctx.fillStyle = "black";
			this.ctx.fillText(data[data.length-1].y.toFixed(5), tempX + 10, lastData);
			
			/*
			//ask line
			this.ctx.fillStyle = "red";
			this.ctx.fillRect(0, (lastData-.5)-30, tempX, 1);
			this.ctx.fillRect(tempX, (lastData-7.5)-30, rightFreeSpace, 15);
			this.ctx.textAlign = "left";
			this.ctx.font="12px Arial";
			this.ctx.fillStyle = "black";
			this.ctx.fillText(data[data.length-1].y.toFixed(5), tempX + 10, lastData - 30);
			*/
		}
	}
}