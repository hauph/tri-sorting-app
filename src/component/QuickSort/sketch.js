import Rectangle from '../../rectangle.js';

export default function sketch (p) {
    let rectangles = [];
    let rectWidth = 34;

    p.setup = function () {
        p.createCanvas(1000, 390);
        let numOfRects = Math.floor(1000 / rectWidth);
        for (let i = 0; i < numOfRects; i++) {
            let rectangle = new Rectangle(Math.floor(p.random(10, 390 - 40)));
            rectangles.push(rectangle);
        }
        // textAlign(CENTER, BASELINE);
        quickSort(0, rectangles.length);
    };

    p.draw = function () {
        p.background(200);
        for (let i = 0; i < rectangles.length; i++) {
            if (rectangles[i].state == -1) {
                p.fill("#05c46b"); // default green
            } else if (rectangles[i].state == 0) {
                p.fill("#f7d794"); // yellow for swap 2 elements
            } else if (rectangles[i].state == 1) {
                p.fill("#ff6b81"); // pink pivot
            } else if (rectangles[i].state == 2) {
                p.fill("#9AECDB");
            }
            p.text(rectangles[i].value, i * rectWidth + 6, 390-20);
            p.rect(i * rectWidth, 390 - rectangles[i].value - 40, rectWidth, rectangles[i].value, 8, 8, 0, 0);
        }
    };

    async function quickSort(start, end) {
        if (start < end) {
            let pivot = await partition(start, end);
            Promise.all(
                [quickSort(start, pivot)],
                [quickSort(pivot + 1, end)]);
        }
    }

    async function partition(start, end) {
        let pivot = rectangles[start].value;
        rectangles[start].state = 1; // pivot red
        let pivotIndex = start;

        for (let i = start + 1; i < end; i++) {

            if (pivot > rectangles[i].value) {
                rectangles[i].state = 2; // current little green   
                pivotIndex++;
                await swap(i, pivotIndex);
            }
        }

        rectangles[start].state = 0; 
        rectangles[pivotIndex].state = 0;

        await swap(start, pivotIndex);
        return pivotIndex;
    }

    async function swap(i, j) {

        await sleep(700);
        let temp = rectangles[i].value;
        rectangles[i].value = rectangles[j].value;
        rectangles[j].value = temp;

        rectangles[i].state = -1; //
        rectangles[j].state = -1;
    }

    function sleep(time) {
        return new Promise(function (resolve) { setTimeout(resolve, time) });
    }
}