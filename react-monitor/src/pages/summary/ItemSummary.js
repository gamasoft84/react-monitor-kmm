import React, { useEffect, useState } from 'react'
import { getCountByTypeKMM } from '../../helpers/getDataKMM';
import { Card, Spin, Tag } from 'antd';



const ItemSummary = ({ item }) => {

    const [total, setTotal] = useState();
    const [spinner, setSpinner] = useState(true);


    useEffect(() => {

        getCountByTypeKMM(item).then((total) => {
            setTotal(total);
            setSpinner(false);
        });
    }, [item])

    return (
        <>
 
            <Card title={item}  extra={<a href={`/${item.toLowerCase()}`}>More</a>}>                 

                 <Tag color={item !== 'DriveTests' ? 'green' : 'geekblue'} key={item}>
                    {total}
                </Tag>

                 {
                    spinner && <Spin size="small" tip="Loading..." />
                 }
            </Card>
            <br></br>
        </>
    )
}

export default ItemSummary
