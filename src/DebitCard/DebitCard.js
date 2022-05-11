import './DebitCard.css';

export const DebitCard = (props) => {

    return (
        <div className='debit-block'>
            <div className='debit_inner'>
                <div className='debit-logo' />
                <div className='debit-credentials'>
                    <p className='debit-credential_text'>{props.cardNumber}</p>
                </div>
                <div className='debit-expiration_and_type'>
                    <div className='debit-expiration'>
                        <p className='debit-expiration_text'>{props.expiration}</p>
                        <p className='debit-expiration_text'>{props.name}</p>
                    </div>
                    <div className='debit-type-icon' />
                </div>
            </div>
        </div>
    )
}