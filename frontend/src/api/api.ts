const API_HOST: string = 'http://127.0.0.1:8000'


export class APIGetContent {
    
    static getCategoryAndSubCategory = async ():Promise<ISideBar> => {

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
        
        return response.json()

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

    static getAccessToken = async (token: string) => {

        let response = await fetch(API_HOST + '/auth/jwt/refresh/', {
            method: 'POST',
            body: JSON.stringify({
                'refresh': token,
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

    static getUser = async (token: string) => {

        if(!token) {
            return {
                error: 'no_refresh_token',
            };
        }
        else {

            let response = await APIGetContent.getAccessToken(token)
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

    static postItemCreate = async (body: IItemCreateFields, token: string) => {

        let response = await APIGetContent.getAccessToken(token)
            .then(async (accessToken) => {

                if(accessToken.error) {
                    return {
                        error: accessToken.error,
                    }
                }

                let response = await fetch(API_HOST + '/api/item/', {
                    method: 'POST',
                    body: JSON.stringify({
                        item: {...body}
                    }),
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': 'Bearer ' + accessToken.access
                    },
                });

                return response.json();

            });

        return response;

    }

    static getItems = async () => {

        let response = await fetch(API_HOST + '/api/item/');

        return response.json();

    }

}