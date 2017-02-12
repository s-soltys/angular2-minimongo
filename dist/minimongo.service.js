"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var minimongo_config_1 = require("./minimongo.config");
var core_1 = require("@angular/core");
var minimongo = require("minimongo");
var MinimongoService = (function () {
    function MinimongoService(config) {
        this.config = config;
        this.db = new minimongo.LocalStorageDb({ namespace: config.namespace });
    }
    Object.defineProperty(MinimongoService.prototype, "database", {
        get: function () {
            return this.db;
        },
        enumerable: true,
        configurable: true
    });
    MinimongoService.prototype.getCollection = function (collectionName) {
        if (!this.db.collections[collectionName]) {
            this.db.addCollection(collectionName);
        }
        return this.db.collections[collectionName];
    };
    return MinimongoService;
}());
MinimongoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [minimongo_config_1.MinimongoConfig])
], MinimongoService);
exports.MinimongoService = MinimongoService;
//# sourceMappingURL=minimongo.service.js.map