"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseModel = void 0;
class ResponseModel {
    constructor(success, body, errors, info, warnings) {
        this.Success = false;
        this.Errors = [];
        this.Warnings = [];
        this.Info = [];
        this.Success = success;
        this.Body = body;
        this.Errors = errors;
        this.Info = info;
        this.Warnings = warnings;
    }
    static successResponse(body) {
        return new ResponseModel(true, body, [], [], []);
    }
    static validationResponse() {
        return new ResponseModel(true, undefined, [], [], []);
    }
    static failureResponse(errors) {
        return new ResponseModel(false, undefined, errors, [], []);
    }
}
exports.ResponseModel = ResponseModel;
