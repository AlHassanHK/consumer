const axios = require('axios');
// import chalk from 'chalk';
const chalk = require('chalk');

const log = console.log;

const processPendingTicket = async (message) => {
    if(!(message.body?.id === 141592) || !message.body?.matchNumber) {
        try {
            const { data } = await axios.patch('https://reservation-two.vercel.app/api/reservation/pendingMatch', {
                matchNumber: message.body.matchNumber,
                tickets: message.body.tickets
            })
            log(chalk.green("Pending consumed successfully"))
        } catch (error) {
            log(chalk.red("Pending not consumed:"))
            log(chalk.redBright(error.response.data))
        }
        
    }else{
        log(chalk.yellow("our message won't be consumed"))
    }

    log(chalk.magenta('[processPendingTicket]'), message)
  return Promise.resolve('[processPendingTicket]')
};

const processReservedTicket = async (message) => {
    if(!(message.body?.id === 141592) || !message.body?.matchNumber) {
        try {
            const { data } = await axios.patch('https://reservation-two.vercel.app/api/reservation/successMatch', {
                matchNumber: message.body.matchNumber,
                tickets: message.body.tickets
            })
            log(chalk.green("Reserve consumed successfully"))
        } catch (error) {
            log(chalk.red("Reserve not consumed: "))
            log(chalk.redBright(error.response.data))
        }
        
    }else{
        log(chalk.yellow("our message won't be consumed"))
    }
    
    log(chalk.magenta('[processReservedTicket]'), message)
  return Promise.resolve('[processReservedTicket]')
};

const processCancelledTicket = async (message) => {
    if(!(message.body?.id === 141592) || !message.body?.matchNumber) {
        try {
            const { data } = await axios.patch('https://reservation-two.vercel.app/api/reservation/consumeCancel', {
                matchNumber: message.body.matchNumber,
                tickets: message.body.tickets
            })
            log(chalk.green("Cancel consumed successfully"))
        } catch (error) {
            log(chalk.red("Cancel not consumed: "))
            log(chalk.redBright(error.response.data))
        }
        
    }else{
        log(chalk.yellow("our message won't be consumed"))
    }
    log(chalk.magenta('[processCancelledTicket]'), message)
  return Promise.resolve('[processCancelledTicket]')
};

const processMasterlist = async (message) => {
    try {
        const { data } = await axios.post('http://localhost:3003/api/reservation/masterList', {
            matchNumber: message.body.matchNumber,
            dateUtc: message.body.dateUtc,
            availability: message.body.availability
        })
        log(chalk.green("Masterlist consumed successfully for match: ", message.body.matchNumber))
    } catch (error) {
        log(chalk.red("Masterlist not consumed: "))
        log(chalk.redBright(error.response.data))
    }
    
    log(chalk.magenta('[processMasterlist]'), message)
  return Promise.resolve('[processMasterlist]')
};

module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket,
};