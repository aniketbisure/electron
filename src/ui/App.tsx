import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [selectedRange, setSelectedRange] = useState<string>("1000-1999")
  const [selectedOption, setSelectedOption] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [showLuckyPlus, setShowLuckyPlus] = useState<boolean>(true)
  const [selectedRanges, setSelectedRanges] = useState<string[]>([])
  
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

  function BlockGrid() {
    // Generate rows of data
    const generateRows = () => {
      const rows = []
      for (let i = 0; i < 10; i++) {
        const startNum = 1000 + i * 10
        rows.push({
          rowStart: startNum,
          cells: Array.from({ length: 10 }, (_, index) => startNum + index),
        })
      }
      return rows
    }

    const rows = generateRows()

    return (
      <div className="w-full max-w-7xl mx-auto p-4 overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Header row */}
          <div className="grid grid-cols-[80px_repeat(10,1fr)_80px_80px] gap-1 mb-1">
            <div className="bg-white border border-gray-300 p-2 font-bold text-center">Block</div>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="bg-blue-400 border border-gray-300 p-2 text-center font-bold">
                {1000 + i}
              </div>
            ))}
            <div className="bg-white border border-gray-300 p-2 font-bold text-center">Qty.</div>
            <div className="bg-white border border-gray-300 p-2 font-bold text-center">Pts.</div>
          </div>

          {/* Data rows */}
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-[80px_repeat(10,1fr)_80px_80px] gap-1 mb-1">
              <div className="bg-blue-400 border border-gray-300"></div>
              {row.cells.map((cellNum, cellIndex) => (
                <div key={cellIndex} className="border border-gray-300">
                  <div className="text-center text-sm font-semibold mb-1">{cellNum}</div>
                  <input
                    type="text"
                    className="w-full border-0 bg-white p-1 focus:outline-none text-center"
                    aria-label={`Input for block ${cellNum}`}
                  />
                </div>
              ))}
              <div className="bg-emerald-500 border border-gray-300"></div>
              <div className="bg-yellow-500 border border-gray-300"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderNumberGrid = () => {
    return <BlockGrid />;
  };

  const renderLuckyPlusTable = () => {
    const pointsData = [
      { range: "0000-0099", points: "(Pts 2 * 1 )", total: "180", color: "range-0000-0099" },
      { range: "0100-0199", points: "(Pts 2 * 1)", total: "180", color: "range-0100-0199" },
      { range: "0200-0299", points: "(Pts 2 * 2)", total: "360", color: "range-0200-0299" },
      { range: "0300-0399", points: "(Pts 2 * 3)", total: "540", color: "range-0300-0399" },
      { range: "0400-0499", points: "(Pts 2 * 5)", total: "900", color: "range-0400-0499" },
      { range: "0500-0599", points: "(Pts 2 * 5)", total: "900", color: "range-0500-0599" },
      { range: "0600-0699", points: "(Pts 2 * 10)", total: "1800", color: "range-0600-0699" },
      { range: "0700-0799", points: "(Pts 2 * 20)", total: "3600", color: "range-0700-0799" },
      { range: "0800-0899", points: "(Pts 2 * 25)", total: "4500", color: "range-0800-0899" },
      { range: "0900-0999", points: "(Pts 2 * 25)", total: "4500", color: "range-0900-0999" }
    ];

    return (
      <div className="lucky-plus-layout">
        <div className="lucky-plus-content">
          <div className="points-table-section">
            <div className="points-table">
            <div className="page-controls">
              <button>Page Up</button>
              <button>Page Down</button>
              <label><input type="checkbox" /> All</label>
            </div>
              {pointsData.map((item, index) => (
                <div key={index} className="points-row">
                  <div className={`range-box ${selectedRange === item.range ? 'selected' : ''}`} onClick={() => setSelectedRange(item.range)}>
                    {item.range}
                  </div>
                  <div className={`points-box ${item.color}`}>
                    <input type="checkbox" />
                    <span>{item.points}</span>
                  </div>
                  <div className="total-box">{item.total}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="number-grid-section">
            <div className="number-grid">
              <div className="grid-header">
                <div className="grid-header-cell block-cell">Block</div>
                <div className="grid-header-cell">0000</div>
                <div className="grid-header-cell">0001</div>
                <div className="grid-header-cell">0002</div>
                <div className="grid-header-cell">0003</div>
                <div className="grid-header-cell">0004</div>
                <div className="grid-header-cell">0005</div>
                <div className="grid-header-cell">0006</div>
                <div className="grid-header-cell">0007</div>
                <div className="grid-header-cell">0008</div>
                <div className="grid-header-cell">0009</div>
                <div className="grid-header-cell qty-cell">Qty.</div>
                <div className="grid-header-cell pts-cell">Pts.</div>
              </div>
              {[...Array(10)].map((_, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                  <div className="grid-cell block-cell">{String(rowIndex * 10).padStart(4, '0')}</div>
                  {[...Array(10)].map((_, colIndex) => (
                    <div key={colIndex} className="grid-cell number-input-cell">
                      <input type="text" maxLength={1} />
                    </div>
                  ))}
                  <div className="grid-cell qty-cell"></div>
                  <div className="grid-cell pts-cell"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="lottery-app">
      {/* Header */}
      <div className="header">
        <div className="number-display">
          <div className="dr-time-container">
            <span className="dr-time-text">Dr. Time:<br/></span>05:00 PM</div>
          </div>
          <div className="number-box pink">1144
          <div>
            <span>1000</span>
            </div>
          </div>
          <div className="number-box light-orange">1144
          <div>
            <span>1000</span>
            </div>
          </div>
          <div className="number-box green">1291
          <div>
            <span>1000</span>
            </div>
          </div>
          <div className="number-box purple">1329
          <div>
            <span>1000</span>
            </div>
          </div>
          <div className="number-box red">1423
          <div>
            <span>1000</span>
            </div>
          </div>
          <div className="number-box gold">1556
          <div>
            <span>1000</span>
            </div>
          </div>
          <div className="number-box teal">1612
          <div>
            <span>1000</span>
            </div>
          </div>
          <div className="number-box magenta">1711
          <div>
            <span>1000</span>
            </div>
          </div>
          <div className="number-box lime">1881
          <div>
            <span>1000</span>
            </div>
          </div>
          <div className="number-box salmon">1979
          <div>
            <span>1000</span>
            </div>
          </div>
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
      <div className="header-container">
      <div className="time-section">
        <div className="label">Time to Draw:</div>
        <div className="value draw-time-value">14.55</div>
      </div>
      <div className="time-section">
        <div className="label">Draw Time</div>
        <div className="value draw-value">14.55</div>
      </div>
      <div className="time-section">
        <div className="label">Draw Date</div>
        <div className="value draw-value">11-03-2025</div>
      </div>
      <div className="limit-section">
        <button className="limit-button">Limit Update</button>
        <div className="limit-value">************</div>
      </div>
      <div className="transaction-section">
        <div className="label">Last Transaction No:</div>
        <div className="value">lekiybi03n</div>
      </div>
      <div className="points-section">
        <div className="label">L.S Pts:</div>
        <div className="value">20</div>
      </div>
    </div>

      <div className="welcome-banner">
        <div className="welcome-message">Welcome</div>
        <div className="dynamic-message">No messages available</div>
      </div>

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
          <button 
            className="lucky-button" 
            onClick={() => setShowLuckyPlus(!showLuckyPlus)}
          >
            Lucky Plus (F2)
          </button>
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

      {renderLuckyPlusTable()}

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
    </>
  )
}

export default App
