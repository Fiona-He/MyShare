
export class AppGlobal{
  private static instance: AppGlobal = new AppGlobal();

  isDebug: boolean = true;

  server: string = this.isDebug ? "http://localhost:8182" : "http://119.23.70.234:8182";
  apiUrl: string = '/';
  pageSize: number = 10;

  constructor(){
    if(AppGlobal.instance){
      throw new Error("error, pls use AppGlobal.getInstance() instead of using new.");
    }
    AppGlobal.instance = this;
  }

  public static getInstance(): AppGlobal{
    return AppGlobal.instance;
  }
}
