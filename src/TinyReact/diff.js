import mountElement from './mountElement';
import updateTextNode from './updateTextNode';

export default function diff (virtualDOM, container, oldDOM) {
    // 获取老的虚拟DOM对象
    const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
    // 判断oldDOM是否在巡
    if (!oldDOM) {
        return mountElement(virtualDOM, container);
    } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
        // 两个元素类型相同，需要判断是文本类型节点还是元素类型节点
        // 文本类型直接更新内容
        // 元素类型就要更新标签的属性
        if (virtualDOM.type === 'text') {
            // 更新内容
            updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);

        } else {
            // 更新元素属性
        }
        // 遍历子元素进行对比
        virtualDOM.children.forEach((child, i) => {
            diff(child, oldDOM, oldDOM.childNodes[i]);
        })
    }
}