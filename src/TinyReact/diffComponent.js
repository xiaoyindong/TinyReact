import mountElement from "./mountElement";

export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) {
    if (isSameComponent(virtualDOM, oldComponent)) {
        // 是同一个组件
    } else {
        // 不是同一个组件
        // 替换页面原有的对象，也就是删除原有DOM，增加新的DOM
        mountElement(virtualDOM, container, oldDOM);
    }
}

function isSameComponent(virtualDOM, oldComponent) {
    // 判断是否是同一个组件，只要判断他们的构造函数是否是同一个即可
    return oldComponent && virtualDOM.type === oldComponent.constructor;
}