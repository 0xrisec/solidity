export class Image {
    previewImageSrc: string;
    thumbnailImageSrc: string;
    constructor(
        previewImageSrc: string,
        thumbnailImageSrc: string
    ){
        this.previewImageSrc = previewImageSrc;
        this.thumbnailImageSrc = thumbnailImageSrc;
    }
}

export class ResOptions {
    breakpoint: string;
        numVisible: number;
    constructor(
        breakpoint: string,
        numVisible: number
    ){
        this.breakpoint = breakpoint;
        this.numVisible = numVisible;
    }
}

export class TabView {
    public header:string = "";
    tooltip: number;
    activeIndex: number;
    displayCustom: boolean;
    images: Array<Image>;
    leftIcon?: string;
    responsiveOptions?: Array<ResOptions>;
    constructor(
        header: string,
        tooltip: number,
        activeIndex: number,
        displayCustom: boolean,
        images: Array<Image>,
        leftIcon?: string,
        responsiveOptions?: Array<ResOptions>) {
            this.header = header;
            this.tooltip = tooltip;
            this.activeIndex = activeIndex;
            this.displayCustom = displayCustom;
            this.images = images;
            this.leftIcon = leftIcon;
            this.responsiveOptions = responsiveOptions;
    }
}
