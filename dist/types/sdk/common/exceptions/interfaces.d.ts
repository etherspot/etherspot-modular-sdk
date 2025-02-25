export interface ValidationError {
    property: string;
    value?: any;
    constraints?: {
        [type: string]: string;
    };
    children?: ValidationError[];
}
//# sourceMappingURL=interfaces.d.ts.map