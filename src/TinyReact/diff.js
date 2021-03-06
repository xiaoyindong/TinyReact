import mountElement from './mountElement';
import updateTextNode from './updateTextNode';
import updateNodeElement from './updateNodeElement';
import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';
import diffComponent from './diffComponent';

export default function diff(virtualDOM, container, oldDOM) {
    // 获取老的虚拟DOM对象
    const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
    // 获取旧的组件实例对象
    const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
    // 判断oldDOM是否在巡
    if (!oldDOM) {
        return mountElement(virtualDOM, container);
    } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
        // 如果标签类型不相同，并且不是组件。
        const newElement = createDOMElement(virtualDOM);
        // 替换DOM元素
        oldDOM.parentNode.replaceChild(newElement, oldDOM);
    } else if (typeof virtualDOM.type === 'function') {
        // 渲染是一个组件
        // 第一个参数是组件本身的虚拟DOM对象，通过它可以获取到组件最新的props，
        // 第二个参数是要更新的组件的实例对象，通过它可以调用组件的生命周期函数，可以更新组件的props属性，可以获取到组件返回的最新的虚拟DOM对象，
        // 第三个参数是要更新的DOM对象，在更新组件时，需要在已有DOM对象的身上进行修改，实现DOM最小化操作，获取旧的虚拟DOM对象，
        // 第四个参数是要更新到的容器元素
        diffComponent(virtualDOM, oldComponent, oldDOM, container);
    } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {

        // 两个元素类型相同，需要判断是文本类型节点还是元素类型节点
        // 文本类型直接更新内容
        // 元素类型就要更新标签的属性
        if (virtualDOM.type === 'text') {
            // 更新内容
            updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
        } else {
            // 更新元素属性
            // 要更新的哪个元素，更新的虚拟DOM，旧的虚拟DOM
            updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
        }

        // 将拥有key属性的子元素放置在一个单独的对象中
        const keyedElements = {};
        for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
            let domElement = oldDOM.childNodes[i];
            // 判断节点类型，元素节点才获取
            if (domElement.nodeType === 1) {
                const key = domElement.getAttribute('key')
                if (key) {
                    keyedElements[key] = domElement;
                }
            }
        }

        let hasNoKey = Object.keys(keyedElements).length === 0;

        if (hasNoKey) {
            // 遍历子元素进行对比
            virtualDOM.children.forEach((child, i) => {
                diff(child, oldDOM, oldDOM.childNodes[i]);
            })
        } else {
            // 循环要渲染的虚拟DOM的子元素，获取子元素的key属性
            virtualDOM.children.forEach((child, i) => {
                const key = child.props.key;
                if (key) {
                    const domElement = keyedElements[key];
                    if (domElement) {
                        // 查看当前位置的元素是否是我们期望的元素，如果不是就插入到这个位置
                        if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
                            oldDOM.insertBefore(domElement, oldDOM.childNodes[i]);
                        }
                    }
                } else {
                    // 新增元素
                    mountElement(child, oldDOM, oldDOM.childNodes[i])
                }
            })
        }

        // 删除节点
        // 获取旧节点
        const oldChildNodes = oldDOM.childNodes;
        // 判断旧节点的数量
        if (oldChildNodes.length > virtualDOM.children.length) {
            if (hasNoKey) {
                // 循环删除节点
                for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
                    unmountNode(oldChildNodes[i]);
                }
            } else {
                // 通过key属性删除节点
                // 拿旧的key去新的里面寻找，找不到就删除
                for (let i = 0; i < oldChildNodes.length; i++) {
                    const oldChild = oldChildNodes[i];
                    const oldChildKey = oldChild._virtualDOM.props.key;
                    let found = false;
                    for (let n = 0; n < virtualDOM.children.length; n++) {
                        if (oldChildKey === virtualDOM.children[n].props.key) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        unmountNode(oldChild);
                    }
                }
            }
        }
    }
}