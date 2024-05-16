import React from 'react';
import './LoadingPage.css'; // Importă fișierul CSS pentru stilizare

class LoadingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: false, // Adăugăm un stat pentru a controla când se afișează conținutul
    };
  }

  componentDidMount() {
    // Folosim setTimeout pentru a întârzia afișarea conținutului cu 2 secunde
    setTimeout(() => {
      this.setState({ showContent: true }); // Setăm showContent la true după 2 secunde
    }, 2000);
  }

  render() {
    const { showContent } = this.state;

    return (
      <div className="loading-page">
        {/* Afișăm conținutul dacă showContent este true, altfel afișăm animația */}
        {showContent ? (
          <h2>Căutare în curs...</h2>
        ) : (
          <div>
            <h2>Finding your destination...</h2>
            <div className="loader"></div> {/* Afișăm animația cercului care se rotește */}
          </div>
        )}
      </div>
    );
  }
}

export default LoadingPage;
