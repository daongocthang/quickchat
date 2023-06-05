import { useEffect, useRef } from 'react';
import Bubble from '../Bubble';
import styles from './Message.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Message({ items }) {
    const listRef = useRef(null);

    useEffect(() => {
        listRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }, [items]);

    return (
        <div className={cx('container')} ref={listRef}>
            {items.map((item, id) => (
                <Bubble key={id} {...item} />
            ))}
        </div>
    );
}

export default Message;
