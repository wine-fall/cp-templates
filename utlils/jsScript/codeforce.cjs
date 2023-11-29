const fs = require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * 
 * @param {string} question 
 * @param {Function} cb 
 * @returns {Promise<typeof readline>}
 */
const questionPromise = (question, cb) => {
    return new Promise((resolve) => {
        readline.question(question, value => {
            cb(value);
            resolve(readline);
        });
    });
};

const defautContent = `
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const lines = [];
rl.on('line', (input) => {
    lines.push(input);
});

rl.on('close', () => {
    const ans = solve();
    console.log(ans);
});

const solve = () => {

}

`;

questionPromise('number of the question: ', (questionNo) => {
    console.log(`I'm going to create ${questionNo}.cjs...`);
    console.log('The command is running on the' + process.env.INIT_CWD);

    fs.writeFile(process.env.INIT_CWD + `/${questionNo}.cjs`, defautContent, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${questionNo}.cjs has been created!`);
    });
}).then((readline) => {
    readline.close();
});
