import React, {useContext} from 'react'
import styles from './Filters.module.css'
import FilterChip from '../filterChip/FilterChip'
import { UserContext } from '../../App'
export default function Filters() {

    const {gridView, setGridView} = useContext(UserContext);
    const handleView = (view)=>{
        if(view == 'detail'){
            setGridView(false);
        }
        else
        setGridView(true);
        
    }
    return (
        <div className={styles.main}>
            <div className={styles.top}>
                <div className={styles.box1}>
                    <img onClick={()=>handleView('grid')} className={styles.icon} src="../../images/gridIcon.png" alt="grid" />
                    <img onClick={()=>handleView('detail')} className={styles.icon} src="../../images/detailIcon.png" alt="detail" />
                </div>
                <div className={styles.box2}>
                    <FilterChip
                        title='Headphone type'
                        options={['in-ear', 'on-ear', 'over-ear']}
                    />
                    <FilterChip
                        title='Company'
                        options={['JBL', 'Sony', 'boAt', 'Zebronics', 'Marshall', 'PTron']}
                    />
                    <FilterChip
                        title='Colour'
                        options={['Blue', 'Black', 'White', 'Brown']}
                    />
                    <FilterChip
                        title='Price'
                        options={['₹0 - ₹999', '₹1,000 - ₹9,999', '₹10,000 - ₹99,999']}
                    />
                </div>
                
                <div className={styles.box3}>
                    <FilterChip
                        title = 'Sort by'
                        options = {['Price: Lowest', 'Price: Highest', 'Name: A-Z', 'Name: Z-A']}
                    />
                    </div> 
            </div>
            
        </div>
    )
}
