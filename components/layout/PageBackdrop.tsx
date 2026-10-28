export function PageBackdrop() {
  return (
    <div aria-hidden="true" className="page-backdrop">
      <div className="backdrop-layer backdrop-glow" />
      <div className="backdrop-layer backdrop-grid" />
      <div className="backdrop-layer backdrop-particles">
        <span className="particle" style={{ left: '12%', top: '18%', '--dur': '46s', '--drift': '14vh', '--size': '6px', '--op': '0.35' } as React.CSSProperties} />
        <span className="particle" style={{ left: '28%', top: '70%', '--dur': '58s', '--drift': '-12vh', '--size': '4px', '--op': '0.25' } as React.CSSProperties} />
        <span className="particle" style={{ left: '46%', top: '30%', '--dur': '52s', '--drift': '18vh', '--size': '5px', '--op': '0.3' } as React.CSSProperties} />
        <span className="particle" style={{ left: '63%', top: '84%', '--dur': '64s', '--drift': '-16vh', '--size': '7px', '--op': '0.22' } as React.CSSProperties} />
        <span className="particle" style={{ left: '78%', top: '12%', '--dur': '44s', '--drift': '10vh', '--size': '4px', '--op': '0.35' } as React.CSSProperties} />
        <span className="particle" style={{ left: '90%', top: '55%', '--dur': '70s', '--drift': '-20vh', '--size': '6px', '--op': '0.2' } as React.CSSProperties} />
        <span className="particle" style={{ left: '8%', top: '52%', '--dur': '60s', '--drift': '12vh', '--size': '3px', '--op': '0.3' } as React.CSSProperties} />
        <span className="particle" style={{ left: '84%', top: '88%', '--dur': '54s', '--drift': '-8vh', '--size': '5px', '--op': '0.25' } as React.CSSProperties} />
      </div>
    </div>
  )
}
