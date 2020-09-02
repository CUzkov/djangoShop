const API_HOST: string = 'http://127.0.0.1:8000'


export class APIGetContent {
    
    static getSideBar = async ():Promise<ISideBar> => {

        let response = await fetch(API_HOST + '/api/sidebar/');
        
        return response.json();

    }

    static createNewUser = async (body: IPostCreateUserFields) => {

        delete body.repeat_password;

        let response = await fetch(API_HOST + '/auth/users/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let responseJSON = response.json();
        
        return responseJSON;

    }

    static getToken = async (body: IPostCreateUserFields) => {

        delete body.repeat_password;
        delete body.email;

        let response = await fetch(API_HOST + '/auth/jwt/create/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        let responseJSON = response.json();
        
        return responseJSON;

    }

    static getAccessToken = async () => {

        let response = await fetch(API_HOST + '/auth/jwt/refresh/', {
            method: 'POST',
            body: JSON.stringify({
                'refresh': localStorage.getItem('refresh_token'),
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        });

        let responseJSON = await response.json();
        
        if(responseJSON.code === 'token_not_valid') {
            return {
                error: 'token_not_valid',
            };
        }

        return responseJSON;

    }

    static getUser = async () => {

        if(!localStorage.getItem('refresh_token')) {
            return {
                error: 'no_refresh_token',
            };
        }
        else {

            let response = await APIGetContent.getAccessToken()
                .then( async (accessToken) => {

                    if(accessToken.error) {
                        return {
                            error: accessToken.error,
                        }
                    }

                    let response = await fetch(API_HOST + '/auth/users/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken.access
                        }
                    });

                    return response.json();

                });

            return response;

        }
    }

    static getTags = async () => {

        let response = await fetch(API_HOST + '/api/tag/');

        return response.json();

    }

}