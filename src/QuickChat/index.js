import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import { BOT_MSG_EVT, USER_MSG_EVT } from './constants';
import { Sender, Message } from './components';
import styles from './QuickChat.module.scss';
import classNames from 'classnames/bind';

const newPayload = (value, client, type) => ({ value, client, type });
const cx = classNames.bind(styles);

function QuickChat({ socketUrl }) {
    const [socket, setSocket] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const newSocket = io(socketUrl);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [socketUrl]);

    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            console.log('Connected to Socket.io server');
        });

        socket.on('connect_error', (err) => {
            console.error(err);
        });

        socket.on(BOT_MSG_EVT, (res) => {
            if (res.text) {
                pushItem(newPayload(res.text, false, 'text'));
            }

            if (res.attachment) {
                pushItem(newPayload(res.attachment.payload.src, false, 'image'));
            }

            console.log(res);
        });

        return () => socket.close();
    }, [socket]);

    const pushItem = (elem) => {
        setItems((prev) => [...prev, elem]);
    };

    const emit = (msg, type) => {
        socket.emit(USER_MSG_EVT, { message: msg });
        const payload = newPayload(msg, true, type);
        pushItem(payload);
    };

    return (
        socket && (
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <Message items={items} />
                    <Sender onEmit={emit} />
                </div>
            </div>
        )
    );
}

export default QuickChat;
