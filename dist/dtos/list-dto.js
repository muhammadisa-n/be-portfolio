"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tolistResponse = tolistResponse;
function tolistResponse(data) {
    return {
        data: data.data,
        total_data: data.total_data,
        paging: data.paging,
    };
}
