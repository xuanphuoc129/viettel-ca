export class ViettelCAs {
    id: number = -1;
    name: string = "";
    price: string = "";
    usb: string = "";
    des: string = "";
    type: number = -1;
    price_default: string = "";
    isBig: boolean = false;

    constructor() { }

    public getArrayDes(){
        return this.des.split("; ");
    }

    parse(data) {
        if ("id" in data) {
            this.id = data.id;
        }
        if ("name" in data) {
            this.name = data.name;
        }
        if ("price" in data) {
            this.price = data.price;
        }
        if ("usb" in data) {
            this.usb = data.usb;
        }
        if ("des" in data) {
            this.des = data.des;
        }
        if ("type" in data) {
            this.type = data.type;
        }
        if ("isBig" in data) {
            this.isBig = data.isBig;
        }
        if ("price_default" in data) {
            this.price_default = data.price_default;
        }
    }
}

export class ViettelCAManager {
    public static _instance: ViettelCAManager = null;
    public mDatas: Array<ViettelCAs> = [];

    constructor() {

    }
    public static getInstance(): ViettelCAManager {
        if (this._instance == null) {
            this._instance = new ViettelCAManager();
        }
        return this._instance;
    }

    public onLoadDataConfig(dataConfig) {
        if (dataConfig) {
            this.mDatas = [];
            dataConfig.forEach(element => {
                let newCa = new ViettelCAs();
                newCa.parse(element);
                this.mDatas.push(newCa);
            });
        }
    }

    public onLoadViettelCaNew(): Array<ViettelCAs> {
        let res = [];
        this.mDatas.forEach(element => {
            if (element.type == 1) {
                res.push(element);
            }
        });
        return res;
    }

    public onLoadViettelCaContinue(): Array<ViettelCAs> {
        let res = [];
        this.mDatas.forEach(element => {
            if (element.type == 2) {
                res.push(element);
            }
        });
        return res;
        
    }
    public onLoadViettelCaCombo(): Array<ViettelCAs> {
        let res = [];
        this.mDatas.forEach(element => {
            if (element.type == 3) {
                res.push(element);
            }
        });
        return res;
        
    }
    public onLoadViettelCaComboContinue(): Array<ViettelCAs> {
        let res = [];
        this.mDatas.forEach(element => {
            if (element.type == 4) {
                res.push(element);
            }
        });
        return res;
        
    }
}