import {uniq} from 'lodash-es';

export default uniq([1,2,3,3,5,7]);

//would be the same as
//import * as _ from 'lodash-es';
//export default _.uniq([1,2,3,3,5,7]);
//in terms of output file size, it'll still smart enough to tree shake and remove dead code