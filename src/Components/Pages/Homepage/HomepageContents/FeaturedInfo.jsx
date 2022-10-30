import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import React from 'react'
import './FeaturedInfo.css'

const FeaturedInfo = () => {
  return (
    <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle">Users</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">12345</span>
                <span className="featuredMoneyRate">
                    -11.4 <ArrowDownward className = 'featuringIcon'/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>

        <div className="featuredItem">
            <span className="featuredTitle">Bookings</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">12345</span>
                <span className="featuredMoneyRate">
                    -11.4 <ArrowDownward className = 'featuringIcon'/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>

        <div className="featuredItem">
            <span className="featuredTitle">Tours</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">12345</span>
                <span className="featuredMoneyRate">
                    11.4 <ArrowUpward className = 'featuringIcon positive'/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>

    </div>
  )
}

export default FeaturedInfo