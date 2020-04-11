import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


export const  cms_list_page = (page,size,param)=>{
      var param = querystring.stringify(param);
      return  http.requestQuickGet(apiUrl+"/cms/list/"+page+"/"+size+"?"+param)
}
export const  cms_list_query_page = (page,size,param)=>{
      return http.requestGet(apiUrl+"/cms/list/",param)
}
export const  cms_add = (param)=>{
      return http.requestPost(apiUrl+"/cms/add/",param)
}
export const cms_edit = (id,param)=>{
      return http.requestPut(apiUrl+"/cms/edit/"+id,param)
}
export const cms_get = (id)=>{
      return http.requestGet(apiUrl+"/cms/cmsById/"+id)
}
export  const cms_delete = (id)=>{
      return http.requestDelete(apiUrl+"/cms/delete/"+id)
}
