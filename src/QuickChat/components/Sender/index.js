import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Sender.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(styles);
function Sender({ onEmit }) {
    const [text, setText] = useState('');
    const inputRef = useRef();
    const uploadRef = useRef();
    const submitRef = useRef();

    const handleIfEnterPressed = (evt) => {
        if (evt.keyCode === 13 && !evt.shiftKey) {
            evt.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (text.length === 0) return;

        onEmit(text, 'text');

        setText('');
        inputRef.current.focus();

        toggleButton(false);
    };

    const handleTextChange = (ev) => {
        const value = ev.target.value;
        toggleButton(value.length > 0);

        setText(ev.target.value);
    };

    const toggleButton = (enable) => {
        const elem = submitRef.current;
        const avaiable = !elem.classList.contains(cx('disable'));
        if (avaiable && !enable) {
            elem.classList.add(cx('disable'));
        }
        if (!avaiable && enable) {
            elem.classList.remove(cx('disable'));
        }
    };

    const handleUpload = (evt) => {
        const file = evt.target.files && evt.target.files[0];

        if (!file) return;

        const src = URL.createObjectURL(file);
        console.log(src);
        onEmit(src, 'image');

        uploadRef.current.value = null;
    };

    return (
        <div className={cx('container')}>
            {/* <input className={cx('btn', 'btn__upload')} ref={uploadRef} type="file" onChange={handleUpload} /> */}

            <textarea
                className={cx('edt')}
                ref={inputRef}
                rows="1"
                placeholder="Start typing a message ..."
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleIfEnterPressed}
            />
            <button ref={submitRef} className={cx('btn', 'disable')} onClick={handleSubmit}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
}
export default Sender;
