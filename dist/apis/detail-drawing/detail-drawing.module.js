"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const detail_drawing_schema_1 = require("./detail-drawing.schema");
const product_schema_1 = require("../product/product.schema");
const detail_drawing_controller_1 = require("./detail-drawing.controller");
const detail_drawing_service_1 = require("./detail-drawing.service");
let DetailModule = class DetailModule {
};
DetailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: detail_drawing_schema_1.DetailDrawing.name, schema: detail_drawing_schema_1.DetailDrawingSchema },
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
            ]),
        ],
        controllers: [detail_drawing_controller_1.DetailDrawingController],
        providers: [detail_drawing_service_1.DetailDrawingService],
    })
], DetailModule);
exports.DetailModule = DetailModule;
//# sourceMappingURL=detail-drawing.module.js.map