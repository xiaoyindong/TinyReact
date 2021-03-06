import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';

export default function mountNativeElement(virtualDOM, container, oldDOM) {
    // 将虚拟dom转换成真实的对象
    // 将转换之后的DOM对象放在页面中
    let newElement = createDOMElement(virtualDOM);
    if (oldDOM) {
        container.insertBefore(newElement, oldDOM);
    } else {
        container.appendChild(newElement);
    }
    // 判断旧的DOM对象是否存在，如果存在则删除
    if (oldDOM) {
        unmountNode(oldDOM);
    }
    // 获取实例对象
    const component = virtualDOM.component;
    if (component) {
        component.setDOM(newElement);
    }
}