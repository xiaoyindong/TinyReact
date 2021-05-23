export default function updateNodeElement(newElement, virtualDOM) {
    // 获取节点对应的属性对象
    const newProps = virtualDOM.props;
    Object.keys(newProps).forEach(propName => {
        const newPropsValue = newProps[propName];
        // 判断是否是事件属性
        if (propName.startsWith('on')) {
            // 截取出事件名称
            const eventName = propName.toLowerCase().slice(2);
            // 为元素添加事件
            newElement.addEventListener(eventName, newPropsValue);
        } else if (propName === 'value' || propName === 'checked') {
            // 如果属性名是value或者checked不能使用setAttribute来设置，直接以属性方式设置即可
            newElement[propName] = newPropsValue;
        } else if (propName !== 'children') {
            // 排除children
            if (propName === 'className') {
                newElement.setAttribute('class', newPropsValue)
            } else {
                newElement.setAttribute(propName, newPropsValue)
            }
        }
    })
}