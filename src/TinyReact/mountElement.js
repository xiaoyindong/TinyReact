import mountNativeElement from './mountNativeElement';

export default function mountElement(virtualDOM, container) {
    // 处理原生的jsx和组件的jsx
    mountNativeElement(virtualDOM, container);
}