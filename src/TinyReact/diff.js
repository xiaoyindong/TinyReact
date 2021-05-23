import mountElement from './mountElement';

export default function diff (virtualDOM, container, oldDOM) {
    // 判断oldDOM是否在巡
    if (!oldDOM) {
        return mountElement(virtualDOM, container);
    }
}