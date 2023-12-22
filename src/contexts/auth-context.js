import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { request } from 'https';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_UP: 'SIGN_UP',
  VALIDATE_EMAIL: 'VALIDATE_EMAIL',
  ADMIN_CHECK: 'ADMIN_CHECK'
};

const initialState = {
  isAuthenticated: false,
  isEmailValidated: false,
  isAdminChecked: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const {user, role, token} = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user? (
            // if payload (role) is provided, then is admin checked
            role? (
              token? {
                isAuthenticated: true,
                isEmailValidated: true,
                isAdminChecked: true,
                isLoading: false,
                role,
                token
            }: {
              isAuthenticated: true,
              isAdminChecked: true,
              isLoading: false,
              role
            }) :
            //if payload (token) is provided, then email is validated
            token? (
              role? {
                isAuthenticated: true,
                isEmailValidated: true,
                iAdminChecked: true,
                isLoading: false,
                token,
                role
            }: {
              isAuthenticated: true,
              isEmailValidated: true,
              isLoading: false,
              token,
            }): 
            {
            isAuthenticated: true,
            isLoading: false,
            user
          }
          
          )
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const {user, role, token} = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  },
  [HANDLERS.SIGN_UP]: (state) => {
    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser',
        email: 'anika.visser@devias.io'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password) => {
    try {
      const data = {
        "email": email,
        "password": password
      }
      const response = await fetch('http://localhost:3001/api/v1/auth/sign-in', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const jsonResponse = await response.json();
      if (jsonResponse.success){
        window.sessionStorage.setItem('authenticated', true);
        window.sessionStorage.setItem('token', jsonResponse.token);

        const user = {
          id: '5e86809283e28b96d2d38537',
          avatar: '/assets/avatars/avatar-anika-visser.png',
          name: 'Anika Visser',
          email: 'anika.visser@devias.io'
        };
    
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user
        });
        return jsonResponse.token;
      }

    } catch (error) {
      console.log(error)
      return false

    }
    /* if (email !== 'demo@devias.io' || password !== 'Password123!') {
      throw new Error('Please check your email and password');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    } */ 
  };

  const signUp = async (email, name, password, lastname) => {
    try{
      const data = {
        "email": email,
        "name": name,
        "password": password,
        "lastname": lastname
      }

      const response = await fetch('http://localhost:3001/api/v1/auth/sign-up', {
        method: "POST",
        body: JSON.stringify(data)
      })

      const jsonResponse = await response.json();
      if(jsonResponse.success){

      }
    }catch(err){

    }


    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
