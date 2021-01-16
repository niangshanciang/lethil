import * as path from "path";
import * as $ from "./config.js";

/**
 * @param {any} menu
 * @param {() => void} fn
 * @param {any} method
 * @param {any} middleware
 */
function routeHandler(menu, fn, method, middleware=null) {

  const routeMethod = {callback:fn, middleware: middleware};
  const route = $.route.list.find(e=>e.path == menu.path);
  if (route) {
    route.type[method] = routeMethod;
  } else {
    $.route.menu.push(menu);
    $.route.list.push(
      {path:menu.path, type:{[method]: routeMethod}}
    );
    $.route.list.sort(
      (a, b) => b.path.localeCompare(a.path)
    );
  }

}

/**
 * join with slash
 * # remove trailing slash
 * # add slash at the end, needed for route menu->active
 * @param {...any} arg
 * @returns url
 */
function routeURI(...arg){
  // arg.push('');
  return path.posix.join(arg.join('/')).replace(/\/+$/, '');
  // return path.posix.join(arg.join('/')).replace(/\/\/+$/, '/');
}

/**
 * @param {string} kind
 * @param {string} prefix
 * @param {any} uri
 * @returns object
 */
function routeObject(kind,prefix,uri){
  var response={ path:'', text:'', group:kind};
  if (typeof uri == 'object'){
    Object.assign(response,uri);
  } else {
    response.path=uri;
  }
  response.path=routeURI(prefix,response.path);
  return response;
}

/**
 * @param {string} method
 * @param {any} path
 * @param {any} rest
 */
function routeTerminal(method, path, rest) {
  if (rest.length === 1) {
    routeHandler(path, rest[0], method);
  } else {
    routeHandler(path, rest[1], method, rest[0]);
  }
}

export class Router {
  routeId = 'none';
  routePrefix = '/';
  /**
   * @todo ?
   * @ignore todo
   * @param {string} name
   * @param {...any} rest
   */

  set(name, ...rest){}

  /**
   * @todo ?
   * @ignore todo
   * @param {...any} rest
   */
  use(...rest){
    var name = '';
    var mwa = rest[0];
    if (rest.length > 1){
      name = rest[0];
      mwa = rest[1];
    }

    if (typeof mwa == 'function'){
      $.route.middleware.push({path:routeURI(this.routePrefix,name), callback:mwa});
    }
  }

  /**
   * @param {any} uri
   * @param {any} rest
   */
  get(uri, ...rest){
    routeTerminal('get',routeObject(this.routeId,this.routePrefix,uri), rest);
  }

  /**
   * @param {string} uri
   * @param {any} rest
   */
  post(uri, ...rest){
    routeTerminal('post',routeObject(this.routeId,this.routePrefix,uri), rest);
  }

  /**
   * @param {string} uri
   * @param {...any} rest
   */
  put(uri, ...rest) {
    routeTerminal('put',routeObject(this.routeId,this.routePrefix,uri), rest);
  }

  /**
   * @param {string} uri
   * @param {...any} rest
   */
  delete(uri, ...rest) {
    routeTerminal('delete',routeObject(this.routeId,this.routePrefix,uri), rest);
  }
}

/**
 * @property string routeId
 * @property string routePrefix
 */
// export class Navigator extends Router {
//   /**
//    * @param {string} routeId
//    * @param {string} routePrefix
//    */
//   constructor(routeId='',routePrefix='') {
//     super();
//     if (routeId) this.routeId = routeId;
//     if (routePrefix) this.routePrefix = routePrefix;
//     if (!$.route.name.includes(this.routeId)) $.route.name.push(this.routeId);
//   }
// }