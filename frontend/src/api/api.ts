const API_HOST: string = 'http://127.0.0.1:8000'


export class APIGetContent {
    
    static getSideBar = async ():Promise<ISideBar> => {

        let response = await fetch(API_HOST + '/api/sidebar/');
        let responseJSON = response.json();
        
        return responseJSON;

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

        let responseJSON = response.json();
        
        return responseJSON;

    }

    static getUser = async () => {

        if(!localStorage.getItem('refresh_token')) {
            return false;
        }
        else {

            let response = await APIGetContent.getAccessToken()
                .then( async (accessToken) => {

                    let response = await fetch(API_HOST + '/auth/users/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken.access
                        }
                    });

                    return response;

                });

            return response.json();

        }
    }

}