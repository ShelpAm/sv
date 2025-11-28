export interface ProcessHomeworkResult {
    TaskId: string;
}

export interface Assignment {
    Name: string;
    BeginTime: string;
    EndTime: string;
}

export interface Submission {
    Name: string;
    Path: string;
    LastModified: string;
};


export interface SubmissionNew {
    assignment_name: string;
    student_id: string;
    submission_time: string | Date;
    filepath: string;
    original_filename: string;
}

export interface AssignmentNew {
    name: string;
    start_time: Date;
    end_time: Date;
    submissions: Record<string, SubmissionNew>;
}

export interface File {
    filename: string;
    content: string;
}

export interface SubmissionRequest {
    student_id: string;
    assignment_name: string;
    file: File
}

