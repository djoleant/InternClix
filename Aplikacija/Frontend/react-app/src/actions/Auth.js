export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const login = (email, password) => {
    return async (dispatch) => {
        const response = await fetch("https://localhost:7240/Auth/Login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
                "Content-Type": "application/json",
                "cookie": "UserAuthCookie=" + getCookie("UserAuthCookie")
            },
            body: JSON.stringify({
                Username: email,
                Password: password,
            }),
        });
        const data = await response.json();

        if (data.succeeded) {
            checkIfLogged();
        }
        return data;
    };
};

export const logout = () => {
    return async (dispatch) => {
        const response = await fetch("/auth/logout");
        const data = await response.json();

        if (data.success) {
            dispatch({ type: LOGOUT, user: null, loggedIn: false });
        }
    };
};

export const checkIfLogged = () => {
    return async (dispatch, getState) => {
        if (getState().auth.isLogged) {
            return;
        }

        const response = await fetch("/auth/checkUser", {
            method: "GET",
        });

        const data = await response.json();

        if (data.logged) {
            dispatch({
                type: LOGIN,
                user: data.user,
                loggedIn: true,
            });
        }
    };
};

export const register = (firstName, lastName, email, username, password) => {
    return async (dispatch) => {
        const response = await fetch("/auth/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                UserName: username,
                Password: password,
            }),
        });

        const data = await response.json();

        return data;
    };
};