export interface User {
    username: string,
    password: string
}

export interface UserTask {
    task_id: string,
    username: string
}

export interface jwtUserObject {
    username: string,
    iat: number,
    exp: number
}

export interface Task {
    task_id: string,
    task: string,
    description_id: string,
    status_id: string,
    end_time: string
}

export interface Description {
    description_id: string,
    description: string
}

export interface newError extends Error {
    code: number | string
}

export interface loginRegisterRequest {
    username: string,
    password: string
}

export interface tasksPostRequest {
    task: string,
    description: string,
    status: string,
    end_time: string
}

export interface tasksEndpointObject {
    task_id: string,
    task: string,
    description: string,
    status: string,
    end_time: string
}