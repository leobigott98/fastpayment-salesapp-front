import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { request } from 'https';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_UP: 'SIGN_UP'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user? ( 
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
    const user = action.payload;
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
      user: null,

    };
  },
  [HANDLERS.SIGN_UP]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      isAuthenticated: false,
      user: user
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
      if (window.localStorage.getItem('token') != null){
        await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/auth/myData`, {
          headers: {
            "Access-Control-Request-Headers": ["X-Auth-Token", "Cookie"],
            "X-Auth-Token": window.localStorage.getItem('token'),
          },
          mode: "cors",
          credentials: "include"
        }).then(async(result)=>{
            if(result.ok){
              isAuthenticated = true
              const user = await result.json(); 
              dispatch({
                type: HANDLERS.INITIALIZE,
                payload: user
              });
            } 
        })
      }else{
        console.log('not authenticated')
        dispatch({
          type: HANDLERS.INITIALIZE
        });
      }   ;  
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
      initialize();
    },[]);
  
  const signIn = async (email, password) => {
    try {
      const data = {
        "email": email,
        "password": password
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/auth/sign-in`, {
        method: "POST",
        "Access-Control-Request-Headers": ["X-Auth-Token", "Cookie", "Set-Cookie", "Content-Type", "Access-Control-Allow-Credentials"],
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        mode: "cors",
        credentials: "include",
        referrerPolicy: 'no-referrer-when-downgrade'
      });
      const jsonResponse = await response.json();
      if (jsonResponse.success){
        window.localStorage.setItem('token', jsonResponse.token);

        const user = {
          name: jsonResponse.name,
          lastname: jsonResponse.lastname,
          email: jsonResponse.email,
          role: jsonResponse.role,
          status: jsonResponse.status
        };
        //console.log(user)
    
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
  };

  const signUp = async (name, lastname, email, password) => {
      const data = {
        "name": name,
        "lastname": lastname,
        "email": email,
        "password": password
      }

      const user = {
        name: data.name,
        lastname: data.lastname,
        email: data.email
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/auth/sign-up`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })

      const jsonResponse = await response.json();
      if(jsonResponse.success){
        if(jsonResponse.result.error_num > 0) {
          throw new Error(jsonResponse.result.message);
        } else{
          console.log('done')
          dispatch({
            type: HANDLERS.SIGN_UP,
            payload: user
          });
          //return jsonResponse.token;
        }    
      }
  };

  const signOut = async () => {

    try{
      window.localStorage.removeItem('token');
    }catch(err){
      console.log(err);
    }

    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
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
