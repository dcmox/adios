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
            var gOpts;
            return __generator(this, function (_a) {
                gOpts = opts
                    ? Object.assign({ url: url }, OPTIONS_DEFAULT_GET, opts, { url: url })
                    : Object.assign({ url: url }, OPTIONS_DEFAULT_GET, { url: url });
                gOpts.method = 'get';
                gOpts.url = url;
                return [2 /*return*/, Adios.request(gOpts)];
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
    Adios.all = function (promises) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        for (i = 0; i < promises.length; i++) {
                            if (typeof promises[i] === 'string') {
                                promises[i] = Adios.request({ url: promises[i] }, true);
                            }
                            else if (toString.call(promises[i]) !== '[object Promise]') {
                                promises[i] = Adios.request(promises[i], true);
                            }
                        }
                        return [4 /*yield*/, Promise.all(promises).then(function (responses) { return __awaiter(_this, void 0, void 0, function () {
                                var resp;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    resp = [];
                                    responses.forEach(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                        var _a, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    _b = (_a = resp).push;
                                                    return [4 /*yield*/, response.json()];
                                                case 1:
                                                    _b.apply(_a, [_c.sent()]);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/, resp];
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Adios.request = function (opts, noAwait) {
        if (noAwait === void 0) { noAwait = false; }
        return __awaiter(this, void 0, void 0, function () {
            var gOpts, options, handle, ac_1, fetchHandle, reader, contentLength, receivedLength, chunks, _a, done, value, percent, chunksAll, position, _i, chunks_1, chunk;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        gOpts = Object.assign({}, OPTIONS_DEFAULT_GET, opts);
                        options = {
                            body: typeof gOpts.data === 'object'
                                ? JSON.stringify(gOpts.data)
                                : gOpts.data,
                            cache: gOpts.cache || 'no-cache',
                            headers: gOpts.headers,
                            method: gOpts.method,
                            mode: gOpts.mode,
                            redirect: gOpts.redirect || 'follow',
                            referrerPolicy: gOpts.referrerPolicy || 'no-referrer'
                        };
                        if (gOpts.credentials) {
                            options.credentials = gOpts.credentials;
                        }
                        // Run interceptors here, same in post
                        if (Adios._interceptors[gOpts.method || 'request'].length) {
                            Adios._interceptors[gOpts.method || 'request']
                                .filter(function (cb) { return cb; })
                                .forEach(function (cb) {
                                cb(options);
                            });
                        }
                        if (gOpts.timeout) {
                            ac_1 = new AbortController();
                            gOpts.signal = ac_1.signal;
                            handle = setTimeout(function () { return ac_1.abort(); }, gOpts.timeout);
                        }
                        if (!gOpts.progress) return [3 /*break*/, 6];
                        return [4 /*yield*/, fetch(gOpts.url || '', options)];
                    case 1:
                        fetchHandle = _b.sent();
                        if (!(fetchHandle.body && fetchHandle.headers)) return [3 /*break*/, 5];
                        reader = fetchHandle.body.getReader();
                        console.log(fetchHandle);
                        contentLength = +fetchHandle.headers.get('Content-Length') || 'Unknown';
                        receivedLength = 0;
                        chunks = [];
                        _b.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, reader.read()];
                    case 3:
                        _a = _b.sent(), done = _a.done, value = _a.value;
                        if (done) {
                            gOpts.progress({
                                bytes: contentLength === 'Unknown'
                                    ? receivedLength
                                    : contentLength,
                                chunkSize: 0,
                                percent: 100,
                                total: contentLength === 'Unknown'
                                    ? receivedLength
                                    : contentLength
                            });
                            clearTimeout(handle);
                            return [3 /*break*/, 4];
                        }
                        chunks.push(value);
                        receivedLength += value.length;
                        percent = contentLength === 'Unknown'
                            ? 'Unknown'
                            : Number(((receivedLength / contentLength) *
                                100).toFixed(2));
                        gOpts.progress({
                            bytes: receivedLength,
                            chunkSize: value.length,
                            percent: percent,
                            total: contentLength
                        });
                        return [3 /*break*/, 2];
                    case 4:
                        chunksAll = new Uint8Array(receivedLength);
                        position = 0;
                        for (_i = 0, chunks_1 = chunks; _i < chunks_1.length; _i++) {
                            chunk = chunks_1[_i];
                            chunksAll.set(chunk, position);
                            position += chunk.length;
                        }
                        return [2 /*return*/, new TextDecoder('utf-8').decode(chunksAll)];
                    case 5: return [2 /*return*/, fetchHandle];
                    case 6:
                        if (noAwait) {
                            return [2 /*return*/, fetch(gOpts.url || '', options)];
                        }
                        return [4 /*yield*/, fetch(gOpts.url || '', options).then(function (response) {
                                clearTimeout(handle);
                                return response.json();
                            })];
                    case 7: return [2 /*return*/, _b.sent()];
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
exports["default"] = Adios;
