import isFunction from './isFunction';
import isFunctionComponent from './isFunctionComponent';
import mountNativeElement from './mountNativeElement';

export default function mountComponent(virtualDOM, container) {
    //存储得到的虚拟DOM
    let nextVirtualDOM = null;
    // 判断组件是类组件还是函数组件
    if (isFunctionComponent(virtualDOM)) {
        // 处理函数组件
        nextVirtualDOM = buildFunctionComponent(virtualDOM);
    }
    if (isFunction(nextVirtualDOM)) {
        mountComponent(nextVirtualDOM, container);
    }
    // 渲染nextVirtualDOM
    mountNativeElement(nextVirtualDOM, container);
}

function buildFunctionComponent (virtualDOM) {
    return virtualDOM.type();
}