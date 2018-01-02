
import { promptData } from '../../../store/data';

export default function (msg,callback) {
    promptData.msg = msg;

    promptData.show = true;

    setTimeout(() => {
        promptData.show = false;
        callback && callback();
    }, 2000);

}
