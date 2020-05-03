export const type = {
    userBasicInfo:{
       username:'',
       roles:[]
    },
    token:''
}

// 菜单点击切换，修改面包屑名称
export function setUserInfo(userInfo) {
    type.userBasicInfo=userInfo
}

export function getUserInfo() {
    return type.userBasicInfo;
}

export function getToken(){
    return type.token;
}

export function setToken(token){
    type.token=token
}