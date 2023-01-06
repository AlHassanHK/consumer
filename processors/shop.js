const axios = require('axios');

const processPendingTicket = async (message) => {
    if(message.body.id === 141592) {
        console.log("ours")
    }
  console.log('[processPendingTicket]', message)
  return Promise.resolve('[processPendingTicket]')
};

const processReservedTicket = async (message) => {
    if(message.body.id === 141592) {
        console.log("ours")
    }
  console.log('[processReservedTicket]', message)
  return Promise.resolve('[processReservedTicket]')
};

const processCancelledTicket = async (message) => {
    if(message.body.id === 141592) {
        console.log("ours")
    }
  console.log('[processCancelledTicket]', message)
  return Promise.resolve('[processCancelledTicket]')
};

const processMasterlist = async (message) => {
  console.log('[processMasterlist]', message)
  return Promise.resolve('[processMasterlist]')
};

module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket,
};