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
    } else {
        // 处理类组件
        nextVirtualDOM = buildClassComponent(virtualDOM);
    }
    if (isFunction(nextVirtualDOM)) {
        mountComponent(nextVirtualDOM, container);
    }
    // 渲染nextVirtualDOM
    mountNativeElement(nextVirtualDOM, container);
}

// 处理函数组件
function buildFunctionComponent (virtualDOM) {
    return virtualDOM.type(virtualDOM.props || {});
}

// 处理类组件
function buildClassComponent (virtualDOM) {
    // 获取实例对象
    const component = new virtualDOM.type(virtualDOM.props || {});
    // 获得虚拟DOM对象
    const nextVirtualDOM = component.render();
    return nextVirtualDOM;
}