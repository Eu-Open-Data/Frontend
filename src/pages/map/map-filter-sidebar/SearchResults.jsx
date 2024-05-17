// SearchResults.jsx
/* eslint-disable react/prop-types */
const SearchResults = ({ results, onButtonClicked, onSearchStop }) => {
    return (
        <div className="search-results">
            <div style={{margin: '16px'}}>
                <p style={{textAlign: 'left', fontSize: '24px', fontWeight: '600', color: '#1F1F1F'}}>Results</p>
                <p style={{
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#595959',
                    display: 'inline'
                }}>Don&apos;t like what you see? </p>
                <button style={{border: 'none'}} onClick={onSearchStop}><p style={{fontSize: '14px', fontWeight: '500', color: '#5CC1F9', display: 'inline'}}>Search again</p></button>
            </div>
            <div>
                {results.length > 0 ? (
                    <ul style={{listStyleType: 'none'}}>
                        {results.map((location, index) => (
                            <li key={index} style={{borderBottom: '1px solid #BFBFBF'}}>
                                <button className="listItem" onClick={() => onButtonClicked(location)}>
                                    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                                        <div style={{flexGrow: 1}}>
                                            <p style={{
                                                fontSize: '20px',
                                                color: '#1F1F1F',
                                                fontWeight: '600',
                                            }}>location.country</p>
                                            <p style={{
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                color: '#595959',
                                            }}>location.city</p>
                                            <p style={{
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                color: '#595959',
                                            }}>location.city</p>
                                        </div>
                                        <img style={{borderRadius: '8px', width: '90px', height: '90px'}} src={"https://media.cntraveler.com/photos/5d9e28efd765f2000993ef2c/master/pass/madriveroaks-houston-2019-0615_190722_MAD.jpg"}/>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#595959',
                    }}>Nu am găsit ce căutați.</p>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
  