import './DebitForm.css';
import {createRef, useState} from "react";
import {DebitCard} from "../DebitCard/DebitCard";

const DebitForm = () => {

    const [errorCVV, setErrorCVV] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorCard, setErrorCard] = useState(false);
    const [errorDate, setErrorDate] = useState(false);

    const submitRef = createRef();

    const [card, setCard] = useState('');
    const [expiration, setExpiration] = useState('');
    const [name, setName] = useState('');

    const cvvHandler = (e) => {
        const { value } = e.target;

        if (value.length < 3 || isNaN(value)) {
            setErrorCVV(true);
        } else {
            setErrorCVV(false);
        }
    }

    const dateHandler = (e) => {
        const { value } = e.target;

        let date = new Date(value);
        let currDate = new Date();
        if (currDate > date) {
            setErrorDate(true);
        } else {
            setErrorDate(false);
            let expirationDateMonth = date.getMonth() + 1;
            let expirationDateYear = date.getFullYear() % 2000;
            setExpiration(expirationDateMonth + '/' + expirationDateYear);
        }
    }

    const cardHandler = (e) => {
        const { value } = e.target;
        if (value.length !== 16 || isNaN(value)) {
            setErrorCard(true);
        } else {
            setErrorCard(false);
            setCard(value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12) + ' ' + value.slice(12, 16));
        }
    }

    const nameHandler = (e) => {
        const { value } = e.target;

        if (value.length < 2) {
            setErrorName(true);
        } else {
            setErrorName(false);
            setName(value.toUpperCase());
        }
    }

    const submitHandler = () => {
        if (!errorCard && !errorCVV && !errorDate && !errorName) {
            submitRef.current.removeAttribute('disabled');
        }
    }

    return (
        <div className='debit-form_block'>
            <div className='debit-form_inner'>
                <form className='debit-form' onChange={submitHandler}>
                    <label className='debit-input-text'>
                        Card number
                        <input className='debit-input' type='text' required name = 'cardNumber' onChange={cardHandler}/>
                        {errorCard ? <p className='error-text'>Card number should be 16 size long <br/> and contain only numbers</p> : null}
                    </label>
                    <label className='debit-input-text'>
                        Valid thru
                        <input className='debit-input' type='date' required name = 'expiration' onChange={dateHandler}/>
                        {errorDate ? <p className='error-text'>Date is expired or not entered</p> : null}
                    </label>
                    <label className='debit-input-text'>
                        CVV
                        <input className='debit-input' type='text' required name='cvv' onChange={cvvHandler}/>
                        {errorCVV ? <p className='error-text'>CVV includes 3 letters</p> : null}
                    </label>
                    <label className='debit-input-text'>
                        Cardholder name
                        <input className='debit-input' type='text' required name='cardholderName' onChange={nameHandler}/>
                        {errorName ? <p className='error-text'>Name should contain at least 2 letters</p> : null}
                    </label>
                    <button type='submit' className='debit-submit' onSubmit={submitHandler} ref={submitRef} disabled>Submit</button>
                </form>
            </div>
            <DebitCard cardNumber = {card} expiration = {expiration} name = {name}/>
        </div>
    )
}

export default DebitForm;