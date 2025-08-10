"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserDetailResponse = toUserDetailResponse;
exports.toUserResponse = toUserResponse;
function toUserDetailResponse(user) {
    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
        deleted_at: user.deleted_at,
    };
}
function toUserResponse(user) {
    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
    };
}
