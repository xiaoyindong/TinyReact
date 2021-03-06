import mountNativeElement from './mountNativeElement';
import mountComponent from './mountComponent';
import isFunction from './isFunction';

export default function mountElement(virtualDOM, container, oldDOM) {
    // 处理原生的jsx和组件的jsx
    if (isFunction(virtualDOM)) {
        // 组件元素
        mountComponent(virtualDOM, container, oldDOM);
    } else {
        // 原生元素
        mountNativeElement(virtualDOM, container, oldDOM);
    }
}