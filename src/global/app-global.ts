
export class AppGlobal{
  private static instance: AppGlobal = new AppGlobal();

  isDebug: boolean = false;

  server: string = this.isDebug ? "http://localhost:8182" : "http://159.138.11.152:8000";
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
