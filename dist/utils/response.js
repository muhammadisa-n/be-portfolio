"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = successResponse;
exports.successCreateResponse = successCreateResponse;
exports.successUpdateResponse = successUpdateResponse;
exports.successDeleteResponse = successDeleteResponse;
exports.successRestoreResponse = successRestoreResponse;
exports.errorResponse = errorResponse;
function successResponse(message, statusCode = 200, data) {
    return Object.assign({ status: true, status_code: statusCode, message }, (data !== undefined && { data }));
}
function successCreateResponse(data) {
    return Object.assign({ status: true, status_code: 201, message: "Data Berhasil Ditambahkan" }, (data !== undefined && { data }));
}
function successUpdateResponse(data) {
    return Object.assign({ status: true, status_code: 200, message: "Data Berhasil Diupdate" }, (data !== undefined && { data }));
}
function successDeleteResponse() {
    return {
        status: true,
        status_code: 200,
        message: "Data Berhasil Dihapus",
        data: null,
    };
}
function successRestoreResponse() {
    return {
        status: true,
        status_code: 200,
        message: "Data Berhasil Direstore",
        data: null,
    };
}
function errorResponse(message, statusCode = 400, errors) {
    return Object.assign({ status: false, status_code: statusCode, message }, (errors !== undefined && { errors }));
}
