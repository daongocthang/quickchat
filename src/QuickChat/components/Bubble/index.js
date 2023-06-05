import classNames from 'classnames/bind';
import styles from './Bubble.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceMehBlank } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const BotAvatar = (
    <div className={cx('avatar')}>
        <FontAwesomeIcon icon={faFaceMehBlank} />
    </div>
);

const Content = (type, value) => {
    if (type === 'text') {
        return <div className={cx('text')}>{value}</div>;
    }
    if (type === 'image') {
        return (
            <div className={cx('image')}>
                <img src={value} alt="" />
            </div>
        );
    }
};

function Bubble({ type, value, client }) {
    return (
        <div className={cx('container', { client })}>
            {!client && BotAvatar}
            <div className={cx('content')}>{Content(type, value)}</div>
        </div>
    );
}

export default Bubble;
