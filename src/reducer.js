export const reducer = (prevState, action) => {
  switch (action.type) {
    case 'TO_SIGNUP_PAGE':
      return {
        ...prevState,
        isLoading: false,
        isSignedUp: false,
        noAccount: true,
      };
    case 'TO_SIGNIN_PAGE':
      return {
        ...prevState,
        isLoading: false,
        isSignedIn: false,
        noAccount: false,
      };
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        user:action.user,
        isLoading: false,
      };
    case 'SIGNED_UP':
      return {
        ...prevState,
        isSignedIn: true,
        isSignedUp: true,
        isLoading: false,
        user:action.user
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignedOut: false,
        isSignedIn: true,
        isSignedUp: true,
        user:action.user
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignedOut: true,
        isSignedIn: false,
        isLoading: false
      };
  }
};

export const initialState = {
  isLoading: true,
  isSignedOut: false,
  isSignedUp: false,
  noAccount: false,
  isSignedIn: false,
  //userToken: null,
  user:null
};
