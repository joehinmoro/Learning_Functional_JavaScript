// helper fns
const head = (array) => array[0];
const tail = (array) => array.slice(1);
const length = (array) => array.length;
c;

// define fn that will be passed to pipe (IO: String)
const upper = (input) => input.toUpperCase();
const greet = (greeting) => (input) => `${greeting} ${input}`;
const exclaim = (sentence) => `${sentence} !!!`;

// ITERATIVE PIPING
const iterativePipe = (...fns) => {
    // if no fn arg is passed, return a fn that returns its input
    if (fns.length === 0) return (input) => input;
    // for all fns passed, return a fn that passes input through each fn
    return (input) => {
        for (let fn of fns) {
            // input of next fn is the output of current fn
            input = fn(input);
        }
        // return final output (output of last fn in the pipe)
        return input;
    };
};

// RECURSIVE PIPING

const recursivePipe = (...fns) => {
    // base case 0: no input
    if (length(fns) === 0) return (input) => input;
    // base case 1:
    if (length(fns) === 1) return (input) => head(fns)(input);

    return (input) => {};
};

function pipeline(...functions) {
    if (length(functions) === 0) return (input) => input;
    if (length(functions) === 1) return (input) => head(functions)(input);
    return function (input) {
        return pipeline(...tail(functions))(head(functions)(input));
    };
}

const test = recursivePipe(upper);
console.log(test("fff"));

// define custom pipe
const pipe1 = iterativePipe(upper, greet("Hello"), exclaim);
const pipe2 = iterativePipe(upper, iterativePipe(greet("Hello"), exclaim));
const pipe3 = iterativePipe(upper, iterativePipe(greet("Hello")), exclaim);
const pipe4 = iterativePipe(
    iterativePipe(upper),
    iterativePipe(greet("Hello")),
    iterativePipe(exclaim)
);

// test pipe
console.log(pipe1("John"));
console.log(pipe2("John"));
console.log(pipe3("John"));
console.log(pipe4("John"));
