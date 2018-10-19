export class PagesHomeService {
  public static async getData(ACTION_TYPE: string, dispatch: Function): Promise<any> {
    try {
      // const result: any = await api.post(`${config.API_URL}customers`, query )
      // console.info(result);
      //
      // dispatch({
      //   type: ACTION_TYPE + '_FULFILLED',
      //   payload: result,
      // });
      // return result;
      return null;
    } catch (error) {
      console.error('getData', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      return null;
    }
  }
}
