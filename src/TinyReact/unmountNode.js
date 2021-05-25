export default function unmountNode(node) {
    // 获取虚拟DOM对象
    const virtualDOM = node._virtualDOM;
    // 文本节点直接删除
    if (virtualDOM.type === 'text') {
        node.remove();
        return;
    }
    // 判断节点是否是组件生成的。
    const component = virtualDOM.component;
    if (component) {
        component.componentWillUnmount();
    }
    // 判断节点身上是否有ref属性，如果有的话需要清理
    if (virtualDOM.props && virtualDOM.props.ref) {
        virtualDOM.props.ref(null)
    }
    // 判断事件是否存在
    Object.keys(virtualDOM.props).forEach(propsName => {
        if (propsName.startsWith('on')) {
            const eventName = propsName.toLocaleLowerCase().slice(0, 2);
            const eventHandler = virtualDOM.props[propsName];
            node.removeEventListener(eventName, eventHandler);
        }
    })

    // 递归删除子节点
    if (node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++) {
            unmountNode(node.childNodes[i]);
        }
    }
    // 删除节点
    node.remove();
}