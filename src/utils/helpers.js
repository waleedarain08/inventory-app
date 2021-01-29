export const stateConditionString = state => {
    let navigateTo = '';
    if (state.isLoading && !state.isSignedIn && !state.noAccount) {
        navigateTo = 'LOAD_APP';
    }
    if (state.isSignedIn && state.user && state.isSignedUp) {
        navigateTo = 'LOAD_HOME';
    }
    if (!state.isSignedUp && state.noAccount) {
        navigateTo = 'LOAD_SIGNUP';
    }
    if (!state.isSignedIn && !state.noAccount && !state.isLoading) {
        navigateTo = 'LOAD_SIGNIN';
    }
    return navigateTo;
};

