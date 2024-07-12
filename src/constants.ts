export const FLAG_CHANGE_DEMO_NAME = 'flag-change';
export const FLAG_CHANGE_DEMO_DESCRIPTION = 'Automatic updates when flag values change'
export const FLAG_CHANGE_DEMO_EXPLANATION = 'When the provider emits an event indicating flags have changed, components associated with that provider automatically re-render.'

export const SUSPENSE_DEMO_NAME = 'suspense';
export const SUSPENSE_DEMO_DESCRIPTION = 'Suspend until the provider is ready'
export const SUSPENSE_DEMO_EXPLANATION = 'Components depending on feature flags suspend until the provider is ready to evaluate them. Here it is artificially delayed for 5 seconds.'

export const FLAGD_DEMO_NAME = 'flagd';
export const FLAGD_DEMO_DESCRIPTION = 'Get flag from flagd (Connect Protocol)'
export const FLAGD_DEMO_EXPLANATION = 'Uses flagd-web-provider for OpenFeature and load flag value with the Connect RPC protocol.'

export const GOFF_DEMO_NAME = 'goff';
export const GOFF_DEMO_DESCRIPTION = 'Get flag from Go Feature Flag (OFREP Protocol)'
export const GOFF_DEMO_EXPLANATION = 'Uses ofrep-web-provider for OpenFeature and load flag value with the OFREP protocol.'
