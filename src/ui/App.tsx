import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [selectedRange, setSelectedRange] = useState<string>("1000-1999")
  const [selectedOption, setSelectedOption] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState<number>(0)
  
  // Mock statistics data that would come from Electron
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    // Subscribe to statistics from Electron
    //@ts-ignore
    window.electron?.subscribeStatistics(stats => {
      console.log(stats)
      setStats(stats)
    })
  }, [])

  const handleNumberSelect = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num))
    } else {
      setSelectedNumbers([...selectedNumbers, num])
    }
  }

  const renderNumberGrid = () => {
    const startNum = 1000 + (currentPage * 100)
    const rows = []
    
    for (let i = 0; i < 10; i++) {
      const rowStart = startNum + (i * 10)
      const cells = []
      
      for (let j = 0; j < 10; j++) {
        const num = rowStart + j
        cells.push(
          <td 
            key={num} 
            className={`number-cell ${selectedNumbers.includes(num) ? 'selected' : ''}`}
            onClick={() => handleNumberSelect(num)}
          >
            {num}
          </td>
        )
      }
      
      rows.push(<tr key={i}>{cells}</tr>)
    }
    
    return rows
  }

  return (
    <div className="lottery-app">
      {/* Header */}
      <div className="header">
        <div className="time-display">
          <span>Dr. Time:</span>
          <span>05:00 PM</span>
        </div>
        <div className="number-display">
          <div className="number-box pink">1037</div>
          <div className="number-box light-orange">1144</div>
          <div className="number-box green">1291</div>
          <div className="number-box purple">1329</div>
          <div className="number-box red">1423</div>
          <div className="number-box gold">1556</div>
          <div className="number-box teal">1612</div>
          <div className="number-box magenta">1711</div>
          <div className="number-box lime">1881</div>
          <div className="number-box salmon">1979</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation">
        <button className="nav-button">Reprint</button>
        <button className="nav-button">Cancel</button>
        <button className="nav-button">View Result</button>
        <button className="nav-button">Retailer Bonus</button>
        <button className="nav-button">Account</button>
        <button className="nav-button">Password</button>
        <button className="nav-button">Support</button>
        <button className="nav-button">Logout</button>
      </div>

      {/* Draw Time Info */}
      <div className="draw-info">
        <div className="time-to-draw">
          <span>Time To Draw:</span>
          <span className="highlight">14:55</span>
          <span>Draw Time</span>
          <span>05:15 PM</span>
          <span>Draw Date</span>
          <span>25-01-2025</span>
        </div>
        <div className="limit-info">
          <div className="limit-box">
            <div className="limit-label">Limit Update</div>
            <div className="limit-value">******</div>
          </div>
          <div className="transaction-box">
            <div className="transaction-label">Last Transaction No.:</div>
            <div className="transaction-value">L.S. Pts:</div>
          </div>
        </div>
      </div>

      <div className="welcome-banner">Welcome</div>

      {/* Number Range Selection */}
      <div className="range-selection">
        <button 
          className={`range-button ${selectedRange === "0000-0999" ? "selected" : ""}`}
          onClick={() => setSelectedRange("0000-0999")}
        >
          0000-0999
        </button>
        <button 
          className={`range-button ${selectedRange === "1000-1999" ? "selected" : ""}`}
          onClick={() => setSelectedRange("1000-1999")}
        >
          1000-1999
        </button>
        <button 
          className={`range-button ${selectedRange === "2000-2999" ? "selected" : ""}`}
          onClick={() => setSelectedRange("2000-2999")}
        >
          2000-2999
        </button>
        <button 
          className={`range-button ${selectedRange === "3000-3999" ? "selected" : ""}`}
          onClick={() => setSelectedRange("3000-3999")}
        >
          3000-3999
        </button>
        <button 
          className={`range-button ${selectedRange === "4000-4999" ? "selected" : ""}`}
          onClick={() => setSelectedRange("4000-4999")}
        >
          4000-4999
        </button>
        <button 
          className={`range-button ${selectedRange === "5000-5999" ? "selected" : ""}`}
          onClick={() => setSelectedRange("5000-5999")}
        >
          5000-5999
        </button>
        <button 
          className={`range-button ${selectedRange === "6000-6999" ? "selected" : ""}`}
          onClick={() => setSelectedRange("6000-6999")}
        >
          6000-6999
        </button>
        <button 
          className={`range-button ${selectedRange === "7000-7999" ? "selected" : ""}`}
          onClick={() => setSelectedRange("7000-7999")}
        >
          7000-7999
        </button>
        <button 
          className={`range-button ${selectedRange === "8000-8999" ? "selected" : ""}`}
          onClick={() => setSelectedRange("8000-8999")}
        >
          8000-8999
        </button>
        <button 
          className={`range-button ${selectedRange === "9000-9999" ? "selected" : ""}`}
          onClick={() => setSelectedRange("9000-9999")}
        >
          9000-9999
        </button>
      </div>

      {/* Game Options */}
      <div className="game-options">
        <div className="lucky-plus">
          <button className="lucky-button">Lucky Plus (F2)</button>
          <button className="new-lucky-button">New Lucky Plus (F3)</button>
        </div>
        <button className="multi-number-button">Multi Number</button>
        <button className="lp-button">LP</button>
        <div className="empty-box"></div>
        
        <div className="option-selectors">
          <label className="radio-container">
            <input 
              type="radio" 
              name="option" 
              value="All" 
              checked={selectedOption === "All"} 
              onChange={() => setSelectedOption("All")}
            />
            <span>All</span>
          </label>
          <label className="radio-container">
            <input 
              type="radio" 
              name="option" 
              value="Even" 
              checked={selectedOption === "Even"} 
              onChange={() => setSelectedOption("Even")}
            />
            <span>Even</span>
          </label>
          <label className="radio-container">
            <input 
              type="radio" 
              name="option" 
              value="Odd" 
              checked={selectedOption === "Odd"} 
              onChange={() => setSelectedOption("Odd")}
            />
            <span>Odd</span>
          </label>
          <label className="checkbox-container">
            <input type="checkbox" name="fp" />
            <span>FP</span>
          </label>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="page-navigation">
        <button 
          className="page-button"
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
        >
          Page Up
        </button>
        <button 
          className="page-button"
          onClick={() => setCurrentPage(Math.min(9, currentPage + 1))}
        >
          Page Down
        </button>
        <label className="checkbox-container">
          <input type="checkbox" name="all" />
          <span>All</span>
        </label>
        <button className="block-button">Block</button>
      </div>

      {/* Main Number Grid */}
      <div className="main-content">
        <div className="points-section">
          {["1000 - 1099", "1100 - 1199", "1200 - 1299", "1300 - 1399", "1400 - 1499", 
            "1500 - 1599", "1600 - 1699", "1700 - 1799", "1800 - 1899", "1900 - 1999"].map((range, index) => (
            <div key={index} className={`points-row ${index === currentPage ? 'active' : ''}`}>
              <span className="range">{range}</span>
              <span className="points">(Pts 2)</span>
            </div>
          ))}
        </div>
        
        <div className="number-grid-container">
          <table className="number-grid">
            <thead>
              <tr>
                <th className="grid-header">Block</th>
                <th>1000</th>
                <th>1001</th>
                <th>1002</th>
                <th>1003</th>
                <th>1004</th>
                <th>1005</th>
                <th>1006</th>
                <th>1007</th>
                <th>1008</th>
                <th>1009</th>
                <th>Qty.</th>
                <th>Pts.</th>
              </tr>
            </thead>
            <tbody>
              {renderNumberGrid()}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <button className="function-button">F6 Print</button>
        <button className="function-button">F8 Reset</button>
        <button className="function-button">Tr details</button>
        <button className="advance-button">Advance Draw</button>
        <div className="barcode-section">
          <input type="text" placeholder="Enter barcode" className="barcode-input" />
          <button className="single-digit-button">SingleDigit</button>
        </div>
      </div>
    </div>
  )
}

export default App
