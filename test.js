/* const obj = {};
Object.defineProperty(obj, 'name', {
    value: 'Alice',
    writable: true,       // Значення можна змінювати
    configurable: true,   // Характеристики можна змінювати
    enumerable: true      // Властивість видима при ітерації
});

console.log(obj); // "Alice" */

/* const obj = {};
let privateValue = 0;

Object.defineProperty(obj, 'value', {
    get() {
        return privateValue;
    },
    set(newValue) {
        if (newValue > 0) {
            privateValue = newValue;
        }
    },
    enumerable: true,
    configurable: true
});

obj.value = 42;
console.log(obj.value); // 42
obj.value = -10;
console.log(obj.value); // 42 (негативне значення ігнорується) */



// 30–37: Кольори тексту (чорний, червоний, зелений, жовтий, синій, пурпуровий, бірюзовий, білий)
// 40–47: Кольори фону (аналогічні кольорам тексту)
// 90–97: Яскраві кольори тексту
// 100–107: Яскраві кольори фону

/* 
console.log("\x1b[31mЧервоний текст\x1b[0m");
console.log("\x1b[42mТекст на зеленому фоні\x1b[0m");
console.log("\x1b[31;42mЧервоний текст на зеленому фоні\x1b[0m");
 */
console.log("\x1b[30;47m ● \x1b[0m");
console.log("\x1b[30;47m ○ \x1b[0m");



/* const redBlock = "\x1b[41m  \x1b[0m";  // Червоний блок (дві пробіли для ширини)
const greenBlock = "\x1b[42m  \x1b[0m"; // Зелений блок

console.log(`${redBlock}${greenBlock}${redBlock}`);
console.log(`${greenBlock}${redBlock}${greenBlock}`); */

const colors = {
    white: "\x1b[47m   \x1b[0m",
    black: "\x1b[40m   \x1b[0m",
    whiteChess: "\x1b[37;47m ○ \x1b[0m",
    blackChess: "\x1b[30;47m ● \x1b[0m",

    /* reset: "\x1b[0m",
    red:   "\x1b[30;41m ● \x1b[0m",
    green: "\x1b[30;42m ● \x1b[0m",
    blue:  "\x1b[30;44m ● \x1b[0m" */
};

const drawRow = (pattern) => {
    pattern.forEach(color => process.stdout.write(colors[color]));
    console.log();
};

drawRow(['whiteChess', 'blackChess', 'white', 'black']);

