import Rectangle from '../../rectangle.js';

export default function sketch (p) {
    let rectangles = [];
    let rectWidth = 38;

    p.setup = function () {
        p.createCanvas(500, 390);
        let numOfRects = Math.floor(500 / rectWidth);
        for (let i = 0; i < numOfRects; i++) {
            let rectangle = new Rectangle(Math.floor(p.random(10, 390-100)));
            rectangles.push(rectangle);
        }
        bubbleSort();
    };

    p.draw = function () {
        p.background(200);
        for (let i = 0; i < rectangles.length; i++) {
            if(rectangles[i].state == -1){
                p.fill("#1dd1a1");
            }else if(rectangles[i].state == 0){
                p.fill("#feca57");
            }else{
                p.fill("#ff6b81");
            }
            p.rect(rectWidth * i + 3, 390 - rectangles[i].value, rectWidth, rectangles[i].value, 8, 8, 0, 0);
        }
    };

    async function bubbleSort(){
        for(let i = 0; i < rectangles.length; i++){
            for(let j = 0; j < rectangles.length - 1 - i; j++){
            if(rectangles[j].value > rectangles[j + 1].value){
                rectangles[j].state = 0;
                rectangles[j + 1].state = 2;
                await swap(j, j + 1);
                rectangles[j].state = -1;
                rectangles[j + 1].state = -1;
            }
            }
        }
    }

    async function swap(i, j){
        await sleep(300);
        let temp = rectangles[i].value;
        rectangles[i].value = rectangles[j].value;
        rectangles[j].value = temp;
    }

    function sleep(time){
        return new Promise(function(resolve){setTimeout(resolve, time)});
    }
};