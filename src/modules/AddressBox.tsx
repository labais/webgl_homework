import {useState} from "react";

export default function AddressBox() {

    const textPresentedBy = 'Prosacco PLC';
    const textAddressShort = '34 Heritage Way';
    const textAddressFull = '34 Heritage Way, Mc Calla,al, 35111  United States';


    const [open, setOpen] = useState(false);


    return (<>

            <div className={'address-box'}>
                <p className={'line1'}>Presented by: <em>{textPresentedBy}</em></p>
                {!open && (<>
                    <p className={'line2'}>{textAddressShort}</p>
                    <div onClick={()=>setOpen(!open)} title={'Open'} className={'moreLink closed'}>More</div>
                </>)}
                {open && (<>
                    <p className={'line2'}>{textAddressFull}</p>
                    <div onClick={()=>setOpen(!open)} title={'Close'} className={'moreLink open'}>Less</div>
                </>)}
            </div>
    </>)
}