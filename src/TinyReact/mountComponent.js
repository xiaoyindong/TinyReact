import isFunction from './isFunction';
import isFunctionComponent from './isFunctionComponent';
import mountNativeElement from './mountNativeElement';

export default function mountComponent(virtualDOM, container, oldDOM) {
    //存储得到的虚拟DOM
    let nextVirtualDOM = null;
    // 用于存储实例对象
    let component = null;
    // 判断组件是类组件还是函数组件
    if (isFunctionComponent(virtualDOM)) {
        // 处理函数组件
        nextVirtualDOM = buildFunctionComponent(virtualDOM);
    } else {
        // 处理类组件
        nextVirtualDOM = buildClassComponent(virtualDOM);
        component = nextVirtualDOM.component;
    }
    if (isFunction(nextVirtualDOM)) {
        mountComponent(nextVirtualDOM, container);
    }
    if (component) {
        component.componentDidMount();
    }
    // 执行ref
    if (component && component.props && component.props.ref) {
        omponent.props.ref(component);
    }
    // 渲染nextVirtualDOM
    mountNativeElement(nextVirtualDOM, container, oldDOM);
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
    // 存储实例对象
    nextVirtualDOM.component = component;
    return nextVirtualDOM;
}