export class Breadcrumb {
  public label: string = "";
  public url: string = "";
  public icon?: string = "";

  constructor(label: string, url: string, icon?: string) {
    this.label = label;
    this.url = url;
    this.icon = icon;
  }
}