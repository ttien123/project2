import React from 'react';
import classNames from 'classnames/bind';
import styles from './Nodata.module.scss';
import NoData from 'src/assets/NoData';
const cx = classNames.bind(styles);

const Nodata = () => {
    return (
        <div className={cx('box-noData')}>
            <NoData />
            <div style={{ marginTop: 16, fontSize: 20 }}>No Data</div>
        </div>
    );
};

export default Nodata;
