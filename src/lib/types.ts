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
    submission_time: string;
    filepath: string;
    original_filename: string;
}

export interface AssignmentNew {
    name: string;
    start_time: string;
    end_time: string;
    submissions: Record<string, SubmissionNew>;
}

export interface HCFile {
    filename: string;
    content: string;
}

export interface SubmitRequest {
    student_id: string;
    student_name: string;
    assignment_name: string;
    file: HCFile
}

export interface Student {
    student_id: string;
    name: string;
}
