interface ValidationError {
    property: string;
    value?: any;
    constraints?: {
        [type: string]: string;
    };
    children?: ValidationError[];
}

export type { ValidationError };
