const Joi = require('@hapi/joi');
const messages = require('../constants/messages');

const kafkaMessageValidation = {
  /**
  * Validate schema for pending/reserved/cancelled ticket
  * @return null if validation passes otherwise a validation error
  */
  kafkaMessage(reservation) {
    const schema = Joi.object().keys({
      meta: Joi.object().keys({
        action: Joi.string().valid(messages.TICKET_RESERVED, messages.TICKET_PENDING, messages.TICKET_CANCELLED).required(),
      }).unknown(false),
      body: Joi.object().keys({
        matchNumber: Joi.number().required(),
        id: Joi.number().strict(),
        tickets: Joi.object().keys({
          category: Joi.number().strict().valid(1, 2, 3).required(),
          quantity: Joi.number().strict().min(1).max(2).required(),
          price: Joi.number().strict().valid(75, 125, 195).required(),
        }).required(),
      }).required(),
    }).required().unknown(false);
    return schema.validate(reservation).error;
  },

/**
  * Validate schema for masterlist object
  * @return null if validation passes otherwise a validation error
  */
  kafkaMasterlistMessage(matchInfo) {
    const schema = Joi.object().keys({
      matchNumber: Joi.number().strict().required(),
      roundNumber: Joi.number().strict().required(),
      dateUtc: Joi.string().required(),
      location: Joi.string().required(),
      availability: Joi.object().keys({
        category1: Joi.object().keys({
          available: Joi.number().strict().required(),
          pending: Joi.number().strict().min(0).required(),
          price: Joi.number().strict().valid(75, 125, 195).required(),
        }).required(),
        category2: Joi.object().keys({
          available: Joi.number().strict().required(),
          pending: Joi.number().strict().min(0).required(),
          price: Joi.number().strict().valid(75, 125, 195).required(),
        }).required(),
        category3: Joi.object().keys({
          available: Joi.number().strict().required(),
          pending: Joi.number().strict().min(0).required(),
          price: Joi.number().strict().valid(75, 125, 195).required(),
        }).required(),
      }),
      homeTeam: Joi.string().required(),
      awayTeam: Joi.string().required(),
      group: Joi.string().required(),
    }).required().unknown(false);
    return schema.validate(matchInfo).error;
  },
};

module.exports = kafkaMessageValidation;