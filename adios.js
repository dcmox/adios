"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var parseUri = require('urlparser-simple').parseUri;
var TIMEOUT_DEFAULT = 4000;
var OPTIONS_DEFAULT_POST = {
    data: {},
    headers: {},
    method: 'post',
    timeout: TIMEOUT_DEFAULT
};
var OPTIONS_DEFAULT_GET = {
    headers: {},
    timeout: TIMEOUT_DEFAULT
};
var Adios = /** @class */ (function () {
    function Adios() {
    }
    Adios.get = function (url, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var gOpts, protocol, port;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gOpts = opts
                            ? Object.assign({ url: url }, OPTIONS_DEFAULT_GET, opts, { url: url })
                            : Object.assign({ url: url }, OPTIONS_DEFAULT_GET, { url: url });
                        protocol = gOpts.url.toLowerCase().indexOf('https') === 0
                            ? require('https')
                            : require('http');
                        port = gOpts.port
                            ? gOpts.port
                            : gOpts.url.toLowerCase().indexOf('https') === 0
                                ? 443
                                : 80;
                        if (!gOpts.port) {
                            gOpts.port = port;
                        }
                        // Run interceptors here, same in post
                        if (Adios._interceptors.get.length) {
                            Adios._interceptors.get
                                .filter(function (cb) { return cb; })
                                .forEach(function (cb) {
                                cb(gOpts);
                            });
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                protocol.get(url, gOpts, function (res) {
                                    Adios._handleResponse(res, resolve, reject, gOpts.progress || undefined);
                                });
                            })];
                    case 1: 
                    // Return promise
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Adios.put = function (url, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var gOpts;
            return __generator(this, function (_a) {
                gOpts = Object.assign({ url: url }, opts, { method: 'PUT' });
                return [2 /*return*/, Adios.request(gOpts)];
            });
        });
    };
    Adios["delete"] = function (url, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var gOpts;
            return __generator(this, function (_a) {
                gOpts = Object.assign({ url: url }, opts, { method: 'DELETE' });
                return [2 /*return*/, Adios.request(gOpts)];
            });
        });
    };
    Adios.patch = function (url, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var gOpts;
            return __generator(this, function (_a) {
                gOpts = Object.assign({ url: url }, opts, { method: 'PATCH' });
                return [2 /*return*/, Adios.request(gOpts)];
            });
        });
    };
    Adios.request = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var gOpts, fragments, scheme, protocol, HttpsProxyAgent, agent, port, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gOpts = Object.assign({}, OPTIONS_DEFAULT_GET, opts);
                        fragments = parseUri(opts.url);
                        scheme = fragments.scheme.toLowerCase();
                        protocol = scheme === 'https'
                            ? require('follow-redirects').https
                            : require('follow-redirects').http;
                        // Set host/path based on proxy options
                        if (gOpts.proxy) {
                            if (scheme === 'https') {
                                HttpsProxyAgent = require('https-proxy-agent');
                                agent = new HttpsProxyAgent({
                                    host: gOpts.proxy.host,
                                    port: gOpts.proxy.port
                                });
                                gOpts.agent = agent;
                            }
                            else {
                                gOpts.host = gOpts.proxy.host;
                                gOpts.port = gOpts.proxy.port;
                                gOpts.path = gOpts.url;
                            }
                            if (gOpts.proxy.auth) {
                                gOpts.headers['Proxy-Authorization'] = new Buffer('Basic ' +
                                    (gOpts.proxy.auth.username + ":" + gOpts.proxy.auth.password)).toString('base64');
                            }
                        }
                        else {
                            gOpts.host = fragments.host;
                            gOpts.path = '/' + fragments.path;
                        }
                        port = gOpts.port
                            ? gOpts.port
                            : gOpts.url.toLowerCase().indexOf('https') === 0
                                ? 443
                                : 80;
                        if (!gOpts.port) {
                            gOpts.port = port;
                        }
                        data = '';
                        if (gOpts.data && Object.keys(gOpts.data).length) {
                            data = JSON.stringify(gOpts.data);
                            if (!gOpts.headers['Content-Length']) {
                                gOpts.headers['Content-Length'] = data.length;
                            }
                            if (!gOpts.headers['Content-type']) {
                                gOpts.headers['Content-type'] = 'application/json';
                            }
                        }
                        // Run interceptors here, same in post
                        if (Adios._interceptors[gOpts.method || 'request'].length) {
                            Adios._interceptors[gOpts.method || 'request']
                                .filter(function (cb) { return cb; })
                                .forEach(function (cb) {
                                cb(gOpts);
                            });
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                try {
                                    var handle = protocol.request(gOpts, function (res) {
                                        Adios._handleResponse(res, resolve, reject, gOpts.progress || undefined);
                                    });
                                    if (gOpts.id) {
                                        Adios.handles[gOpts.id] = { handle: handle, resolve: resolve };
                                    }
                                    if (data.length) {
                                        handle.write(data);
                                    }
                                    handle.end();
                                }
                                catch (e) {
                                    reject(e.toString());
                                }
                            })];
                    case 1: 
                    // Return promise
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Adios.post = function (url, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var gOpts;
            return __generator(this, function (_a) {
                gOpts = opts
                    ? Object.assign({ url: url }, OPTIONS_DEFAULT_POST, opts)
                    : Object.assign({ url: url }, OPTIONS_DEFAULT_POST);
                return [2 /*return*/, Adios.request(gOpts)];
            });
        });
    };
    Adios._handleResponse = function (res, resolve, reject, progress) {
        var headers = res.headers, statusCode = res.statusCode, statusMessage = res.statusMessage;
        // Handle bad status codes
        if (statusCode >= 400) {
            res.resume();
            reject({ headers: headers, statusCode: statusCode, statusMessage: statusMessage });
            return;
        }
        // For progress monitoring
        var len = Number(res.headers['content-length']);
        // Handle our response
        res.setEncoding('utf8');
        var rawData = '';
        res.on('data', function (chunk) {
            rawData += chunk;
            // If progress callback
            if (progress) {
                progress({
                    bytes: rawData.length,
                    chunkSize: chunk.length,
                    percent: Number(((rawData.length / len) * 100).toFixed(2)),
                    total: len
                });
            }
        });
        // Attempt to resolve and clear timeout
        res.on('end', function () {
            if (progress) {
                progress({
                    bytes: len,
                    chunkSize: 0,
                    percent: 100,
                    total: len
                });
            }
            try {
                var parsedData = Adios._parse(rawData);
                resolve(parsedData);
            }
            catch (e) {
                reject(e.message);
            }
        });
    };
    Adios._parse = function (s) {
        if (s.trim().search(/^(\[|\{){1}/) > -1) {
            try {
                var tmp = JSON.parse(s);
                return tmp;
            }
            catch (e) {
                return s;
            }
        }
        return s;
    };
    Adios.interceptors = {
        "delete": {
            use: function (callback) {
                return Adios._interceptors["delete"].push(callback);
            },
            remove: function (index) {
                Adios._interceptors["delete"][index] = null;
            }
        },
        get: {
            use: function (callback) {
                return Adios._interceptors.get.push(callback);
            },
            remove: function (index) {
                Adios._interceptors.get[index] = null;
            }
        },
        patch: {
            use: function (callback) {
                return Adios._interceptors.patch.push(callback);
            },
            remove: function (index) {
                Adios._interceptors.patch[index] = null;
            }
        },
        post: {
            use: function (callback) {
                return Adios._interceptors.post.push(callback);
            },
            remove: function (index) {
                Adios._interceptors.post[index] = null;
            }
        },
        put: {
            use: function (callback) {
                return Adios._interceptors.put.push(callback);
            },
            remove: function (index) {
                Adios._interceptors.put[index] = null;
            }
        },
        request: {
            use: function (callback) {
                return Adios._interceptors.request.push(callback);
            },
            remove: function (index) {
                Adios._interceptors.request[index] = null;
            }
        }
    };
    Adios.controllers = {
        abort: function (id) {
            if (Adios.handles[id]) {
                Adios.handles[id].handle.abort();
                Adios.handles[id].resolve({ statusMessage: 'Aborted' });
                delete Adios.handles[id];
                return true;
            }
            return false;
        }
    };
    Adios.handles = {};
    Adios._interceptors = {
        "delete": [],
        get: [],
        patch: [],
        post: [],
        put: [],
        request: []
    };
    return Adios;
}());
exports.Adios = Adios;
module.exports = Adios;
