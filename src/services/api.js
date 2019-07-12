// import { Const } from '../const';
// import { MockApiService } from '../mockServices/mockApiService';
import { ApiService } from './apiService';

/* eslint-disable */

class Api {
  // useMockApi = Const.useMockApi;

  Resolve() {
    // if (this.useMockApi) {
    //   return new MockApiService();
    // }

    return new ApiService();
  }
}

export default Api;
