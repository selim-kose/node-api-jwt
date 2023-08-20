

const EventEmitter = require('events');
const fs = require('fs')
const path = require('path')


// class MyEmitter extends EventEmitter { };

// // initialize object
// const myEmitter = new MyEmitter();

// // add listener for the log event
// myEmitter.on('log', () => console.log('event emitted'));

// setTimeout(() => {
//    //Emit event
//    myEmitter.emit('log', 'Log event emitted!');
// }, 2000);


if (!fs.existsSync('cat')) {
   fs.mkdir('cat', () => {
      console.log('Folder named cat created');
   })
}

setTimeout(() => { }, 1000)

fs.rmdirSync('cat')

// if (fs.existsSync('cat')) {
//    fs.rmdir('cat', () => {
//       console.log('Folder named cat deleted');
//    })

// }


fs.writeFile(path.join(__dirname, 'filesFolder', 'textFile.txt'), 'Yo wsup', (error, textFromFile) => {
   if (error) throw error
   console.log(`Write to file`);
})


fs.appendFile(path.join(__dirname, 'filesFolder', 'log.txt'), 'This text is added to the file!\n', (error) => {
   if (error) throw error
   console.log('Apended to file');
})


fs.readFile(path.join(__dirname, 'filesFolder', 'textFile.txt'), (error, textFromFile) => {
   if (error) throw error
   console.log(`Read file: ${textFromFile}`);
})




// fs.rename(path.join(__dirname, 'filesFolder', 'oldName.txt'), path.join(__dirname, 'newName.txt'), (error) => {
//    if (error) throw error
//    console.log('Renamed file');
// })


// fs.unlink(path.join(__dirname, 'filesFolder', 'log.txt'), (error) => {
//    if (error) throw error;
//    console.log('Deleted File');
// })

