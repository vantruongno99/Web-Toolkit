"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const errorHandler = (e) => {
    var _a;
    if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
            case 'P2002': {
                throw ({ name: 'DuplicationError', message: `${(_a = e.meta) === null || _a === void 0 ? void 0 : _a.target} already exist` });
            }
            case 'P2025': {
                throw ({ name: 'NotFoundError', message: `Not Found` });
            }
            default: throw ({ name: 'ValidationError', message: JSON.stringify(e) });
        }
    }
    throw ({ name: 'ValidationError', message: JSON.stringify(e) });
};
exports.default = errorHandler;
