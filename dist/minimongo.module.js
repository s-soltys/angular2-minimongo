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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var minimongo_config_1 = require("./minimongo.config");
exports.MinimongoConfig = minimongo_config_1.MinimongoConfig;
var minimongo_service_1 = require("./minimongo.service");
exports.MinimongoService = minimongo_service_1.MinimongoService;
var core_1 = require("@angular/core");
var MinimongoModule = MinimongoModule_1 = (function () {
    function MinimongoModule(parentModule) {
        if (parentModule) {
            throw new Error("MinimongoModule is already loaded. Import it in the root module only.");
        }
    }
    MinimongoModule.forRoot = function (config) {
        return {
            ngModule: MinimongoModule_1,
            providers: [
                minimongo_service_1.MinimongoService,
                { provide: minimongo_config_1.MinimongoConfig, useValue: config }
            ]
        };
    };
    return MinimongoModule;
}());
MinimongoModule = MinimongoModule_1 = __decorate([
    core_1.NgModule(),
    __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
    __metadata("design:paramtypes", [MinimongoModule])
], MinimongoModule);
exports.MinimongoModule = MinimongoModule;
var MinimongoModule_1;
//# sourceMappingURL=minimongo.module.js.map