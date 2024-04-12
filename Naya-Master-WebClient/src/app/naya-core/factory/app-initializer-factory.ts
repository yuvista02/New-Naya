// MS Imports
import { NayaAppConfigService }     from '@naya-core/services/naya-app-config.service';
import { NayaApplicationInsight }   from '@naya-core/services/naya-application-insight.service';

export function appInitializerFn(
    nayaAppConfigService: NayaAppConfigService,
    nayaApplicationInsight: NayaApplicationInsight
    ) {
    
    const promise = nayaAppConfigService.LoadAppConfig().then(() => {
        nayaApplicationInsight.Initialize(nayaAppConfigService.GetAppInsightsInstrumentationKey());
    });
    return () => promise;
}