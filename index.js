const fs = require('fs');
const superagent = require('superagent')


const readFilePro = file =>{
    return new Promise((resolve,reject)=>{
        fs.readFile(file,'utf-8',(err,data)=>{
            if(err){
                reject('I could not find that file 😒')
            } 
            resolve(data)
        })
    })
}

const writeFilePro = (file,data)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file, data ,err=>{
            if(err) reject('Sorry could not write file')
                resolve("File has been written successfully")
        })
    })
}

const getDogImage = async () => {
    try {
        // Read the content of 'dog.txt' to get the dog breed
        const data = await readFilePro(`${__dirname}/dog.txt`, 'utf-8');
        console.log(`Breed: ${data}`);

        // Fetch a random dog image based on the breed
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);

        // Write the image URL to 'dog-image.txt'
        await writeFilePro('dog-image.txt', res.body.message);
        console.log('Random dog image saved');
    } catch (err) {
        console.log(err);
        throw err
    }

    return "Dog added"
};

// const x = getDogImage()
// console.log(x)
// console.log("Ended dog")
(async ()=>{
    try{
        const x =  await  getDogImage()
        console.log(x)
    }catch(err){
        console.log("Boomb error")
    }
  
})()
console.log("started dog")