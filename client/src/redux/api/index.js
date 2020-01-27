import * as actions from "../actions/userActions/userActions";

export const  baseurl = (window.location.origin==="http://localhost:3000")?"http://localhost:8080":window.location.origin;

const post = (url, data,auth, dispatch, callback) => {
    dispatch(actions.Loading(true))
    const options = {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: new Headers( {
            "Authorization": 'Bearer ' + auth,
            'Content-Type': 'application/json' }),
    }
    fetch(baseurl + url, options)
        .then(res => {
            dispatch(actions.Loading(false))
            if (res.status === 200)
            res.json().then(res=>{callback(null,res)});
            else {
                if(res.status===422)
                res.json().then(err =>{

                    callback(err,null)
                })
                else
                res.json().then(err =>{
                    alert(err.message)
                    // callback(err,null)
                })
                // else if()
            }
        })
        .catch(err =>{console.log(err);
            console.log(err) 
            
            dispatch(actions.Loading(false))
        } )
}
const get = (url, data,auth, dispatch, callback) => {
    dispatch(actions.Loading(true))
    const options = {
        method: "GET",
        headers: new Headers( {
            "Authorization": 'Bearer ' + auth,
            'Content-Type': 'application/json' }),
    }
    fetch(baseurl + url, options)
        .then(res => {
            dispatch(actions.Loading(false))
            if (res.status === 200)
            res.json().then(res=>{callback(null,res)});
            else {
                if(res.status===422)
                res.json().then(err =>{

                    callback(err,null)
                })
                else
                res.json().then(err =>{
                    alert(err.message)
                    // callback(err,null)
                })
                // else if()
            }
        })
        .catch(err =>{console.log(err); 
            dispatch(actions.Loading(false))
        } )
}
const put = (url, data,auth, dispatch, callback) => {
    dispatch(actions.Loading(true))
    const options = {
        method: "PUT",
        body: JSON.stringify({ ...data }),
        headers: new Headers( {
            "Authorization": 'Bearer ' + auth,
            'Content-Type': 'application/json' }),
    }
    fetch(baseurl + url, options)
        .then(res => {
            dispatch(actions.Loading(false))
            if (res.status === 200)
            res.json().then(res=>{callback(null,res)});
            else {
                if(res.status===422)
                res.json().then(err =>{

                    callback(err,null)
                })
                else
                res.json().then(err =>{
                    alert(err.message)
                    // callback(err,null)
                })
                // else if()
            }
        })
        .catch(err =>{console.log(err); 
            dispatch(actions.Loading(false))
        } )
}

const api = {
    post,get,put
};
export default api