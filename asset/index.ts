/*!
 * expressVirtual
 * Copyright(c) 2018 Khen Solomon Lethil
 * MIT Licensed
 */
// NOTE: path,fs,rootConfiguration,rootAssist,rootObject,rootArray
declare function require(path: string): any;
// NOTE: Essential
import * as root from './essential';
export const utility=root.utility;
export const rootSetting=root.configuration.setting;
export const rootDirectory=root.configuration.directory;
export const path=root.request.path;
export const fs=root.request.fs;

// import * as nav from './nav';
// export const navMiddleWare=nav.middleware;

// NOTE: Assignment
const assignment:any = {};
// const assignment:any = module.exports = root;
// const assignment:any = module.exports = {rootConfiguration,path,fs,rootAssist,rootObject,rootArray};

// NOTE:  Scriptive
import * as $ from './scriptive';

export const scriptive=$.http;
export const express=$.express;

export const navMiddleWare=$.navMiddleWare;
// TODO: ?
export const cookieParser = $.cookieParser;
export const morgan = $.morgan;
export const sassMiddleWare = $.sassMiddleWare;

// TODO: ?
export const httpErrors = $.httpErrors;

// TODO: ??
import * as db from './database';
export const database = db.connection;
// export const mysql = db.connection.mysql;
// export const mongodb = db.connection.mongodb;

export default assignment;

// module.exports = myanmarNotation;
// module.exports.default = myanmarNotation;