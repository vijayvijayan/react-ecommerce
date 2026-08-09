import React from 'react'
import { SD_Status } from '../../Utility/SD';
type PageProps={
        orderStatus:string;
    };
export const TrackingIndicator = ({orderStatus}:PageProps) => {
  return (
  <>
    {
        (orderStatus==SD_Status.StatusOrderPlaced)
        ?
        (
            <div className="progress-container">

                <div className="progress-line"></div>

                <div className="progress-step completed">
                    <div className="circle">✓</div>
                    <p>Order Placed</p>
                </div>

                <div className="progress-step">
                    <div className="circle"></div>
                    <p>Processing</p>
                </div>

                <div className="progress-step">
                    <div className="circle"></div>
                    <p>Shipped</p>
                </div>

                <div className="progress-step">
                    <div className="circle"></div>
                    <p>Delivered</p>
                </div>

            </div>
        )
        :
        (orderStatus==SD_Status.StatusProcessing)
        ?
        (
             <div className="progress-container">

        <div className="progress-line"></div>

        <div className="progress-step completed">
            <div className="circle">✓</div>
            <p>Order Placed</p>
        </div>

        <div className="progress-step completed">
            <div className="circle">✓</div>
            <p>Processing</p>
        </div>

        <div className="progress-step">
            <div className="circle"></div>
            <p>Shipped</p>
        </div>

        <div className="progress-step">
            <div className="circle"></div>
            <p>Delivered</p>
        </div>

    </div>
        )
        :
        (orderStatus==SD_Status.StatusShipped)
        ?
        (
<div className="progress-container">

        <div className="progress-line"></div>

        <div className="progress-step completed">
            <div className="circle">✓</div>
            <p>Order Placed</p>
        </div>

        <div className="progress-step completed">
            <div className="circle">✓</div>
            <p>Processing</p>
        </div>

        <div className="progress-step completed">
            <div className="circle">✓</div>
            <p>Shipped</p>
        </div>

        <div className="progress-step">
            <div className="circle"></div>
            <p>Delivered</p>
        </div>

    </div>
        )
        :
        (
            <div className="progress-container">

        <div className="progress-line"></div>

        <div className="progress-step completed">
            <div className="circle">✓</div>
            <p>Order Placed</p>
        </div>

        <div className="progress-step completed">
            <div className="circle">✓</div>
            <p>Processing</p>
        </div>

        <div className="progress-step completed">
            <div className="circle">✓</div>
            <p>Shipped</p>
        </div>

        <div className="progress-step completed">
            <div className="circle">✓</div>
            <p>Delivered</p>
        </div>

    </div>
        )
        
    }
  </>
 
  )
}
