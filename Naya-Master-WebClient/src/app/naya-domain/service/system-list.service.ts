import { Injectable } from "@angular/core";
import { SelectItem } from "primeng/api";
//Naya Imports
import { NayaApiClient } from "@naya-core/services/naya-api.client";
import { ComponentUtilityService } from "@naya-core/services/component-utility.service";
import { ApiContentResult } from "@naya-core/models/api-result";
import { ConstantString } from "@app/naya-shared/constants/constant-string";
export class FindSystemListDetail {
    public systemListName: string = String.empty;
}
export class SystemListDetail {
    public systemListID: number = 0;
    public code: string = String.empty;
    public detailName: string = String.empty;
    public description: string = String.empty;
    public sortKey: number = 0;
    public subListValue: string = String.empty;
    public icon: string = String.empty;
}
@Injectable()
export class SystemListService {
    constructor(
        private _nayaApi: NayaApiClient,
        private _componentUtilityService: ComponentUtilityService
    ) { }
    private getBaseUrl(): string {
        return this._nayaApi.getDomainUrl(ConstantString.MasterSystemListDetail);
    };

    public async NSGetSystemListAsSelectItems(systemListName: string, hasEmptyOption: boolean = true): Promise<SelectItem[]> {
        const url = this._nayaApi.combineUrl(this.getBaseUrl(), 'find');

        const findParameter = new FindSystemListDetail();
        findParameter.systemListName = systemListName;
        const apiResult: ApiContentResult<SystemListDetail[]> = await this._nayaApi
            .postWithResultAsync(url, findParameter)

        if (this._componentUtilityService.WasSuccessful(apiResult)) {
            const selectItems: SelectItem[] = [];
            if (hasEmptyOption) {
                selectItems.push({ label: "Select Item", value: null, icon: String.empty, });
            }
            apiResult.content?.map((item) => {
                selectItems.push({ label: item.detailName, value: item.code, icon: item.icon, });
            });
            return selectItems;
        }
        else {
            return [];
        }
    }
}
