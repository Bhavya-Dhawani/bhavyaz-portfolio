import * as fs from 'fs';

export default function print(input, file) {
    if (process.env.MODE == 'developement') {
        console.log(input)
    }else if(process.env.MODE == 'production') {
        // fs.appendFileSync(file, input)
        console.log(input)
    }
}