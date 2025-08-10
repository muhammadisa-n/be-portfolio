"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toToolDetailResponse = toToolDetailResponse;
exports.toToolResponse = toToolResponse;
function toToolDetailResponse(tool) {
    return {
        id: tool.id,
        name: tool.name,
        description: tool.description,
        image_id: tool.image_id,
        image_url: tool.image_url,
        dad: tool.dad,
        created_at: tool.created_at,
        updated_at: tool.updated_at,
        deleted_at: tool.deleted_at,
    };
}
function toToolResponse(tool) {
    return {
        id: tool.id,
        name: tool.name,
        description: tool.description,
        image_id: tool.image_id,
        image_url: tool.image_url,
        dad: tool.dad,
    };
}
