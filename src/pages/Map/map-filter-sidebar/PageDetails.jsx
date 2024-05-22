// SearchResults.jsx
/* eslint-disable react/prop-types */
import './PageDetails.css';
import LikeIcon from '/src/assets/like.png';

const PageDetails = ({ location, onClose }) => {
    return (
        <div className="page">
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <img
                    src={"https://media.cntraveler.com/photos/5d9e28efd765f2000993ef2c/master/pass/madriveroaks-houston-2019-0615_190722_MAD.jpg"}
                    style={{width: '100%', height: '256px'}}/>
                <div style={{margin: '16px 24px'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p style={{
                            flexGrow: 1,
                            fontSize: '20px',
                            color: '#1F1F1F',
                            fontWeight: '600',
                        }}>location.country</p>
                        <img
                            src={LikeIcon}
                            style={{width: '24px', height: '24px'}}/>
                    </div>
                    <p style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#595959',
                    }}>location.city</p>
                    <p style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#595959',
                    }}>{location.city}</p>
                </div>
            </div>
            <button className="repackButton" onClick={onClose}>
                &lt;
            </button>
        </div>
    );
}

export default PageDetails;
  