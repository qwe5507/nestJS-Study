export declare class BaseModel {
    id: number;
    createAt: Date;
    updateAt: Date;
}
export declare class BookModel extends BaseModel {
    name: string;
}
export declare class CarModel extends BaseModel {
    brand: string;
}
export declare class SingleBaseModel {
    id: number;
    createAt: Date;
    updateAt: Date;
}
export declare class ComputerModel extends SingleBaseModel {
    brand: string;
}
export declare class AirplaneModel extends SingleBaseModel {
    country: string;
}
