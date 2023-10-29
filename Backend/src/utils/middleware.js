"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const errorHandler = ((error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({
            error: 'malformatted id'
        });
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: error.message
        });
    }
    else if (error.name === 'SensorError') {
        return res.status(400).json({
            error: error.message
        });
    }
    else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        });
    }
    else if (error.name === 'DuplicationError') {
        return res.status(400).json({
            error: error.message
        });
    }
    else if (error.name === 'NotFoundError') {
        return res.status(404).json({
            error: error.message
        });
    }
    next(error);
});
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
exports.default = { errorHandler, unknownEndpoint };
