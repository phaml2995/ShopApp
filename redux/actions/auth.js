export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN'
export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API KEY]',
        
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if(!response.ok) {
            const errorMessage = await response.json();
            const errorId = errorMessage.error.message;
            console.log(errorMessage)
            let message = 'Something went wrong';
            if (errorId === 'EMAIL_EXISTS') {
                message = "This email already exists";
            } 
            throw new Error(message)
        }

        const resData = await response.json();
    

        dispatch ({
            type: SIGNUP
        })
    }
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API KEY]',
        
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if(!response.ok) {
            const errorMessage = await response.json();
            const errorId = errorMessage.error.message;
            console.log(errorMessage)
            let message = 'Something went wrong';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = "This email doesn't exist";
            } else  if (errorId === 'INVALID_PASSWORD'){
                message = 'Wrong Password';
            }
            throw new Error(message)
        }

        const resData = await response.json();
        dispatch ({
            type: LOGIN
        })
    }
};
