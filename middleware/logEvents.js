const {format} = require('date-fns');
const { v4: uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (meassage, fileName) =>{
    const dateTime = format(new Date(), 'dd/MM/yyyy\tHH:mm:ss');
    const logitem = `${dateTime}\t ${uuid()}\t ${meassage}\n`;
    console.log(logitem);
    try{
        if(!fs.existsSync(path.join(__dirname, '..','logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', fileName), logitem);
    }catch(err){
        console.error(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLogs.txt');
    next(); 
}

module.exports = { logger, logEvents };