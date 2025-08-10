"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProjectDetailResponse = toProjectDetailResponse;
exports.toProjectResponse = toProjectResponse;
function toProjectDetailResponse(project) {
    return {
        id: project.id,
        name: project.name,
        description: project.description,
        image_id: project.image_id,
        image_url: project.image_url,
        demo_url: project.demo_url,
        project_url: project.project_url,
        dad: project.dad,
        created_at: project.created_at,
        updated_at: project.updated_at,
        deleted_at: project.deleted_at,
    };
}
function toProjectResponse(project) {
    return {
        id: project.id,
        name: project.name,
        description: project.description,
        image_id: project.image_id,
        image_url: project.image_url,
        demo_url: project.demo_url,
        project_url: project.project_url,
        dad: project.dad,
    };
}
