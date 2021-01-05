import React, { useEffect, useState } from 'react'
import { getCountByTypeKMM } from '../../helpers/getDataKMM';
import { Card, Spin, Space } from 'antd';


const ItemSummary = ({ item }) => {

    const [total, setTotal] = useState();
    const [spinner, setSpinner] = useState(true);


    useEffect(() => {

        getCountByTypeKMM(item).then((total) => {
            setTotal(total);
            setSpinner(false);
        });
    }, [])

    return (
        <>
 
            <Card title={item}  extra={<a href={`/${item.toLowerCase()}`}>More</a>}>
                 {total}
                 {
                    spinner && <Spin size="small" tip="Loading..." />
                 }

            </Card>
            <br></br>
        </>
    )
}

export default ItemSummary
