import { FormGroup } from '@angular/forms';
import { ModifiedFields } from './../models/modified-fields.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ModifiedFieldsService {
  constructor() {}

  public GetModifiedValue<T>(parentForm: FormGroup, originalData: T): ModifiedFields[] {
    return Object.keys(parentForm.controls)
      .filter((key) => parentForm.get(key)?.dirty)
      .reduce<ModifiedFields[]>((obj, key) => {
        let parentFormControlValue = parentForm.get(key)?.value;
        let originalValue = originalData[key as keyof T];

        if (parentFormControlValue !== originalValue) {
          obj.push({
            PropertyName: key,
            OriginalValue: String(originalValue),
            ModifiedValue: String(parentFormControlValue),
          });
        }
        return obj;
      }, []);
  }
}
