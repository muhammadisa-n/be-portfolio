"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMessageDetailResponse = toMessageDetailResponse;
exports.toMessageResponse = toMessageResponse;
function toMessageDetailResponse(message) {
    return {
        id: message.id,
        fullName: message.fullName,
        email: message.email,
        message: message.message,
        created_at: message.created_at,
        updated_at: message.updated_at,
        deleted_at: message.deleted_at,
    };
}
function toMessageResponse(message) {
    return {
        id: message.id,
        fullName: message.fullName,
        email: message.email,
        message: message.message,
    };
}
