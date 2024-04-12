import { FormGroup, FormControl, FormArray } from '@angular/forms';

export type FormGroupOf<T> = {
    [key in keyof T]: T[key] extends Array<infer TArray> ? FormArray<TArray extends object ? FormGroup<FormGroupOf<Required<TArray>>> : FormControl<TArray | null | undefined>
    > : T[key] extends object ? FormGroup<FormGroupOf<Required<T[key]>>> : FormControl<T[key]>;
};
